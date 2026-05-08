const ROGUEMON_CLOUD_STORAGE = {
  uuid: 'roguemon_save_uuid',
  username: 'roguemon_username',
  lastSync: 'roguemon_last_cloud_sync',
  serverUrl: 'roguemon_cloud_server',
};

const SYNC_KEYS = [
  'poke_trainer', 'poke_tutorial_seen', 'poke_settings',
  'poke_achievements', 'poke_dex', 'poke_shiny_dex',
  'poke_elite_wins', 'poke_hall_of_fame', 'poke_last_run_won',
  'poke_stat_buffs', 'poke_used_starters',
];

function _normalizeServerUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function _getConfiguredServerUrl() {
  const runtime = window.ROGUEMON_CLOUD_CONFIG?.serverUrl;
  const stored = localStorage.getItem(ROGUEMON_CLOUD_STORAGE.serverUrl);
  const isLocalHost = /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/i.test(window.location.hostname);
  const autoServer = window.ROGUEMON_CLOUD_CONFIG?.sameOriginApi
    && !isLocalHost
    && /^https?:$/i.test(window.location.protocol)
    ? `${window.location.origin}/api`
    : '';
  return _normalizeServerUrl(runtime || stored || autoServer || '');
}

function _setConfiguredServerUrl(url) {
  const normalized = _normalizeServerUrl(url);
  if (normalized) localStorage.setItem(ROGUEMON_CLOUD_STORAGE.serverUrl, normalized);
  else localStorage.removeItem(ROGUEMON_CLOUD_STORAGE.serverUrl);
}

function _getSaveUuid() {
  return localStorage.getItem(ROGUEMON_CLOUD_STORAGE.uuid);
}

function _getUsername() {
  return localStorage.getItem(ROGUEMON_CLOUD_STORAGE.username);
}

function _setAccount(username, uuid) {
  localStorage.setItem(ROGUEMON_CLOUD_STORAGE.username, username);
  localStorage.setItem(ROGUEMON_CLOUD_STORAGE.uuid, uuid);
}

function _clearAccount() {
  localStorage.removeItem(ROGUEMON_CLOUD_STORAGE.username);
  localStorage.removeItem(ROGUEMON_CLOUD_STORAGE.uuid);
  localStorage.removeItem(ROGUEMON_CLOUD_STORAGE.lastSync);
}

function _hasCloudServer() {
  return !!_getConfiguredServerUrl();
}

function _getLocalSave() {
  const save = { lastSaved: Date.now() };
  for (const key of SYNC_KEYS) {
    const val = localStorage.getItem(key);
    if (val !== null) save[key] = val;
  }
  return save;
}

function _applyCloudSave(save) {
  for (const key of SYNC_KEYS) {
    if (save[key] === undefined) continue;

    if (key === 'poke_hall_of_fame') {
      const parse = s => { try { return JSON.parse(s || '[]'); } catch { return []; } };
      const local = parse(localStorage.getItem(key));
      const cloud = parse(save[key]);
      const merged = [...local];
      const localSavedAts = new Set(local.map(e => e.savedAt).filter(Boolean).map(String));
      for (const e of cloud) {
        if (e.savedAt) {
          if (!localSavedAts.has(String(e.savedAt))) merged.push(e);
        } else {
          const dup = local.some(l => !l.savedAt && l.runNumber === e.runNumber && l.date === e.date && !!l.endless === !!e.endless);
          if (!dup) merged.push(e);
        }
      }
      localStorage.setItem(key, JSON.stringify(merged));
      continue;
    }

    if (key === 'poke_achievements') {
      const parse = s => { try { return JSON.parse(s || '[]'); } catch { return []; } };
      const merged = [...new Set([...parse(localStorage.getItem(key)), ...parse(save[key])])];
      localStorage.setItem(key, JSON.stringify(merged));
      continue;
    }

    if (key === 'poke_elite_wins') {
      const localVal = parseInt(localStorage.getItem(key) || '0', 10);
      const cloudVal = parseInt(save[key] || '0', 10);
      localStorage.setItem(key, String(Math.max(localVal, cloudVal)));
      continue;
    }

    if (key === 'poke_dex') {
      const parse = s => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
      const local = parse(localStorage.getItem(key));
      const cloud = parse(save[key]);
      const merged = { ...cloud, ...local };
      for (const [id, ce] of Object.entries(cloud)) {
        if (ce.caught && merged[id] && !merged[id].caught) merged[id].caught = true;
      }
      localStorage.setItem(key, JSON.stringify(merged));
      continue;
    }

    if (key === 'poke_shiny_dex') {
      const parse = s => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
      const local = parse(localStorage.getItem(key));
      const cloud = parse(save[key]);
      localStorage.setItem(key, JSON.stringify({ ...cloud, ...local }));
      continue;
    }

    if (key === 'poke_stat_buffs') {
      const parse = s => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
      const local = parse(localStorage.getItem(key));
      const cloud = parse(save[key]);
      const merged = { ...local };
      for (const [specId, cBufs] of Object.entries(cloud)) {
        if (!merged[specId]) {
          merged[specId] = cBufs;
          continue;
        }
        for (const stat of ['hp', 'atk', 'def', 'special', 'spdef', 'speed']) {
          merged[specId][stat] = Math.max(merged[specId][stat] ?? 0, cBufs[stat] ?? 0);
        }
      }
      localStorage.setItem(key, JSON.stringify(merged));
      continue;
    }

    if (key === 'poke_tutorial_seen') {
      if (localStorage.getItem(key) !== 'true') localStorage.setItem(key, save[key]);
      continue;
    }

    if (key === 'poke_settings') {
      if (!localStorage.getItem(key)) localStorage.setItem(key, save[key]);
      continue;
    }

    if (key === 'poke_last_run_won') {
      if (!localStorage.getItem(key)) localStorage.setItem(key, save[key]);
      continue;
    }

    localStorage.setItem(key, save[key]);
  }

  localStorage.setItem(ROGUEMON_CLOUD_STORAGE.lastSync, String(save.lastSaved || Date.now()));
  if (typeof applyDarkMode === 'function') applyDarkMode();
}

