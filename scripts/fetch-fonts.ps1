# ウェブフォント(自己ホスト)の取得・更新スクリプト
#
# 何をするか:
#   サイトで使っている文字(HTML・JS・JSONの中の文字)を調べ、その文字を含むフォントのファイル(woff2)だけを
#   Google Fonts から assets/fonts/ にダウンロードし、assets/style.css の「FONTS:BEGIN 〜 FONTS:END」の間の
#   @font-face を作り直す。
#
# いつ使うか:
#   新しい漢字などを文章に足して、その字だけ標準の明朝体で表示される場合(足りないフォントのファイルがある場合)。
#   使い方(サイトのフォルダで実行):
#     powershell -ExecutionPolicy Bypass -File scripts/fetch-fonts.ps1            … 足りないファイルをダウンロードして、style.css を更新
#     powershell -ExecutionPolicy Bypass -File scripts/fetch-fonts.ps1 -CheckOnly … ダウンロードも書き換えもせず、足りない文字の数だけ報告
#
# メモ:
#   ・外部への接続は、fonts.googleapis.com と fonts.gstatic.com だけ(ダウンロード時のみ。サイトの表示時には接続しない)。
#   ・フォントのライセンスは SIL Open Font License 1.1(自己ホスト・再配布してよい)。
#   ・ダウンロードしたファイルは、ファイル名で見分けがつく(shippori-mincho-500-s23.woff2 など)。消さずに残す。

param(
  [switch]$CheckOnly
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$utf8 = New-Object System.Text.UTF8Encoding($false)
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"

# 使うフォント(太さ)。サイトの見出しで使っているものだけ
$fonts = @(
  @{ Prefix = "shippori-mincho"; Url = "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&display=swap"; Subsets = $null },
  @{ Prefix = "cormorant-garamond"; Url = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap"; Subsets = @("latin", "latin-ext") }
)

# --- サイトで使っている文字を集める ---
$files = Get-ChildItem -Recurse -File -Include *.html, *.js, *.json |
  Where-Object { $_.FullName -notmatch "\\(\.git|node_modules|fonts)\\" }
$used = New-Object "System.Collections.Generic.HashSet[int]"
foreach ($f in $files) {
  $text = [System.IO.File]::ReadAllText($f.FullName, $utf8)
  foreach ($ch in $text.ToCharArray()) { [void]$used.Add([int]$ch) }
}
Write-Host ("調べたファイル: {0}  使っている文字の種類: {1}" -f $files.Count, $used.Count)

function In-Range($range, $set) {
  foreach ($part in ($range -split ",\s*")) {
    $x = $part -replace "U\+", ""
    if ($x -match "^([0-9A-Fa-f]+)-([0-9A-Fa-f]+)$") { $a = [Convert]::ToInt32($Matches[1], 16); $b = [Convert]::ToInt32($Matches[2], 16) }
    elseif ($x -match "\?") { $a = [Convert]::ToInt32(($x -replace "\?", "0"), 16); $b = [Convert]::ToInt32(($x -replace "\?", "F"), 16) }
    else { $a = $b = [Convert]::ToInt32($x, 16) }
    foreach ($c in $set) { if ($c -ge $a -and $c -le $b) { return $true } }
  }
  return $false
}

$blocks = New-Object System.Text.StringBuilder
$need = @()
$newFiles = 0
foreach ($font in $fonts) {
  $css = & curl.exe -s -A $ua $font.Url | Out-String
  if (-not $css -or $css -notmatch "@font-face") { throw "Google Fonts のCSSを取得できませんでした: $($font.Url)" }
  foreach ($m in [regex]::Matches($css, "(?s)@font-face\s*\{(.*?)\}")) {
    $body = $m.Groups[1].Value
    $url = [regex]::Match($body, "url\((https://[^)]+)\)").Groups[1].Value
    $weight = [regex]::Match($body, "font-weight:\s*(\d+)").Groups[1].Value
    $style = [regex]::Match($body, "font-style:\s*(\w+)").Groups[1].Value
    $family = [regex]::Match($body, "font-family:\s*'([^']+)'").Groups[1].Value
    $range = [regex]::Match($body, "unicode-range:\s*([^;]+);").Groups[1].Value.Trim()
    $idx = [regex]::Match($url, "\.(\d+)\.woff2$").Groups[1].Value
    $start = [Math]::Max(0, $m.Index - 40)
    $comment = [regex]::Match($css.Substring($start, $m.Index - $start), "/\*\s*([^*]+?)\s*\*/\s*$").Groups[1].Value
    $name = if ($comment) { $comment.ToLower().Replace("-ext", "ext") } else { "s$idx" }
    if ($font.Subsets -and ($font.Subsets -notcontains $comment)) { continue }
    if (-not (In-Range $range $used)) { continue }
    $fileName = "{0}-{1}-{2}.woff2" -f $font.Prefix, $weight, $name
    $path = Join-Path "assets\fonts" $fileName
    if (-not (Test-Path $path)) {
      $need += $fileName
      if (-not $CheckOnly) {
        New-Item -ItemType Directory -Force "assets\fonts" | Out-Null
        & curl.exe -s -f -A $ua -o $path $url
        if ($LASTEXITCODE -ne 0) { throw "ダウンロードに失敗: $fileName" }
        $newFiles++
      }
    }
    [void]$blocks.Append("@font-face {`n  font-family: '$family';`n  font-style: $style;`n  font-weight: $weight;`n  font-display: swap;`n  src: url('fonts/$fileName') format('woff2');`n  unicode-range: $range;`n}`n")
  }
}

if ($CheckOnly) {
  Write-Host ("足りないフォントのファイル: {0}" -f $need.Count)
  $need | ForEach-Object { Write-Host "  $_" }
  return
}

# --- style.css の FONTS:BEGIN 〜 FONTS:END の間を作り直す ---
$cssPath = "assets\style.css"
$cssText = [System.IO.File]::ReadAllText((Resolve-Path $cssPath).Path, $utf8)
$crlf = $cssText.Contains("`r`n")
$cssText = $cssText -replace "`r`n", "`n"
$begin = $cssText.IndexOf("/* FONTS:BEGIN */")
$end = $cssText.IndexOf("/* FONTS:END */")
if ($begin -lt 0 -or $end -lt $begin) { throw "style.css に FONTS:BEGIN / FONTS:END の目印が見つかりません" }
$cssText = $cssText.Substring(0, $begin) + "/* FONTS:BEGIN */`n" + $blocks.ToString() + $cssText.Substring($end)
if ($crlf) { $cssText = $cssText -replace "`n", "`r`n" }
[System.IO.File]::WriteAllText((Resolve-Path $cssPath).Path, $cssText, $utf8)
Write-Host ("完了: 新しくダウンロードしたファイル {0}。style.css の @font-face を更新しました。" -f $newFiles)
Write-Host "次に、HTMLの ?v= の値を上げて(キャッシュ更新)、表示を確認してください。"
