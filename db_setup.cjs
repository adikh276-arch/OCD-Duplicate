const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_A0iG3JvxKUDN@ep-steep-term-aoxd3b8h-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

const SQL = `
BEGIN;

-- ── STEP 1: WIPE SCHEMA ─────────────────────────────────────────────
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO neondb_owner;
GRANT ALL ON SCHEMA public TO public;
COMMENT ON SCHEMA public IS 'standard public schema';

-- ── STEP 2: USERS TABLE (shared) ────────────────────────────────────
-- Primary key is BIGINT to match MantraCare API user_id (numeric)
CREATE TABLE IF NOT EXISTS users (
  id         BIGINT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── STEP 3: THOUGHT DIFFUSION (Group B) ─────────────────────────────
-- From: thought_diffusion/src/integrations/supabase/types.ts
CREATE TABLE ocd_thought_diffusion_sessions (
  session_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT,
  activity      TEXT NOT NULL DEFAULT 'thought_diffusion',
  completed     BOOLEAN NOT NULL DEFAULT false,
  completed_at  TIMESTAMPTZ,
  screens_viewed INTEGER NOT NULL DEFAULT 0,
  started_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ocd_thought_diffusion_responses (
  response_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID NOT NULL REFERENCES ocd_thought_diffusion_sessions(session_id) ON DELETE CASCADE,
  part           TEXT NOT NULL,
  original_thought TEXT,
  defused_thought  TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ocd_thought_diffusion_reflections (
  reflection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID NOT NULL REFERENCES ocd_thought_diffusion_sessions(session_id) ON DELETE CASCADE,
  feeling_after TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── STEP 4: FEAR LADDER (Group B) ───────────────────────────────────
-- From: fear_ladder_newest/src/integrations/supabase/types.ts
CREATE TABLE ocd_fear_ladder_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             TEXT,
  expected_fear       TEXT,
  practice_goal       TEXT,
  reward_plan         TEXT,
  start_date          TEXT,
  current_step_index  INTEGER,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ocd_fear_ladder_steps (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       UUID REFERENCES ocd_fear_ladder_sessions(id) ON DELETE CASCADE,
  user_id          TEXT NOT NULL,
  step_description TEXT NOT NULL,
  anxiety_rating   INTEGER NOT NULL,
  step_order       INTEGER NOT NULL,
  created_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ocd_fear_ladder_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         TEXT NOT NULL,
  session_id      UUID REFERENCES ocd_fear_ladder_sessions(id) ON DELETE SET NULL,
  step_id         UUID REFERENCES ocd_fear_ladder_steps(id) ON DELETE SET NULL,
  day_number      INTEGER NOT NULL,
  anxiety_before  INTEGER,
  anxiety_after   INTEGER,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ── STEP 5: MOOD TRACKER (Group B) ──────────────────────────────────
-- From: mood_tracker/supabase_schema.sql
CREATE TABLE ocd_mood_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood_value  INTEGER NOT NULL,
  mood_label  TEXT NOT NULL,
  day_name    TEXT NOT NULL,
  note        TEXT,
  logged_at   TIMESTAMPTZ DEFAULT now()
);

-- ── STEP 6: OCD MOMENTS TRACKER (Group B) ───────────────────────────
-- From: ocd_moments_tracker_new/schema.sql (adapted — user_id is TEXT/BIGINT)
CREATE TABLE ocd_moments_entries (
  id               SERIAL PRIMARY KEY,
  user_id          BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  timestamp        TIMESTAMPTZ DEFAULT now(),
  location         VARCHAR(50) NOT NULL,
  custom_location  VARCHAR(100),
  urge             TEXT NOT NULL,
  response         VARCHAR(50) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ocd_moments_user_id ON ocd_moments_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_ocd_moments_timestamp ON ocd_moments_entries(timestamp DESC);

-- ── STEP 7: REASSURANCE RESISTANCE (Group B) ────────────────────────
-- From: reassurance_resistance/supabase/migrations sql
CREATE TABLE ocd_reassurance_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at        TIMESTAMPTZ,
  worry_text          TEXT,
  reassurance_urge_type TEXT,
  body_areas          TEXT[],
  timer_duration      INTEGER,
  mood_emoji          TEXT,
  reflection_note     TEXT,
  next_time_goal      TEXT,
  naming_response     TEXT,
  is_completed        BOOLEAN NOT NULL DEFAULT false
);

-- ── STEP 8: URGE SURFING (Group B) ──────────────────────────────────
-- From: urge_surfing/supabase/migrations sql
CREATE TABLE ocd_urge_surf_sessions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  body_location         TEXT,
  sensation_description TEXT,
  reflection_note       TEXT,
  completed             BOOLEAN NOT NULL DEFAULT false
);

COMMIT;
`;

async function run() {
  const client = await pool.connect();
  try {
    console.log('🗄️  Running DB migration...');
    await client.query(SQL);
    console.log('✅ DB migration complete!');
    
    // Verify tables
    const result = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' ORDER BY table_name
    `);
    console.log('\n📋 Tables created:');
    result.rows.forEach(r => console.log(' -', r.table_name));
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
