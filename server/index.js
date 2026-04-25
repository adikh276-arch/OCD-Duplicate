import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/ocd_selfcare/api/health', (req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_A0iG3JvxKUDN@ep-steep-term-aoxd3b8h-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

// Standardized MantraCare Persistence API
app.post('/ocd_selfcare/api/persistence', async (req, res) => {
  const { userId, activity, action, payload } = req.body;

  if (!userId || !activity || !action) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let result;

    switch (activity) {
      case 'mood-tracker':
        if (action === 'log_mood') {
          await pool.query(
            'INSERT INTO ocd_mood_entries (user_id, mood_value, mood_label, day_name, note) VALUES ($1, $2, $3, $4, $5)',
            [userId, payload.value, payload.label, payload.dayName, payload.note]
          );
          result = { success: true };
        } else if (action === 'get_history') {
          const { rows } = await pool.query(
            'SELECT * FROM ocd_mood_entries WHERE user_id = $1 ORDER BY logged_at DESC LIMIT 50',
            [userId]
          );
          result = rows;
        }
        break;

      case 'ocd-moments':
        if (action === 'save_entry') {
          await pool.query(
            'INSERT INTO ocd_moments_entries (user_id, location, custom_location, urge, response) VALUES ($1, $2, $3, $4, $5)',
            [userId, payload.location, payload.customLocation, payload.urge, payload.response]
          );
          result = { success: true };
        } else if (action === 'get_grouped_entries') {
          const { rows } = await pool.query(
            "SELECT *, DATE(timestamp) as date FROM ocd_moments_entries WHERE user_id = $1 ORDER BY timestamp DESC",
            [userId]
          );
          // Group by date
          const grouped = rows.reduce((acc, row) => {
            const date = row.date.toISOString().split('T')[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(row);
            return acc;
          }, {});
          result = grouped;
        } else if (action === 'get_recent') {
          const { rows } = await pool.query(
            'SELECT * FROM ocd_moments_entries WHERE user_id = $1 AND location = $2 ORDER BY timestamp DESC LIMIT $3',
            [userId, payload.location, payload.limit || 4]
          );
          result = rows;
        } else if (action === 'get_week_entries') {
            const weeksAgo = payload.weeksAgo || 0;
            const { rows } = await pool.query(
                `SELECT * FROM ocd_moments_entries 
                 WHERE user_id = $1 
                 AND timestamp >= now() - interval '${weeksAgo + 1} week' 
                 AND timestamp < now() - interval '${weeksAgo} week'
                 ORDER BY timestamp DESC`,
                [userId]
            );
            result = rows;
        }
        break;

      // Add other activities here as needed...

      default:
        return res.status(400).json({ error: `Unsupported activity: ${activity}` });
    }

    res.json({ data: result });
  } catch (err) {
    console.error('Persistence Error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../dist');
  app.use('/ocd_selfcare', express.static(staticPath));
  
  // Catch-all route for SPA
  app.get(['/ocd_selfcare', '/ocd_selfcare/*'], (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
