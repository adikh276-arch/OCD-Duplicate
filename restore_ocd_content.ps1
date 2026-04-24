$originalDir = "c:\Users\Mantra\Downloads\MantraCare_Original\src\app\components"
$targetBaseDir = "c:\Users\Mantra\Downloads\MantraCare services dashboard (1)\src\app\features\ocd"

$subdirs = @("articles", "stories", "tips")

foreach ($subdir in $subdirs) {
    $dirPath = Join-Path $targetBaseDir $subdir
    if (Test-Path $dirPath) {
        $files = Get-ChildItem -Path $dirPath -Filter "*.tsx"
        foreach ($file in $files) {
            $originalPath = Join-Path $originalDir $file.Name
            if (Test-Path $originalPath) {
                Write-Host "Restoring $($file.Name)..."
                $content = Get-Content -Path $originalPath -Raw
                
                # Remove Sidebar and MobileNav imports
                $content = $content -replace 'import \{ Sidebar \} from "\./Sidebar";', ''
                $content = $content -replace 'import \{ MobileNav \} from "\./MobileNav";', ''
                $content = $content -replace 'import \{ Sidebar \} from "\.\./Sidebar";', ''
                $content = $content -replace 'import \{ MobileNav \} from "\.\./MobileNav";', ''
                
                # Remove Sidebar and MobileNav components from JSX
                $content = $content -replace '<Sidebar />', ''
                $content = $content -replace '<MobileNav />', ''
                
                # Remove the flex wrapper if it exists (usually <div className="flex min-h-screen bg-[#F9FAFB]">)
                # We want to keep the min-h-screen and background though.
                $content = $content -replace 'className="flex min-h-screen', 'className="min-h-screen'
                
                # Remove pt-[72px] md:pt-8 from main/div
                $content = $content -replace 'pt-\[72px\] md:pt-8', ''
                
                # Update other imports if necessary (e.g. MobileAppModal, ImageWithFallback)
                $content = $content -replace 'from "\./MobileAppModal"', 'from "@/components/MobileAppModal"'
                $content = $content -replace 'from "\./figma/ImageWithFallback"', 'from "@/components/figma/ImageWithFallback"'
                
                Set-Content -Path $file.FullName -Value $content
            }
        }
    }
}

# Cleanup unwanted files
$unwanted = @(
    "src/app/features/ocd/articles/LGBTQArticleDetail.tsx",
    "src/app/features/ocd/articles/LGBTQArticles.tsx",
    "src/app/features/ocd/stories/CareTeamHistory.tsx",
    "src/app/features/ocd/tips/LGBTQMythDetail.tsx",
    "src/app/features/ocd/tips/LGBTQMythsFacts.tsx",
    "src/app/features/ocd/tips/LGBTQTips.tsx"
)

foreach ($path in $unwanted) {
    $fullPath = Join-Path "c:\Users\Mantra\Downloads\MantraCare services dashboard (1)" $path
    if (Test-Path $fullPath) {
        Write-Host "Removing unwanted file: $path"
        Remove-Item -Path $fullPath -Force
    }
}