async function syncToCloud() {
  const serverUrl = _getConfiguredServerUrl();
  const uuid = _getSaveUuid();
  if (!serverUrl || !uuid) return false;

  try {
    const save = _getLocalSave();
    const res = await fetch(`${serverUrl}/save/${uuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(save),
    });
    if (!res.ok) return false;
    localStorage.setItem(ROGUEMON_CLOUD_STORAGE.lastSync, String(save.lastSaved));
    return true;
  } catch (e) {
    console.warn('RogueMon cloud sync failed:', e);
    return false;
  }
}

async function _loadFromServer() {
  const serverUrl = _getConfiguredServerUrl();
  const uuid = _getSaveUuid();
  if (!serverUrl || !uuid) return false;

  try {
    const res = await fetch(`${serverUrl}/save/${uuid}`);
    if (res.status === 404) {
      await syncToCloud();
      return true;
    }
    if (!res.ok) return false;

    const cloudSave = await res.json();
    const hasLocal = SYNC_KEYS.some(k => localStorage.getItem(k) !== null);
    const firstTime = !localStorage.getItem(ROGUEMON_CLOUD_STORAGE.lastSync);
    if (hasLocal && firstTime) {
      if (confirm('A RogueMon cloud save was found. Load it? Local progress will be replaced.')) {
        _applyCloudSave(cloudSave);
      } else {
        await syncToCloud();
      }
    } else {
      _applyCloudSave(cloudSave);
    }
    return true;
  } catch (e) {
    console.warn('RogueMon cloud load failed:', e);
    return false;
  }
}

function getRogueMonCloudStatus() {
  return {
    enabled: _hasCloudServer(),
    signedIn: !!_getSaveUuid(),
    username: _getUsername(),
    serverUrl: _getConfiguredServerUrl(),
    lastSync: localStorage.getItem(ROGUEMON_CLOUD_STORAGE.lastSync),
  };
}

function _closeRogueMonCloudModal() {
  document.getElementById('roguemon-cloud-modal')?.remove();
}

function _renderRogueMonCloudModal() {
  const modal = document.getElementById('roguemon-cloud-modal');
  if (!modal) return;
  const status = getRogueMonCloudStatus();
  const lastSyncText = status.lastSync
    ? new Date(Number(status.lastSync)).toLocaleString()
    : 'Not synced yet';

  modal.innerHTML = `
    <div class="settings-modal-box roguemon-cloud-box">
      <div class="settings-modal-header">
        <span>RogueMon Cloud</span>
        <button class="ach-modal-close" onclick="_closeRogueMonCloudModal()">x</button>
      </div>
      <div class="settings-section-title">Server</div>
      <div class="settings-cloud-body">
        <div class="settings-cloud-copy">
          Connect RogueMon to your own save server. Leave it empty to keep cloud sync disabled.
        </div>
        <input id="roguemon-cloud-server-input" class="settings-cloud-input" type="text" placeholder="/api or http://localhost:8787" value="${status.serverUrl}">
        <div class="settings-cloud-actions">
          <button id="roguemon-cloud-save-server" class="btn-secondary">Save Server</button>
          <button id="roguemon-cloud-clear-server" class="btn-secondary">Disable Cloud</button>
        </div>
      </div>
      <div class="settings-section-title">Account</div>
      <div class="settings-cloud-body">
        <div class="settings-cloud-status">
          <div><strong>Status:</strong> ${status.enabled ? (status.signedIn ? `Signed in as ${status.username}` : 'Server ready, not signed in') : 'Cloud disabled'}</div>
          <div><strong>Last Sync:</strong> ${lastSyncText}</div>
        </div>
        ${status.enabled ? `
          <input id="roguemon-cloud-username" class="settings-cloud-input" type="text" placeholder="Username" value="${status.username || ''}">
          <input id="roguemon-cloud-password" class="settings-cloud-input" type="password" placeholder="${status.signedIn ? 'New password only if you sign in again' : 'Password'}">
          <div id="roguemon-cloud-error" class="settings-cloud-error" hidden></div>
          <div class="settings-cloud-actions">
            ${status.signedIn
              ? `
                <button id="roguemon-cloud-sync-now" class="btn-secondary">Sync Now</button>
                <button id="roguemon-cloud-load-now" class="btn-secondary">Load Cloud Save</button>
                <button id="roguemon-cloud-signout" class="btn-secondary">Sign Out</button>
              `
              : `
                <button id="roguemon-cloud-login" class="btn-secondary">Log In</button>
                <button id="roguemon-cloud-register" class="btn-secondary">Register</button>
              `}
          </div>
        ` : `
          <div class="settings-cloud-copy">
            Start the included RogueMon save server and enter its URL here when you are ready.
          </div>
        `}
      </div>
    </div>
  `;

  const showError = message => {
    const error = document.getElementById('roguemon-cloud-error');
    if (!error) return;
    error.hidden = !message;
    error.textContent = message || '';
  };

  document.getElementById('roguemon-cloud-save-server')?.addEventListener('click', () => {
    const value = document.getElementById('roguemon-cloud-server-input')?.value || '';
    _setConfiguredServerUrl(value);
    if (!_getConfiguredServerUrl()) _clearAccount();
    _renderRogueMonCloudModal();
  });

  document.getElementById('roguemon-cloud-clear-server')?.addEventListener('click', () => {
    _setConfiguredServerUrl('');
    _clearAccount();
    _renderRogueMonCloudModal();
  });

  async function doAuth(endpoint) {
    showError('');
    const serverUrl = _getConfiguredServerUrl();
    const username = document.getElementById('roguemon-cloud-username')?.value.trim();
    const password = document.getElementById('roguemon-cloud-password')?.value || '';
    if (!serverUrl) {
      showError('Please configure your RogueMon save server first.');
      return;
    }
    if (!username || !password) {
      showError('Please enter username and password.');
      return;
    }
    try {
      const res = await fetch(`${serverUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        showError(data.error || 'Request failed.');
        return;
      }
      _setAccount(data.username, data.uuid);
      await _loadFromServer();
      _renderRogueMonCloudModal();
    } catch (e) {
      showError('Could not reach the RogueMon save server.');
    }
  }

  document.getElementById('roguemon-cloud-login')?.addEventListener('click', () => doAuth('/login'));
  document.getElementById('roguemon-cloud-register')?.addEventListener('click', () => doAuth('/register'));
  document.getElementById('roguemon-cloud-sync-now')?.addEventListener('click', async () => {
    showError((await syncToCloud()) ? 'Synced successfully.' : 'Sync failed.');
    _renderRogueMonCloudModal();
  });
  document.getElementById('roguemon-cloud-load-now')?.addEventListener('click', async () => {
    showError((await _loadFromServer()) ? 'Cloud save loaded.' : 'Load failed.');
    _renderRogueMonCloudModal();
  });
  document.getElementById('roguemon-cloud-signout')?.addEventListener('click', () => {
    _clearAccount();
    _renderRogueMonCloudModal();
  });
}

