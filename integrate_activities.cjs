/**
 * OCD Activity Integration Script
 * Copies activity component files from OCD-Duplicate repo into monorepo,
 * rewrites imports, and creates index.tsx entry points.
 * 
 * Run: node integrate_activities.cjs
 */

const fs = require('fs');
const path = require('path');

const SOURCE_BASE = 'C:\\Users\\Mantra\\AppData\\Local\\Temp\\ocd-source\\OCD-Duplicate';
const TARGET_BASE = 'src\\app\\features\\ocd\\activities';

// Mapping: [source folder, target slug, main component name]
const STATIC_ACTIVITIES = [
  ['anxiety_cycle', 'anxiety-cycle', 'AnxietyCycle'],
  ['brave_steps', 'brave-steps', 'BraveSteps'],
  ['clutter_and_emotional_journal', 'clutter-journal', 'ClutterJournal'],
  ['discard_it', 'discard-it', 'DiscardIt'],
  ['did_you_know', 'did-you-know', 'DidYouKnow'],
  ['letter_to_ocd', 'letter-to-ocd', 'LetterToOcd'],
  ['mirror_moments', 'mirror-moments', 'MirrorMoments'],
  ['ocd_cycle', 'ocd-cycle', 'OcdCycle'],
  ['ocd_daily_life_new', 'ocd-daily-life', 'OcdDailyLife'],
  ['ocd_one_thing_out', 'one-thing-out', 'OneThingOut'],
  ['ocd_success_stories', 'ocd-success-stories', 'OcdSuccessStories'],
  ['REFRAME_THOUGHTS', 'reframing-thoughts', 'ReframingThoughts'],
  ['response_guide', 'response-guide', 'ResponseGuide'],
  ['ritual_cost', 'ritual-cost', 'RitualCost'],
  ['self_compassion', 'self-compassion', 'SelfCompassion'],
  ['thought_truth', 'thought-truth', 'ThoughtTruth'],
  ['trigger_map', 'trigger-map', 'TriggerMap'],
  ['truth_seeker_quiz', 'truth-seeker', 'TruthSeeker'],
  ['uncertainity_acceptance', 'uncertainty-acceptance', 'UncertaintyAcceptance'],
  ['uncertainity_tolerance', 'uncertainty-tolerance', 'UncertaintyTolerance'],
];

const DB_ACTIVITIES = [
  ['fear_ladder_newest', 'fear-ladder', 'FearLadder'],
  ['mood_tracker', 'mood-tracker', 'MoodTracker'],
  ['ocd_moments_tracker_new', 'ocd-moments', 'OcdMoments'],
  ['reassurance_resistance', 'reassurance-resistance', 'ReassuranceResistance'],
  ['thought_diffusion', 'thought-diffusion', 'ThoughtDiffusion'],
  ['urge_surfing', 'urge-surfing', 'UrgeSurfing'],
];

// Files/dirs to skip when copying
const SKIP_PATTERNS = [
  'node_modules', '.git', '.env', '.env.local', '.env.example',
  'package.json', 'package-lock.json', 'bun.lock', 'bun.lockb',
  'vite.config.ts', 'tsconfig', '.gitignore', 'eslint.config',
  'postcss.config', 'tailwind.config', 'components.json',
  'README.md', 'Dockerfile', '.dockerignore', 'vitest.config',
  'supabase_schema.sql', 'schema.sql', 'supabase', 'public',
  'server.ts', 'server.js', '.github'
];

// Dirs/files to copy from src/
const COPY_FROM_SRC = ['components', 'hooks', 'lib', 'pages', 'utils', 'App.tsx', 'App.css'];

function shouldSkip(name) {
  return SKIP_PATTERNS.some(p => name.toLowerCase().includes(p.toLowerCase()));
}

