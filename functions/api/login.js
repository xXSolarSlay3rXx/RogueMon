import { json, optionsResponse, parseJson, sanitizeUsername, verifyPassword } from './_lib/cloudsave.js';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') return optionsResponse();
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  if (!env.DB) return json({ error: 'Missing D1 binding.' }, 500);

  try {
    const body = await parseJson(request);
    const username = sanitizeUsername(body.username);
    const password = String(body.password || '');

    const user = await env.DB
      .prepare(`
        SELECT uuid, username, password_salt, password_hash
        FROM users
        WHERE username_lower = ?
      `)
      .bind(username.toLowerCase())
      .first();

    if (!user) {
      return json({ error: 'Invalid username or password.' }, 401);
    }

    const ok = await verifyPassword(password, {
      salt: user.password_salt,
      hash: user.password_hash,
    });
    if (!ok) {
      return json({ error: 'Invalid username or password.' }, 401);
    }

    return json({ username: user.username, uuid: user.uuid });
  } catch (error) {
    return json({ error: error.message || 'Bad request.' }, 400);
  }
}
