# Generates per-language static pages (/ca/ /es/ /en/ /ja/) from the existing pages.
# Usage (from the project root):  powershell -ExecutionPolicy Bypass -File scripts/generate-lang-pages.ps1
#
# - Source pages (e.g. index.html) are never modified.
# - Page list and per-language title/description are in scripts/lang-pages.json.
# - Output: <lang>/<same path as source>, e.g. ca/index.html
# - This file is ASCII only on purpose; all Japanese/Catalan text lives in the JSON.

$ErrorActionPreference = "Stop"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$root = Split-Path -Parent $PSScriptRoot
$cfg = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot "lang-pages.json"), $utf8) | ConvertFrom-Json

function Escape-Attr([string]$s) {
  return $s.Replace("&", "&amp;").Replace('"', "&quot;").Replace("<", "&lt;").Replace(">", "&gt;")
}

# source page "recipes/index.html" -> URL path "/recipes/" (index.html is dropped)
function Get-UrlPath([string]$page) {
  $p = "/" + ($page -replace "\\", "/")
  if ($p -eq "/index.html") { return "/" }
  if ($p.EndsWith("/index.html")) { return $p.Substring(0, $p.Length - "index.html".Length) }
  return $p
}

$count = 0
foreach ($pageProp in $cfg.pages.PSObject.Properties) {
  $page = $pageProp.Name
  $src = [System.IO.File]::ReadAllText((Join-Path $root $page), $utf8).Replace("`r`n", "`n")
  $urlPath = Get-UrlPath $page

  # hreflang block (same for every language version, includes the page itself)
  $alt = New-Object System.Collections.Generic.List[string]
  foreach ($l in $cfg.langs) {
    $alt.Add('<link rel="alternate" hreflang="' + $l + '" href="' + $cfg.siteUrl + "/" + $l + $urlPath + '">')
  }
  $alt.Add('<link rel="alternate" hreflang="x-default" href="' + $cfg.siteUrl + "/" + $cfg.defaultLang + $urlPath + '">')

  foreach ($lang in $cfg.langs) {
    $meta = $pageProp.Value.$lang
    $html = $src

    # language, title
    $html = [regex]::Replace($html, '<html lang="[^"]*">', '<html lang="' + $lang + '">')
    $html = [regex]::Replace($html, '<title>.*?</title>', { param($m) "<title>" + (Escape-Attr $meta.title) + "</title>" })

    # drop the source page's own description / canonical, then add this language's SEO block
    $html = [regex]::Replace($html, '(?m)^<meta name="description"[^\n]*\n', "")
    $html = [regex]::Replace($html, '(?m)^<link rel="canonical"[^\n]*\n', "")
    $seo = New-Object System.Collections.Generic.List[string]
    $seo.Add('<meta name="description" content="' + (Escape-Attr $meta.description) + '">')
    $seo.Add('<link rel="canonical" href="' + $cfg.siteUrl + "/" + $lang + $urlPath + '">')
    foreach ($a in $alt) { $seo.Add($a) }
    $seo.Add('<script>window.PAGE_LANG = "' + $lang + '";</script>')
    $seoText = ($seo -join "`n") + "`n"
    $html = [regex]::Replace($html, '(<meta name="viewport"[^\n]*\n)', { param($m) $m.Groups[1].Value + $seoText })

    # assets / images / data: relative -> absolute (the page now lives one folder deeper)
    # (works for any source depth: "assets/", "../assets/", "../../assets/" ...)
    $html = [regex]::Replace($html, '(src|href)="(?:\.\./)*(?:\./)?(assets|images|data)/', '$1="/$2/')
    # siteRoot passed to renderGlobalNav / renderGlobalFooter / initXxxPage: "./", "../", "../../" -> "/"
    $html = [regex]::Replace($html, ', "(?:\./|(?:\.\./)+)"', ', "/"')

    # note for maintainers, right after the doctype
    $html = [regex]::Replace($html, '^(<!DOCTYPE html>\n)', { param($m) $m.Groups[1].Value + "<!-- " + $cfg.generatedNote + " -->`n" })

    $outPath = Join-Path $root ($lang + "/" + $page)
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $outPath) | Out-Null
    [System.IO.File]::WriteAllText($outPath, $html, $utf8)
    $count++
    Write-Host ("generated " + $lang + "/" + $page)
  }
}
Write-Host ("done: " + $count + " files")

# sitemap.xml: one <url> per language page, each listing every language version (hreflang) + x-default.
# Built from the same page list as above, so it always matches the hreflang tags inside the pages.
$sm = New-Object System.Collections.Generic.List[string]
$sm.Add('<?xml version="1.0" encoding="UTF-8"?>')
$sm.Add('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">')
$urlCount = 0
foreach ($pageProp in $cfg.pages.PSObject.Properties) {
  $urlPath = Get-UrlPath $pageProp.Name
  foreach ($lang in $cfg.langs) {
    $sm.Add('  <url>')
    $sm.Add('    <loc>' + $cfg.siteUrl + "/" + $lang + $urlPath + '</loc>')
    foreach ($l in $cfg.langs) {
      $sm.Add('    <xhtml:link rel="alternate" hreflang="' + $l + '" href="' + $cfg.siteUrl + "/" + $l + $urlPath + '"/>')
    }
    $sm.Add('    <xhtml:link rel="alternate" hreflang="x-default" href="' + $cfg.siteUrl + "/" + $cfg.defaultLang + $urlPath + '"/>')
    $sm.Add('  </url>')
    $urlCount++
  }
}
$sm.Add('</urlset>')
[System.IO.File]::WriteAllText((Join-Path $root "sitemap.xml"), (($sm -join "`n") + "`n"), $utf8)
Write-Host ("sitemap.xml: " + $urlCount + " URLs")
