const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = './data/events.json';

app.get('/events', (req, res) => {
  const events = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(events);
});

app.post('/events', (req, res) => {
  const events = JSON.parse(fs.readFileSync(DATA_FILE));
  const newEvent = req.body;
  events.push({ ...newEvent, id: Date.now().toString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
  res.status(201).json({ success: true });
});

app.delete('/events/:id', (req, res) => {
  let events = JSON.parse(fs.readFileSync(DATA_FILE));
  events = events.filter(event => event.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
