# Builds the site icons from the official logo (images/brand/hakkodo-logo-1600.jpg).
# Usage (from the project root):  powershell -ExecutionPolicy Bypass -File scripts/make-icons.ps1
#
# - The official logo file is only READ, never modified.
# - favicon-48x48.png / favicon-96x96.png / favicon-192x192.png / favicon.ico:
#     the FACE part of the logo, cut out as a plain square (no redrawing, no recoloring).
# - apple-touch-icon.png (180x180): the WHOLE official logo (face + HAKKODO), resized.
# - This file is ASCII only on purpose.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$logo = New-Object System.Drawing.Bitmap((Join-Path $root "images/brand/hakkodo-logo-1600.jpg"))
if ($logo.Width -ne $logo.Height) { throw "official logo must be square" }

# --- find the face: dark pixels above the HAKKODO text (text starts below y=1060 in the 1600px logo) ---
$limitY = [int]($logo.Height * 0.66)
$minX = $logo.Width; $minY = $logo.Height; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $limitY; $y += 2) {
  for ($x = 0; $x -lt $logo.Width; $x += 2) {
    $c = $logo.GetPixel($x, $y)
    if (($c.R + $c.G + $c.B) -lt 384) { if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }; if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y } }
  }
}
$faceW = $maxX - $minX; $faceH = $maxY - $minY
$side = [int][math]::Round([math]::Max($faceW, $faceH) * 1.17)      # about 8% white margin around the face
$cx = [int](($minX + $maxX) / 2); $cy = [int](($minY + $maxY) / 2)
$left = [math]::Max(0, [math]::Min($logo.Width - $side, $cx - [int]($side / 2)))
$top = [math]::Max(0, [math]::Min($logo.Height - $side, $cy - [int]($side / 2)))
Write-Host ("face box: x {0}-{1}, y {2}-{3} ({4}x{5}); square crop: left {6}, top {7}, side {8}" -f $minX, $maxX, $minY, $maxY, $faceW, $faceH, $left, $top, $side)

function Resize-Square($src, $sx, $sy, $sw, [int]$size) {
  # resize in 2 steps (to 4x target, then to target) so thin lines stay clean
  $mid = [math]::Min($sw, $size * 4)
  $a = New-Object System.Drawing.Bitmap($mid, $mid); $g = [System.Drawing.Graphics]::FromImage($a)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'; $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $mid, $mid)), $sx, $sy, $sw, $sw, 'Pixel'); $g.Dispose()
  $b = New-Object System.Drawing.Bitmap($size, $size); $g = [System.Drawing.Graphics]::FromImage($b)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'; $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($a, 0, 0, $size, $size); $g.Dispose(); $a.Dispose()
  return $b
}
function Save-Png($bmp, $path) { $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) }
function Png-Bytes($bmp) { $ms = New-Object System.IO.MemoryStream; $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png); $bytes = $ms.ToArray(); $ms.Dispose(); return ,$bytes }

# --- favicon PNGs (face only) ---
foreach ($s in 48, 96, 192) {
  $b = Resize-Square $logo $left $top $side $s
  Save-Png $b (Join-Path $root ("favicon-{0}x{0}.png" -f $s)); $b.Dispose()
  Write-Host ("wrote favicon-{0}x{0}.png" -f $s)
}

# --- favicon.ico (16, 32, 48 px; PNG-compressed entries) ---
$icoSizes = 16, 32, 48
$entries = @()
foreach ($s in $icoSizes) { $b = Resize-Square $logo $left $top $side $s; $data = [byte[]](Png-Bytes $b); $entries += [pscustomobject]@{ Size = $s; Data = $data }; $b.Dispose() }
$ms = New-Object System.IO.MemoryStream; $w = New-Object System.IO.BinaryWriter($ms)
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]$entries.Count)
$offset = 6 + 16 * $entries.Count
foreach ($e in $entries) {
  $w.Write([byte]$e.Size); $w.Write([byte]$e.Size); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([uint16]1); $w.Write([uint16]32); $w.Write([uint32]$e.Data.Length); $w.Write([uint32]$offset)
  $offset += $e.Data.Length
}
foreach ($e in $entries) { $w.Write($e.Data) }
$w.Flush(); [System.IO.File]::WriteAllBytes((Join-Path $root "favicon.ico"), $ms.ToArray()); $w.Dispose(); $ms.Dispose()
Write-Host "wrote favicon.ico (16, 32, 48)"

# --- apple-touch-icon.png (180x180): the whole official logo ---
$b = Resize-Square $logo 0 0 $logo.Width 180
Save-Png $b (Join-Path $root "apple-touch-icon.png"); $b.Dispose()
Write-Host "wrote apple-touch-icon.png (180x180, whole logo)"
$logo.Dispose()
