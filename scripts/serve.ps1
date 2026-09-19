# 簡易な静的ファイルサーバー(確認用)
# Python/Node が無い環境でも、このスクリプトだけでサイトを表示確認できます。
# 実行方法: powershell -ExecutionPolicy Bypass -File scripts/serve.ps1 -Port 8000

param(
  [int]$Port = 8000
)

$root = Split-Path -Parent $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
  ".gif"  = "image/gif"
  ".txt"  = "text/plain"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response

  $path = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
  if ($path -eq "/") { $path = "/index.html" }
  $filePath = Join-Path $root ($path.TrimStart("/"))

  if (Test-Path $filePath -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $contentType = $mime[$ext]
    if (-not $contentType) { $contentType = "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.ContentType = $contentType
    # 編集内容が古いキャッシュのせいで反映されないことがないよう、常に最新を取得させる
    $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $response.StatusCode = 404
    $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
    $response.OutputStream.Write($notFound, 0, $notFound.Length)
  }
  $response.OutputStream.Close()
}
