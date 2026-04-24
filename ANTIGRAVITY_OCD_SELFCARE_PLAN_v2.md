# 🧠 OCD Self-Care — Antigravity Execution Plan
> **Docker slug:** `ocd_selfcare` | **Tag:** `1.0` | **Deployed via:** GitHub Actions
> **Source repo (activities):** https://github.com/adikh276-arch/OCD-Duplicate
> **Neon Project ID:** `lively-sky-48663512`
> **Neon DB URL:** `postgresql://neondb_owner:npg_A0iG3JvxKUDN@ep-steep-term-aoxd3b8h-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
> **Docker registry:** `bunker.mantracare.com/lovable/ocd_selfcare`
> **Docker credentials:** `USERNAME` and `PASSWORD` secrets already added ✅

---

## ⚠️ CRITICAL RULES — READ BEFORE TOUCHING ANYTHING

| Rule | Detail |
|---|---|
| **DO NOT change the existing UI** | The selfcare UI, its inner pages, and all text-based content are final. No layout changes, no CSS changes, no copy changes, no component restructuring |
| **Only replace activity/exercise links** | The one and only job is: find every link/button in the UI that currently points to an external activity or exercise URL, and replace it with the actual inline component from the OCD-Duplicate repo |
| **Only take relevant folders** | Do NOT copy the entire OCD-Duplicate repo. Identify and take only the folders that contain activities/exercises. Ignore everything else (landing pages, about pages, admin configs, CI configs, unrelated utilities) |
| **No individual configs** | Strip all individual `package.json` build scripts, `.env` files, individual DB clients, and individual auth setups from every activity folder before integrating |
| **No new CSS** | Zero changes to any `.css`, `.scss`, or `className` value |
| **No new translation keys** | Rename/alias existing keys only. Log every rename in `TRANSLATION_RENAMES.md` |
| **Schema from repo — never invented** | Check each activity folder for a `.sql` file or schema first. If none exists, read the code and derive it. Never guess or add columns that aren't evidenced in the code |
| **One table per activity** | Every activity with DB needs its own dedicated prefixed table. Zero shared tables |
| **`users` table required** | A shared `users` table with `BIGINT` primary key must exist. On a successful handshake, if that `user_id` has no row yet, the frontend must upsert them immediately |
| **`sessionStorage` not `localStorage`** | Auth stores `user_id` in `sessionStorage` only. Tab close = session gone = fresh handshake required |
| **No submodules** | Remove `.git` from cloned repo before copying anything into the monorepo |
| **No hardcoded secrets** | `DATABASE_URL` must never appear in source code. CI will grep and hard-fail if found |

---

## 📐 ARCHITECTURE OVERVIEW

```
┌──────────────────────────────────────────────────────────────────────┐
│  EXISTING UI (DO NOT TOUCH)                                          │
│  • All selfcare pages, inner pages, text content — final as-is      │
│  • Only the links/buttons pointing to activities get replaced        │
└──────────────────────────┬───────────────────────────────────────────┘
                           │ replace links with ↓
┌──────────────────────────▼───────────────────────────────────────────┐
│  OCD-Duplicate repo — adikh276-arch/OCD-Duplicate                   │
│                                                                      │
│  GROUP A — Static activities (no DB, no auth)                       │
│  • Pure UI exercises                                                 │
│  • Clone folder → strip configs → embed as React component          │
│                                                                      │
│  GROUP B — Dynamic activities (DB + auth required)                  │
│  • Activities that save/track user data                             │
│  • Clone folder → strip individual DB/auth → wire to monorepo      │
│    Neon (lively-sky-48663512) + TokenGuard                          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📦 STEP 0 — Repo Audit (Do This First, Before Anything Else)

The OCD-Duplicate repo contains multiple folders. Before any code is copied, Antigravity must do a full audit:

**0.1** Clone the repo into a staging directory:
```bash
mkdir /tmp/ocd-source && cd /tmp/ocd-source
git clone https://github.com/adikh276-arch/OCD-Duplicate
cd OCD-Duplicate
```

**0.2** List all top-level folders and identify which ones are activities/exercises:
```bash
ls -la
# For each folder, check if it's an activity or something else:
find . -maxdepth 2 -name "package.json" | sort
```

**0.3** For each folder that IS an activity, classify it:
```bash
# Check if it has DB usage:
grep -rn "prisma\|drizzle\|pg\|neon\|supabase\|mongoose\|Pool\|INSERT\|SELECT\|UPDATE" <folder>/src/
# If DB usage found → Group B (dynamic)
# If no DB usage → Group A (static)
```

