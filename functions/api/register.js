import { createPasswordRecord, createUuid, json, optionsResponse, parseJson, sanitizeUsername } from './_lib/cloudsave.js';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') return optionsResponse();
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  if (!env.DB) return json({ error: 'Missing D1 binding.' }, 500);

  try {
    const body = await parseJson(request);
    const username = sanitizeUsername(body.username);
    const password = String(body.password || '');

    if (username.length < 3) {
      return json({ error: 'Username must be at least 3 characters.' }, 400);
    }
    if (password.length < 6) {
      return json({ error: 'Password must be at least 6 characters.' }, 400);
    }

    const usernameLower = username.toLowerCase();
    const existing = await env.DB
      .prepare('SELECT uuid FROM users WHERE username_lower = ?')
      .bind(usernameLower)
      .first();
    if (existing) {
      return json({ error: 'Username already exists.' }, 409);
    }

    const { salt, hash } = await createPasswordRecord(password);
    const uuid = createUuid();
    const now = Date.now();

    await env.DB
      .prepare(`
        INSERT INTO users (uuid, username, username_lower, password_salt, password_hash, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(uuid, username, usernameLower, salt, hash, now)
      .run();

    return json({ username, uuid });
  } catch (error) {
    return json({ error: error.message || 'Bad request.' }, 400);
  }
}
