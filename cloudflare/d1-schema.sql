CREATE TABLE IF NOT EXISTS users (
  uuid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  username_lower TEXT NOT NULL UNIQUE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS saves (
  uuid TEXT PRIMARY KEY,
  save_json TEXT NOT NULL,
  last_saved INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (uuid) REFERENCES users(uuid) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_username_lower ON users(username_lower);
CREATE INDEX IF NOT EXISTS idx_saves_last_saved ON saves(last_saved);