**0.4** Build the definitive two-column table before proceeding:

| Folder Name | Type | Has DB? | Notes |
|---|---|---|---|
| *(fill after audit)* | Group A / Group B | Yes / No | |

> ⚠️ Do NOT proceed past Step 0 until this table is complete. Every subsequent step depends on it.

**0.5** Identify all the links/buttons in the existing UI that need to be replaced:
```bash
# In the monorepo's existing selfcare UI:
grep -rn "http\|href\|window.open\|target.*_blank" src/ \
  | grep -v "node_modules" \
  | grep -v ".git"
```
Save this as `LINKS_TO_REPLACE.txt` — this is the exact list of what gets swapped in Steps 5 and 6.

**0.6** Strip `.git` from the cloned repo immediately:
```bash
rm -rf /tmp/ocd-source/OCD-Duplicate/.git
echo "✅ Detached from individual repo"
```

---

## 🗄️ STEP 1 — Neon DB — Full Wipe and Recreate

> ⚠️ **DESTRUCTIVE AND IRREVERSIBLE.**
> **Neon Project:** `lively-sky-48663512`
> **Connection string is in the `DATABASE_URL` GitHub Secret — use that. Do not hardcode it anywhere in source code.**

**1.1** Connect via MCP to the Neon project `lively-sky-48663512`. Confirm the correct project before running anything.

**1.2** Wipe the DB completely:
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
COMMENT ON SCHEMA public IS 'standard public schema';
```

**1.3** For every Group B activity identified in Step 0 — resolve its schema using this strict decision tree. Follow it in order, no skipping:

```
Does the activity folder have a .sql file or /migrations directory?
  YES → Use that SQL exactly as written. Do not modify it.
        Run it in Neon as-is.
   NO → Does it have prisma/schema.prisma or a drizzle schema file?
          YES → Generate SQL:
                  prisma: run `prisma migrate dev --create-only`
                  drizzle: run `drizzle-kit generate`
                Use the generated SQL. Do not add columns.
           NO → Read the entire activity codebase:
                  - Every db query (INSERT, SELECT, UPDATE, DELETE)
                  - Every TypeScript type or interface for stored data
                  - Every API route that reads or writes
                Write the minimal SQL that satisfies exactly what the
                code does. Nothing more. No speculative columns.
                No "this might be useful later" fields.
```

> ⛔ **NEVER invent a schema. NEVER add tables or columns not directly evidenced in the code.**

**1.4 One table per activity — enforced:**

Each Group B activity gets its own table named `ocd_<activity_slug>_entries`. This prevents any possible column name collision or `user_id` row mixing between activities.

Example pattern (actual table name and columns come from Step 1.3 schema resolution):
```sql
-- Pattern only — actual columns derived from repo, not from this plan:
CREATE TABLE ocd_<activity_slug>_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL,   -- always required, scoped per user
  -- ... all other columns exactly as defined in the repo's schema/code
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

**1.5** Once all Group B schemas are resolved, run them all in a single transaction. The `users` table is always created first — it is shared across all activities:
```sql
BEGIN;

  -- ── USERS TABLE (shared, always required) ──────────────────────────
  -- Primary key is BIGINT to match the user_id returned by the
  -- handshake API (api.mantracare.com/user/user-info).
  -- Do NOT use UUID here — the external identity is a BIGINT.
  CREATE TABLE IF NOT EXISTS users (
    id         BIGINT PRIMARY KEY,   -- set by handshake API, not generated here
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- ── ACTIVITY TABLES (one per Group B activity) ─────────────────────
  -- CREATE TABLE ocd_<activity_1>_entries ( ... );
  -- CREATE TABLE ocd_<activity_2>_entries ( ... );
  -- ... columns derived from each repo's schema (Step 1.3), not invented

COMMIT;
```

**1.6** Verify all tables are created:
```bash
DATABASE_URL="postgresql://neondb_owner:npg_A0iG3JvxKUDN@ep-steep-term-aoxd3b8h-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" \
  pnpm db:ping
```

---

## 🔧 STEP 2 — Strip Individual Configs From All Activity Folders

Run this for every activity folder (Group A and Group B both):

**2.1** Remove all individual environment files:
```bash
cd /tmp/ocd-source/OCD-Duplicate/<activity_folder>
rm -f .env .env.local .env.example .env.production .env.development
```

