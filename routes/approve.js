const express = require('express');
const router = express.Router();
const fileStore = require('../services/fileStore');
const googleAPI = require('../services/googleAPI');

router.get('/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await fileStore.getMeeting(id);
    if (!meeting) return res.status(404).send('Meeting not found');
    if (meeting.status === 'scheduled') return res.send('Meeting already scheduled');

    // mark approved
    const updated = await fileStore.updateMeeting(id, { status: 'approved', approvedAt: new Date().toISOString() });
    await fileStore.saveApproval({ id, action: 'approved', at: new Date().toISOString() });

    // create calendar event
    const event = await googleAPI.createEvent(updated);
    await fileStore.updateMeeting(id, { status: 'scheduled', calendarEvent: { id: event.id, link: event.htmlLink } });

    // send confirmation emails
    await googleAPI.sendConfirmationEmail(updated, event);

    return res.send('Meeting approved and scheduled. Confirmation emails sent.');
  } catch (err) {
    console.error('Approval error', err);
    return res.status(500).send('Error processing approval');
  }
});

router.get('/deny/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await fileStore.getMeeting(id);
    if (!meeting) return res.status(404).send('Meeting not found');

    await fileStore.updateMeeting(id, { status: 'denied', deniedAt: new Date().toISOString() });
    await fileStore.saveApproval({ id, action: 'denied', at: new Date().toISOString() });

    // send denied email
    await googleAPI.sendDeniedEmail(meeting);

    return res.send('Meeting denied and requester notified.');
  } catch (err) {
    console.error('Deny error', err);
    return res.status(500).send('Error processing denial');
  }
});

module.exports = router;
