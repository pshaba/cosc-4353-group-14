// In-memory storage for events
let events = [];

// Create a new event
exports.createEvent = (req, res) => {
  const event = { id: events.length + 1, ...req.body };
  events.push(event);
  res.status(201).json(event);
};

// Get all events
exports.getEvents = (req, res) => {
  res.status(200).json(events);
};

// Update an event
exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const index = events.findIndex(event => event.id == id);

  if (index === -1) return res.status(404).json({ message: 'Event not found' });

  events[index] = { ...events[index], ...req.body };
  res.status(200).json(events[index]);
};

// Delete an event
exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  const index = events.findIndex(event => event.id == id);

  if (index === -1) return res.status(404).json({ message: 'Event not found' });

  events.splice(index, 1);
  res.status(200).json({ message: 'Event deleted' });
};