**2.2** Remove individual DB config files:
```bash
rm -f prisma/schema.prisma
rm -f knexfile.js knexfile.ts
rm -f drizzle.config.ts drizzle.config.js
rm -f src/lib/db.ts src/lib/db.js
rm -f src/utils/db.ts src/db/index.ts src/db/client.ts
```

**2.3** Remove individual auth config files:
```bash
rm -f src/lib/auth.ts src/lib/auth.js
rm -f src/utils/auth.ts src/middleware/auth.ts
# Remove any JWT, cookie, session, OAuth, or firebase auth setup
grep -rn "jwt\|jsonwebtoken\|cookie-parser\|express-session\|Auth0\|firebase\.auth\|supabase\.auth" src/
# Log every hit — remove those files/blocks
```

**2.4** Strip individual `package.json` app scripts — remove `start`, `build`, `dev`, `preview` from the activity's `package.json`. The monorepo workspace drives all builds:
```bash
# Check what scripts exist:
cat package.json | grep -A 20 '"scripts"'
# Remove start/build/dev/preview entries
```

**2.5** Remove any standalone server files (Express/Fastify/Hono entry points that won't be used):
```bash
rm -f server.ts server.js index.ts index.js app.ts app.js
# But KEEP React component files — only remove server entry points
```

---

## 📁 STEP 3 — Copy Activity Code Into Monorepo

For each activity folder (after Step 2 cleanup):

**3.1** Copy into the monorepo at:
```
src/features/ocd/<activity_slug>/
  ├── index.tsx          ← main component export (rename App.tsx/main.tsx to this)
  ├── components/        ← sub-components
  ├── hooks/             ← custom hooks
  └── utils/             ← helper functions
```

**3.2** Fix all imports inside the copied files:
```bash
# Remove next/router → replace with useNavigate from react-router-dom
# Remove next/image → replace with plain <img>
# Remove dead .env references from static activities
# Replace individual DB client imports with monorepo shared client:

# BEFORE:
import { db } from '../lib/db'
import { sql } from '@vercel/postgres'
import { neon } from '@neondatabase/serverless'

# AFTER:
import { db } from '@ocd/db'   # or whatever the monorepo's shared db package is named
```

**3.3** For Group B activities — replace all auth/userId references:
```tsx
// BEFORE (individual auth hook):
const { user } = useAuth()
const userId = user?.id

// AFTER — read user_id from sessionStorage (set by the auth handshake on mount):
const userId = sessionStorage.getItem('user_id')
// user_id is guaranteed non-null here — TokenGuard blocks render until handshake succeeds
// Always include it in every DB query to scope data to this user
```

**3.4** Handle translations — same rule for all activities:
- Open the activity's translation file if it has one
- Map each key to the closest existing key in the monorepo's translation files
- If renaming is needed, rename the monorepo key to something generic enough for both
- Log every rename: `old_key → new_key` in `TRANSLATION_RENAMES.md`
- **Zero new keys added**

---

## 🔗 STEP 4 — Wire Activities Into the Existing UI

This is the core step. The existing UI has links/buttons pointing to external activity URLs. Replace each one with a React Router `<Link>` pointing to the new inline component.

**4.1** Work through `LINKS_TO_REPLACE.txt` from Step 0.5 one by one.

For each external link found:
```tsx
// BEFORE — external link (delete this):
<a href="https://some-external-url.com/activity-name" target="_blank">
  Start Activity
</a>

// OR:
window.open('https://some-external-url.com/activity-name')

// AFTER — internal React Router link (replace with this):
<Link to="/ocd/activities/<activity-slug>">
  Start Activity
</Link>
```

**4.2** Add the corresponding routes in the monorepo router. One route per activity. Wrap **all** activity routes in `<ActivityLayout>` (see Step 5.2 — this is the component that adds the back button):
```tsx
// Add inside the existing <Routes> block — do NOT restructure the router

// Group A (static — no auth gate needed beyond what already wraps the app):
<Route element={<ActivityLayout />}>
  <Route path="/ocd/activities/box-breathing"        element={<BoxBreathing />} />
  <Route path="/ocd/activities/grounding-54321"      element={<Grounding54321 />} />
  {/* ... one line per static activity identified in Step 0 */}

  {/* Group B (dynamic — already protected by TokenGuard which wraps everything): */}
  <Route path="/ocd/activities/<slug>"               element={<ActivityComponent />} />
  {/* ... one line per dynamic activity identified in Step 0 */}
</Route>
```

> ⚠️ **Do not change any existing routes.** Only ADD new `/ocd/activities/*` routes under the `<ActivityLayout>` wrapper. Do not move, rename, or touch any routes that already exist in the router.

**4.3** Verify the link replacement is complete:
```bash
# All external activity links must be gone
grep -rn "adikh276-arch\|OCD-Duplicate" src/
# Must return 0 results

# Verify original UI links that were NOT activities are untouched
# (Text content links, info links, etc. — leave those alone)
```

---

## 🔐 STEP 5 — Token Handshake + Deep-Link Path Preservation + Back Button

### 5.1 — How the full auth flow works

The handshake has been upgraded to handle two scenarios:

**Scenario A — Direct deep link with token in URL**
Someone navigates directly to a specific activity URL with a token already present:
`/ocd_selfcare/ocd/activities/box-breathing?token=abc123`
After a successful handshake the app stays on that exact path — token stripped, route intact.

**Scenario B — Direct deep link without a token (fresh navigation, no session)**
Someone navigates to `/ocd_selfcare/ocd/activities/box-breathing` but has no session.
The intended path is saved to `sessionStorage` as `OCD_REDIRECT_PATH`, then the user is
hard-redirected to `/token`. After the webview controller reinjects the token and the
handshake succeeds, the app reads `OCD_REDIRECT_PATH` and navigates to the correct page
instead of defaulting to the selfcare home.

```
App mounts
    │
    ├─ ?token present in URL?
    │       │
    │      YES → POST https://api.mantracare.com/user/user-info { token }
    │              │
    │             200 OK → store user_id in sessionStorage
    │                       clean ?token from URL via replaceState
    │                         (pathname is preserved — only the query param is removed)
    │                       upsert user into users table if first visit
    │                       check sessionStorage for OCD_REDIRECT_PATH
    │                         → if found: navigate(savedPath) and clear OCD_REDIRECT_PATH
    │                         → if not found: stay on current pathname (already correct)
    │                       render app ✅
    │              │
    │             any error → hard redirect window.location.href = '/token'
    │
    ├─ no token + user_id exists in sessionStorage → already authed, render ✅
    │
    └─ no token + no sessionStorage user_id
              → save current path to sessionStorage as OCD_REDIRECT_PATH
              → hard redirect window.location.href = '/token'
```

### 5.2 — `TokenGuard` component

```tsx
// src/components/TokenGuard.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '@ocd/db'; // monorepo shared DB client

const HANDSHAKE_URL    = 'https://api.mantracare.com/user/user-info';
const REDIRECT_PATH_KEY = 'OCD_REDIRECT_PATH'; // sessionStorage key — namespaced

export function TokenGuard({ children }: { children: React.ReactNode }) {
  // 'pending'  — handshake in progress, render nothing
  // 'authed'   — user_id confirmed, render app
  // 'failed'   — redirect to /token (component returns null while redirecting)
  const [status, setStatus] = useState<'pending' | 'authed' | 'failed'>('pending');

  const location = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const params     = new URLSearchParams(location.search);
    const token      = params.get('token');
    const existingId = sessionStorage.getItem('user_id');

    // ── Already authenticated in this tab session ────────────────────
    if (!token && existingId) {
      setStatus('authed');
      return;
    }

    // ── Token present — perform handshake ────────────────────────────
    if (token) {
      fetch(HANDSHAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then(async res => {
          if (!res.ok) throw new Error(`Handshake failed: ${res.status}`);
          return res.json();
        })
        .then(async ({ user_id }: { user_id: number }) => {
          // 1. Persist in sessionStorage — tab-scoped, purged on close
          sessionStorage.setItem('user_id', String(user_id));

          // 2. Clean ONLY the ?token param from the URL.
          //    pathname is kept intact so a deep-linked activity path is preserved.
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);

          // 3. Upsert user into users table (first-visit initialization)
          await db.query(
            `INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`,
            [user_id]
          );

          // 4. If there is a saved deep-link path (Scenario B return journey),
          //    navigate there and clear the saved path.
          //    Otherwise stay on the current pathname (Scenario A — already correct).
          const savedPath = sessionStorage.getItem(REDIRECT_PATH_KEY);
          if (savedPath) {
            sessionStorage.removeItem(REDIRECT_PATH_KEY);
            navigate(savedPath, { replace: true });
          }

          setStatus('authed');
        })
        .catch(() => {
          setStatus('failed');
          window.location.href = '/token';
        });

      return;
    }

    // ── No token, no existing session ────────────────────────────────
    // Save the intended path so we can return here after the handshake.
    // Include the search params MINUS the token (token is absent here anyway).
    const intendedPath = location.pathname + location.search;
    sessionStorage.setItem(REDIRECT_PATH_KEY, intendedPath);

    setStatus('failed');
    window.location.href = '/token';
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render nothing until handshake resolves ──────────────────────────
  if (status === 'pending') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}>
        {/* Use the existing app's loading spinner/component if one exists */}
        <span>Loading...</span>
      </div>
    );
  }

  if (status === 'failed') return null;

  return <>{children}</>;
}
```

> ⚠️ **Loading state note:** Replace the `<span>Loading...</span>` with whatever loading component already exists in the app. Do NOT create a new spinner component — reuse what's there.

### 5.3 — `ActivityLayout` component (back button)

Every activity route is rendered inside this layout wrapper. It renders the activity content plus a fixed "✕ Exit" button in the **top-right corner** that returns the user to the selfcare home page (`/`). This is the only new component being introduced.

**Critical constraint:** Do not add any new CSS file. Use only inline styles or existing `className` values already present in the app.

```tsx
// src/components/ActivityLayout.tsx
import { Outlet, useNavigate } from 'react-router-dom';

export function ActivityLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Exit / Back button ─────────────────────────────────────── */}
      {/* Fixed top-right on all activity pages.                       */}
      {/* Navigates to selfcare home. No new CSS — all inline styles.  */}
      <button
        onClick={() => navigate('/')}
        aria-label="Exit activity and return to home"
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          backgroundColor: 'rgba(0,0,0,0.08)',
          color: 'inherit',
          backdropFilter: 'blur(4px)',
        }}
      >
        ✕ Exit
      </button>

      {/* ── Activity content ───────────────────────────────────────── */}
      <Outlet />
    </div>
  );
}
```

> ⚠️ The inline styles above are intentionally minimal and neutral. They inherit `color` from the parent so the button blends with whatever the activity's theme is. If the existing app has a shared "icon button" component or a `className` that already produces a similar look, use that instead and remove the inline style block. Zero new CSS either way.

### 5.4 — Wire into `App.tsx`

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TokenGuard }    from './components/TokenGuard';
import { ActivityLayout } from './components/ActivityLayout';

