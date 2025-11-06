const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

function makePlainMessage(to, subject, body) {
  const messageParts = [];
  messageParts.push(`From: ${process.env.GMAIL_FROM || 'me'}`);
  messageParts.push(`To: ${to}`);
  messageParts.push('Content-Type: text/plain; charset="UTF-8"');
  messageParts.push('MIME-Version: 1.0');
  messageParts.push(`Subject: ${subject}`);
  messageParts.push('');
  messageParts.push(body);
  const message = messageParts.join('\n');
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function createEvent(meeting) {
  // meeting should include: title, time (either ISO or human-readable), attendees array
  // If time is a human description, leave as is and hope Google can accept start/end, otherwise user should provide ISO.
  // We'll assume parsed.time is ISO; if not, set start in 1 hour for 1 hour duration as fallback.
  let start = { dateTime: new Date().toISOString() };
  let end = { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString() };
  if (meeting.time && !isNaN(Date.parse(meeting.time))) {
    start = { dateTime: new Date(meeting.time).toISOString() };
    end = { dateTime: new Date(Date.parse(meeting.time) + 60 * 60 * 1000).toISOString() };
  }

  const event = {
    summary: meeting.title || 'Meeting',
    description: meeting.text || '',
    start,
    end,
    attendees: (meeting.attendees || []).map(email => ({ email }))
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    sendUpdates: 'all'
  });

  return res.data; // contains id and htmlLink
}

async function sendApprovalEmail(meeting, approveUrl, denyUrl) {
  const to = meeting.requesterEmail || (meeting.attendees && meeting.attendees[0]) || '';
  const subject = `Approval requested: ${meeting.title}`;
  const body = `A meeting request needs approval\n\nTitle: ${meeting.title}\nTime: ${meeting.time}\n\nApprove: ${approveUrl}\nDeny: ${denyUrl}\n`;
  const raw = makePlainMessage(to, subject, body);
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
}

async function sendConfirmationEmail(meeting, event) {
  const tos = meeting.attendees || [];
  const subject = `Meeting confirmed: ${meeting.title}`;
  const body = `Your meeting has been scheduled.\n\nTitle: ${meeting.title}\nWhen: ${meeting.time}\nLink: ${event?.htmlLink || 'n/a'}\n`;
  for (const to of tos) {
    const raw = makePlainMessage(to, subject, body);
    await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
  }
}

async function sendDeniedEmail(meeting) {
  const to = meeting.requesterEmail || '';
  const subject = `Meeting denied: ${meeting.title}`;
  const body = `Your meeting request has been denied.\n\nTitle: ${meeting.title}\nRequested time: ${meeting.time}\n`;
  const raw = makePlainMessage(to, subject, body);
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
}

module.exports = { createEvent, sendApprovalEmail, sendConfirmationEmail, sendDeniedEmail };