function fixImports(content, slug) {
  // Fix @/ alias imports - they reference the original app's UI components
  // We need to rewrite DB client imports and auth imports
  
  // Remove supabase imports for Group B activities (will be rewritten)
  content = content.replace(/import.*?from ['"]@\/integrations\/supabase\/client['"].*?\n/g, '');
  content = content.replace(/import.*?supabase.*?from.*?\n/g, '');
  
  // Remove next/router imports
  content = content.replace(/import.*?from ['"]next\/router['"].*?\n/g, '');
  content = content.replace(/import.*?from ['"]next\/navigation['"].*?\n/g, '');
  
  // Remove dead .env references  
  content = content.replace(/import\.meta\.env\.VITE_SUPABASE_URL/g, '""');
  content = content.replace(/import\.meta\.env\.VITE_SUPABASE_PUBLISHABLE_KEY/g, '""');
  
  return content;
}

function copyDir(srcDir, destDir, slug) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  if (!fs.existsSync(srcDir)) return;
  
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (shouldSkip(entry.name)) continue;
    
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, slug);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.css'))) {
      try {
        let content = fs.readFileSync(srcPath, 'utf8');
        content = fixImports(content, slug);
        fs.writeFileSync(destPath, content, 'utf8');
      } catch (e) {
        console.warn(`  ⚠️ Could not copy ${entry.name}: ${e.message}`);
      }
    }
  }
}

function integratActivity(sourceFolder, slug, componentName, isGroupB) {
  const srcBase = path.join(SOURCE_BASE, sourceFolder, 'src');
  const destBase = path.join(TARGET_BASE, slug);
  
  console.log(`\n📦 Integrating: ${sourceFolder} → ${slug}`);
  
  if (!fs.existsSync(srcBase)) {
    console.warn(`  ⚠️ Source not found: ${srcBase}`);
    return false;
  }
  
  // Copy components directory
  const srcComponents = path.join(srcBase, 'components');
  const destComponents = path.join(destBase, 'components');
  if (fs.existsSync(srcComponents)) {
    copyDir(srcComponents, destComponents, slug);
    console.log(`  ✅ Copied components/`);
  }
  
  // Copy hooks directory
  const srcHooks = path.join(srcBase, 'hooks');
  const destHooks = path.join(destBase, 'hooks');
  if (fs.existsSync(srcHooks)) {
    copyDir(srcHooks, destHooks, slug);
    console.log(`  ✅ Copied hooks/`);
  }
  
  // Copy lib directory (excluding supabase client)
  const srcLib = path.join(srcBase, 'lib');
  const destLib = path.join(destBase, 'lib');
  if (fs.existsSync(srcLib)) {
    copyDir(srcLib, destLib, slug);
    console.log(`  ✅ Copied lib/`);
  }
  
  // Copy pages/Index.tsx as index.tsx
  const srcIndex = path.join(srcBase, 'pages', 'Index.tsx');
  if (fs.existsSync(srcIndex)) {
    let content = fs.readFileSync(srcIndex, 'utf8');
    content = fixImports(content, slug);
    fs.writeFileSync(path.join(destBase, 'index.tsx'), content, 'utf8');
    console.log(`  ✅ Copied pages/Index.tsx → index.tsx`);
  } else {
    // Try App.tsx as fallback
    const srcApp = path.join(srcBase, 'App.tsx');
    if (fs.existsSync(srcApp)) {
      let content = fs.readFileSync(srcApp, 'utf8');
      content = fixImports(content, slug);
      fs.writeFileSync(path.join(destBase, 'index.tsx'), content, 'utf8');
      console.log(`  ✅ Copied App.tsx → index.tsx`);
    }
  }
  
  return true;
}

// Process all activities
console.log('🚀 Starting activity integration...\n');
console.log('=== GROUP A (Static Activities) ===');
let success = 0, fail = 0;

for (const [src, slug, name] of STATIC_ACTIVITIES) {
  const ok = integratActivity(src, slug, name, false);
  ok ? success++ : fail++;
}

console.log('\n=== GROUP B (Dynamic Activities) ===');
for (const [src, slug, name] of DB_ACTIVITIES) {
  const ok = integratActivity(src, slug, name, true);
  ok ? success++ : fail++;
}

console.log(`\n✅ Done! ${success} activities integrated, ${fail} failed.`);