export default function App() {
  return (
    <BrowserRouter basename="/ocd_selfcare">
      <TokenGuard>
        <Routes>
          {/* ── All existing routes — untouched ───────────────────── */}

          {/* ── New activity routes — all inside ActivityLayout ───── */}
          {/* ActivityLayout renders the ✕ Exit button on every       */}
          {/* activity page and <Outlet /> for the activity itself.   */}
          <Route element={<ActivityLayout />}>
            {/* Group A — static */}
            <Route path="/ocd/activities/box-breathing"   element={<BoxBreathing />} />
            {/* ... one per static activity from Step 0 audit */}

            {/* Group B — dynamic */}
            <Route path="/ocd/activities/<slug>"          element={<ActivityComponent />} />
            {/* ... one per dynamic activity from Step 0 audit */}
          </Route>
        </Routes>
      </TokenGuard>
    </BrowserRouter>
  );
}
```

### 5.5 — Security notes

- **`sessionStorage` is intentional.** Closing the tab purges both `user_id` and `OCD_REDIRECT_PATH`. The webview controller is expected to reinject `?token=` on each new session. Do not change this to `localStorage`.
- **`OCD_REDIRECT_PATH` is cleared immediately after use.** It only lives in sessionStorage long enough to survive the `/token` round-trip. It is removed as soon as the post-handshake navigate fires.
- **Every DB query in every Group B activity must include a `user_id` filter.** The `user_id` from `sessionStorage` is the only row-level scope. There is no RLS at the DB level since this is Neon (not Supabase), so the app code is the enforcement layer.
- **The `/token` redirect is a hard `window.location.href`.** Do not use React Router's `navigate()` for this — the webview controller handles that route, not the React app.
- **Stale token handling:** If a `?token=` hits the URL while `user_id` is already in sessionStorage (user refreshes a bookmarked URL that still has `?token=`), the handshake still runs. `sessionStorage.setItem` overwrites with the new resolved `user_id`. This is correct — always re-validate a presented token.

---

## ✅ STEP 6 — Verification Gate

**All checks must pass before Docker build is triggered.**

```bash
# 1. No external activity links remain in the UI
result=$(grep -rn "adikh276-arch\|OCD-Duplicate" src/)
[ -z "$result" ] && echo "✅ No external repo links" || (echo "❌ FAIL: $result" && exit 1)

