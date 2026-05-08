const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 8787);
const DATA_DIR = process.env.ROGUEMON_SAVE_DATA_DIR || path.join(__dirname, 'data');
const USERS_PATH = path.join(DATA_DIR, 'users.json');
const SAVES_PATH = path.join(DATA_DIR, 'saves.json');
const ALLOW_ORIGIN = process.env.ROGUEMON_SAVE_ORIGIN || '*';

function ensureFile(filePath, initialValue) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialValue, null, 2));
  }
}

function readJson(filePath, fallback) {
  ensureFile(filePath, fallback);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  ensureFile(filePath, value);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not found' });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function createPasswordRecord(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return {
    salt,
    hash: hashPassword(password, salt),
  };
}

function verifyPassword(password, record) {
  return hashPassword(password, record.salt) === record.hash;
}

function sanitizeUsername(username) {
  return String(username || '').trim();
}

function createUuid() {
  return crypto.randomUUID();
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': ALLOW_ORIGIN,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const users = readJson(USERS_PATH, []);
  const saves = readJson(SAVES_PATH, {});

  if (req.method === 'POST' && url.pathname === '/register') {
    try {
      const body = await readBody(req);
      const username = sanitizeUsername(body.username);
      const password = String(body.password || '');
      if (username.length < 3) {
        sendJson(res, 400, { error: 'Username must be at least 3 characters.' });
        return;
      }
      if (password.length < 6) {
        sendJson(res, 400, { error: 'Password must be at least 6 characters.' });
        return;
      }
      if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        sendJson(res, 409, { error: 'Username already exists.' });
        return;
      }

      const passwordRecord = createPasswordRecord(password);
      const uuid = createUuid();
      users.push({
        username,
        uuid,
        salt: passwordRecord.salt,
        passwordHash: passwordRecord.hash,
        createdAt: Date.now(),
      });
      writeJson(USERS_PATH, users);
      sendJson(res, 200, { username, uuid });
      return;
    } catch (error) {
      sendJson(res, 400, { error: error.message || 'Bad request' });
      return;
    }
  }

  if (req.method === 'POST' && url.pathname === '/login') {
    try {
      const body = await readBody(req);
      const username = sanitizeUsername(body.username);
      const password = String(body.password || '');
      const user = users.find(entry => entry.username.toLowerCase() === username.toLowerCase());
      if (!user || !verifyPassword(password, { salt: user.salt, hash: user.passwordHash })) {
        sendJson(res, 401, { error: 'Invalid username or password.' });
        return;
      }
      sendJson(res, 200, { username: user.username, uuid: user.uuid });
      return;
    } catch (error) {
      sendJson(res, 400, { error: error.message || 'Bad request' });
      return;
    }
  }

  if (req.method === 'GET' && url.pathname.startsWith('/save/')) {
    const uuid = decodeURIComponent(url.pathname.slice('/save/'.length));
    if (!uuid || !saves[uuid]) {
      notFound(res);
      return;
    }
    sendJson(res, 200, saves[uuid]);
    return;
  }

  if (req.method === 'POST' && url.pathname.startsWith('/save/')) {
    try {
      const uuid = decodeURIComponent(url.pathname.slice('/save/'.length));
      const user = users.find(entry => entry.uuid === uuid);
      if (!user) {
        sendJson(res, 404, { error: 'Unknown account.' });
        return;
      }
      const body = await readBody(req);
      saves[uuid] = {
        ...body,
        lastSaved: Number(body.lastSaved || Date.now()),
        updatedAt: Date.now(),
      };
      writeJson(SAVES_PATH, saves);
      sendJson(res, 200, { ok: true, updatedAt: saves[uuid].updatedAt });
      return;
    } catch (error) {
      sendJson(res, 400, { error: error.message || 'Bad request' });
      return;
    }
  }

  notFound(res);
});

server.listen(PORT, () => {
  console.log(`RogueMon cloud save server running on http://localhost:${PORT}`);
  console.log(`Data directory: ${DATA_DIR}`);
});
