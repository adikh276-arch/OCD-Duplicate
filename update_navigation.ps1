$targetDir = "c:\Users\Mantra\Downloads\MantraCare services dashboard (1)\src\app\features\ocd\pages"
$files = @("ContaminationOCDPage.tsx", "HealthOCDPage.tsx", "HoardingOCDPage.tsx", "PureOOCDPage.tsx", "TrichotillomaniaPage.tsx")

foreach ($fileName in $files) {
    $filePath = Join-Path $targetDir $fileName
    if (Test-Path $filePath) {
        Write-Host "Updating navigation in $fileName..."
        $content = Get-Content -Path $filePath -Raw
        
        # Replace window.open pattern in Tools section
        # Look for onClick={() => { window.open(tool.url, "_blank"); }} or similar
        $oldPattern = 'onClick={() => \{(\s*)if \(tool\.url\) \{(\s*)window\.open\(tool\.url, "_blank"\);(\s*)\}(\s*)\}'
        $newContent = 'onClick={() => {$1if (tool.url) {$2if (tool.url.includes("mantracare")) {$3navigate(`/tool?url=${encodeURIComponent(tool.url)}&title=${encodeURIComponent(tool.label)}`);$4} else {$5window.open(tool.url, "_blank");$6}$7}$8}'
        
        # Try a more generic replacement if the above doesn't match perfectly
        $content = $content -replace 'window\.open\(tool\.url, "_blank"\)', 'if (tool.url.includes("mantracare")) { navigate(`/tool?url=${encodeURIComponent(tool.url)}&title=${encodeURIComponent(tool.label)}`); } else { window.open(tool.url, "_blank"); }'
        
        Set-Content -Path $filePath -Value $content
    }
}