# 2. No individual DB clients in any feature folder
result=$(grep -rn "new PrismaClient\|new Pool\|createClient.*neon\|drizzle(" src/features/)
[ -z "$result" ] && echo "✅ No individual DB clients" || (echo "❌ FAIL: $result" && exit 1)

# 3. No individual auth setups in any feature folder
result=$(grep -rn "jwt\.sign\|jwt\.verify\|supabase\.auth\|firebase\.auth\|new Auth0" src/features/)
[ -z "$result" ] && echo "✅ No individual auth setups" || (echo "❌ FAIL: $result" && exit 1)

# 4. No new CSS files introduced
result=$(git diff --name-only origin/main | grep "\.css$\|\.scss$")
[ -z "$result" ] && echo "✅ No new CSS files" || (echo "❌ FAIL: CSS was modified" && exit 1)

# 5. No new .env files committed
result=$(git diff --name-only origin/main | grep "\.env")
[ -z "$result" ] && echo "✅ No .env files committed" || (echo "❌ FAIL: .env was committed" && exit 1)

# 6. DATABASE_URL is not hardcoded anywhere in source
result=$(grep -rn "npg_A0iG3JvxKUDN\|ep-steep-term-aoxd3b8h" src/)
[ -z "$result" ] && echo "✅ DB credentials not hardcoded" || (echo "❌ FAIL — DB URL in source code" && exit 1)

