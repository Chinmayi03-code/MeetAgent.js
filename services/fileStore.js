const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const meetingsFile = path.join(dataDir, 'meetings.json');
const approvalsFile = path.join(dataDir, 'approvals.json');

async function ensureFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(meetingsFile); } catch { await fs.writeFile(meetingsFile, '[]'); }
  try { await fs.access(approvalsFile); } catch { await fs.writeFile(approvalsFile, '[]'); }
}

async function readJSON(file) {
  await ensureFiles();
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeJSON(file, data) {
  await ensureFiles();
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

async function saveMeeting(meeting) {
  const meetings = await readJSON(meetingsFile);
  meetings.push(meeting);
  await writeJSON(meetingsFile, meetings);
}

async function updateMeeting(id, updates) {
  const meetings = await readJSON(meetingsFile);
  const idx = meetings.findIndex(m => m.id === id);
  if (idx === -1) return null;
  meetings[idx] = { ...meetings[idx], ...updates };
  await writeJSON(meetingsFile, meetings);
  return meetings[idx];
}

async function getMeeting(id) {
  const meetings = await readJSON(meetingsFile);
  return meetings.find(m => m.id === id) || null;
}

async function saveApproval(record) {
  const approvals = await readJSON(approvalsFile);
  approvals.push(record);
  await writeJSON(approvalsFile, approvals);
}

module.exports = { saveMeeting, updateMeeting, getMeeting, saveApproval };
