const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');
const googleAPI = require('../services/googleAPI');
const fileStore = require('../services/fileStore');

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ status: 'error', message: 'text is required' });

    const parsed = await openaiService.parseMeetingRequest(text);

    const meeting = {
      id: makeId(),
      text,
      title: parsed.title || text,
      time: parsed.time || null,
      attendees: parsed.attendees || [],
      approvalRequired: parsed.approvalRequired === undefined ? false : !!parsed.approvalRequired,
      requesterEmail: parsed.requesterEmail || null,
      status: parsed.approvalRequired ? 'pending' : 'scheduled',
      createdAt: new Date().toISOString()
    };

    if (meeting.approvalRequired) {
      await fileStore.saveMeeting(meeting);
      const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
      const approveUrl = `${base}/approve/${meeting.id}`;
      const denyUrl = `${base}/deny/${meeting.id}`;
      await googleAPI.sendApprovalEmail(meeting, approveUrl, denyUrl);
      return res.json({ status: 'success', message: 'Approval requested; email sent.' });
    }

    // No approval required: create event immediately
    const event = await googleAPI.createEvent(meeting);
    meeting.calendarEvent = { id: event.id, link: event.htmlLink };
    await fileStore.saveMeeting(meeting);
    // send confirmation emails
    await googleAPI.sendConfirmationEmail(meeting, event);

    return res.json({ status: 'success', message: 'Meeting created successfully', event });
  } catch (err) {
    console.error('Webhook error', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