function openRogueMonCloudModal() {
  _closeRogueMonCloudModal();
  const modal = document.createElement('div');
  modal.id = 'roguemon-cloud-modal';
  modal.className = 'settings-modal-overlay';
  modal.addEventListener('click', event => {
    if (event.target === modal) _closeRogueMonCloudModal();
  });
  document.body.appendChild(modal);
  _renderRogueMonCloudModal();
}

function initCloudSave() {
  const oldUuid = localStorage.getItem('poke_save_uuid');
  const oldUsername = localStorage.getItem('poke_username');
  const oldLastSync = localStorage.getItem('poke_last_cloud_sync');
  if (oldUuid && !localStorage.getItem(ROGUEMON_CLOUD_STORAGE.uuid)) {
    localStorage.setItem(ROGUEMON_CLOUD_STORAGE.uuid, oldUuid);
  }
  if (oldUsername && !localStorage.getItem(ROGUEMON_CLOUD_STORAGE.username)) {
    localStorage.setItem(ROGUEMON_CLOUD_STORAGE.username, oldUsername);
  }
  if (oldLastSync && !localStorage.getItem(ROGUEMON_CLOUD_STORAGE.lastSync)) {
    localStorage.setItem(ROGUEMON_CLOUD_STORAGE.lastSync, oldLastSync);
  }
  localStorage.removeItem('poke_save_uuid');
  localStorage.removeItem('poke_username');
  localStorage.removeItem('poke_last_cloud_sync');

  if (_hasCloudServer() && _getSaveUuid()) {
    _loadFromServer();
  }
}

window.openRogueMonCloudModal = openRogueMonCloudModal;
window.getRogueMonCloudStatus = getRogueMonCloudStatus;
window.syncToCloud = syncToCloud;
window.initCloudSave = initCloudSave;
