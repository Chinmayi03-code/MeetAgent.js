require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('../routes/webhook');
const approveRoutes = require('../routes/approve');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/webhook', webhookRoutes);
app.use('/', approveRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'SmartOffice Core running' });
});

app.listen(PORT, () => {
  console.log(`SmartOffice Core listening on port ${PORT}`);
});

module.exports = app;
