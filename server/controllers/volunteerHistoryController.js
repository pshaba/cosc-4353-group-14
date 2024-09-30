// In-memory storage for volunteer history
let volunteerHistory = [];

// Create a volunteer history record
exports.createVolunteerHistory = (req, res) => {
  const history = { id: volunteerHistory.length + 1, ...req.body };
  volunteerHistory.push(history);
  res.status(201).json(history);
};

// Get all volunteer history records
exports.getVolunteerHistory = (req, res) => {
  res.status(200).json(volunteerHistory);
};