# 7. All translation keys resolve
pnpm i18n:check && echo "✅ i18n OK" || (echo "❌ Missing translation keys" && exit 1)

# 8. TypeScript clean
pnpm tsc --noEmit && echo "✅ TypeScript OK" || (echo "❌ TypeScript errors" && exit 1)

# 9. Build passes
pnpm build && echo "✅ Build OK" || (echo "❌ Build failed" && exit 1)
```

---

## 🐳 STEP 7 — Docker Build via GitHub Actions

The app is hosted at a **subpath** (`/ocd_selfcare`), not at the root. All four config files below must reflect this slug exactly.

### 7.1 — `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/ocd_selfcare",
  plugins: [react()],
  // ... any other existing config, unchanged
})
```

### 7.2 — `src/App.tsx` — `basename` on BrowserRouter
```tsx
// The basename must match the base in vite.config.ts exactly
<BrowserRouter basename="/ocd_selfcare">
  <TokenGuard>
    <Routes>
      {/* all routes */}
    </Routes>
  </TokenGuard>
</BrowserRouter>
```

### 7.3 — `vite-nginx.conf` (create in project root)
```nginx
server {
    listen 80;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /ocd_selfcare/index.html;
    }

    error_page 404 /ocd_selfcare/index.html;

    location = / {
        return 301 /ocd_selfcare/;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 7.4 — `.dockerignore` (create in project root)
```
node_modules
.pnp
.pnp.js
dist
build
.git
.gitignore
.env.local
.env.development.local
.env.test.local
.env.production.local
.vscode
.idea
*.swp
*.swo
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
coverage
.DS_Store
Thumbs.db
Dockerfile
docker-compose.yml
README.md
```

### 7.5 — `Dockerfile` (create in project root)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built assets into the subpath directory
COPY --from=builder /app/dist /usr/share/nginx/html/ocd_selfcare

# Remove default nginx config and replace with subpath config
RUN rm /etc/nginx/conf.d/default.conf
COPY vite-nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 7.6 — GitHub Actions Workflow
**`.github/workflows/docker-publish.yml`:**
```yaml
name: Build & Push ocd_selfcare:1.0

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  verify-and-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm i

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build

      - name: Verify DB credentials not hardcoded
        run: |
          grep -rn "npg_A0iG3JvxKUDN" src/ && exit 1 || true
          grep -rn "ep-steep-term-aoxd3b8h" src/ && exit 1 || true

      - name: Verify no external activity links remain
        run: |
          grep -rn "adikh276-arch" src/ && exit 1 || true

      - name: Log in to registry
        run: |
          echo "${{ secrets.PASSWORD }}" | docker login bunker.mantracare.com \
            -u "${{ secrets.USERNAME }}" --password-stdin

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          platforms: linux/amd64
          push: true
          tags: |
            bunker.mantracare.com/lovable/ocd_selfcare:1.0
            bunker.mantracare.com/lovable/ocd_selfcare:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### 7.7 — GitHub Secrets Status

```
# Already added ✅:
DATABASE_URL     ← Neon connection string
USERNAME         ← bunker.mantracare.com Docker username ✅
PASSWORD         ← bunker.mantracare.com Docker password ✅

# Nothing else needed.
# Registry URL (bunker.mantracare.com/lovable/ocd_selfcare) is hardcoded
# in the workflow since it is fixed and not sensitive.
# No AUTH_PORTAL_URL needed — handshake goes directly to api.mantracare.com
# which is hardcoded in TokenGuard.tsx (it's a public API endpoint, not a secret).
```

> **Summary — all secrets are already in the repo. Nothing else to add.**
> | Secret | Status |
> |---|---|
> | `DATABASE_URL` | ✅ Added |
> | `USERNAME` | ✅ Added (Docker — bunker.mantracare.com) |
> | `PASSWORD` | ✅ Added (Docker — bunker.mantracare.com) |

---

## ✅ FINAL DELIVERABLE CHECKLIST

### Audit
- [ ] Full folder listing of `adikh276-arch/OCD-Duplicate` completed
- [ ] Every activity folder classified as Group A (static) or Group B (dynamic)
- [ ] `LINKS_TO_REPLACE.txt` generated from existing UI
- [ ] `.git` removed from cloned repo

### Database
- [ ] Neon project `lively-sky-48663512` wiped (`DROP SCHEMA public CASCADE`)
- [ ] Each Group B activity checked for `.sql` / migration / prisma / drizzle schema **before** writing any SQL
- [ ] Schema derived from codebase for any activity that has no schema file
- [ ] One dedicated `ocd_<slug>_entries` table per Group B activity
- [ ] All tables created in a single transaction
- [ ] DB credentials are in `DATABASE_URL` secret only — not in any source file
- [ ] `pnpm db:ping` passes

### Code Integration
- [ ] Individual configs, `.env` files, DB clients, auth setups stripped from all activity folders
- [ ] All activities copied into `src/features/ocd/<slug>/`
- [ ] All imports updated — no dead env refs, no individual DB clients
- [ ] Group B activities read `userId` from `sessionStorage` (set by TokenGuard)
- [ ] Zero new CSS files
- [ ] `TRANSLATION_RENAMES.md` committed for all renamed i18n keys

### UI Wiring
- [ ] Every link in `LINKS_TO_REPLACE.txt` replaced with `<Link to="/ocd/activities/...">` 
- [ ] All activity routes added inside `<Route element={<ActivityLayout />}>` wrapper
- [ ] Corresponding routes added to the router (existing routes untouched)
- [ ] No `adikh276-arch` or `OCD-Duplicate` references remain in `src/`
- [ ] Existing UI, inner pages, and text content are visually identical to before

### Auth & Navigation
- [ ] `TokenGuard.tsx` implemented as written in Step 5.2
- [ ] `OCD_REDIRECT_PATH` stored in `sessionStorage` (not localStorage) when redirecting to `/token`
- [ ] `OCD_REDIRECT_PATH` cleared from sessionStorage immediately after post-handshake navigate
- [ ] Deep link with `?token=` → handshake → correct activity page (Scenario A) tested end-to-end
- [ ] Deep link without token, no session → `/token` → handshake → correct activity page (Scenario B) tested end-to-end
- [ ] Stale token re-validation tested (refresh a `?token=` URL while already logged in — should re-validate, not skip)
- [ ] `ActivityLayout.tsx` implemented as written in Step 5.3
- [ ] ✕ Exit button appears top-right on every `/ocd/activities/*` route
- [ ] ✕ Exit button navigates to selfcare home (`/`) on click
- [ ] ✕ Exit button does NOT appear on any existing selfcare pages (only inside ActivityLayout routes)
- [ ] No new CSS file created for the back button (inline styles only)

### Verification & Docker
- [ ] All 9 checks in Step 6 pass
- [ ] Docker image `ocd_selfcare:1.0` pushed via GitHub Actions
- [ ] Docker image `ocd_selfcare:latest` pushed via GitHub Actions
