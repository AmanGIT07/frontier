ALTER TABLE sessions ADD COLUMN IF NOT EXISTS deleted_at timestamptz;