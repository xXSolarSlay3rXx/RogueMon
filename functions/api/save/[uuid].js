import { json, optionsResponse, parseJson } from '../_lib/cloudsave.js';

export async function onRequest(context) {
  const { request, env, params } = context;
  const uuid = decodeURIComponent(String(params.uuid || ''));

  if (request.method === 'OPTIONS') return optionsResponse();
  if (!env.DB) return json({ error: 'Missing D1 binding.' }, 500);
  if (!uuid) return json({ error: 'Missing uuid.' }, 400);

  if (request.method === 'GET') {
    const row = await env.DB
      .prepare('SELECT save_json FROM saves WHERE uuid = ?')
      .bind(uuid)
      .first();

    if (!row) return json({ error: 'Not found.' }, 404);

    try {
      return json(JSON.parse(row.save_json));
    } catch {
      return json({ error: 'Corrupt save.' }, 500);
    }
  }

  if (request.method === 'POST') {
    try {
      const user = await env.DB
        .prepare('SELECT uuid FROM users WHERE uuid = ?')
        .bind(uuid)
        .first();
      if (!user) return json({ error: 'Unknown account.' }, 404);

      const body = await parseJson(request);
      const now = Date.now();
      const normalizedSave = {
        ...body,
        lastSaved: Number(body.lastSaved || now),
      };

      await env.DB
        .prepare(`
          INSERT INTO saves (uuid, save_json, last_saved, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(uuid) DO UPDATE SET
            save_json = excluded.save_json,
            last_saved = excluded.last_saved,
            updated_at = excluded.updated_at
        `)
        .bind(
          uuid,
          JSON.stringify(normalizedSave),
          normalizedSave.lastSaved,
          now
        )
        .run();

      return json({ ok: true, updatedAt: now });
    } catch (error) {
      return json({ error: error.message || 'Bad request.' }, 400);
    }
  }

  return json({ error: 'Method not allowed.' }, 405);
}
