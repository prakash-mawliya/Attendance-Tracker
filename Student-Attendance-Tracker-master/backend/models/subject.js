const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: String,
  attendedClasses: { type: Number, default: 0 },
  totalClasses: { type: Number, default: 0 },
  missedClasses: { type: Number, default: 0 },
  totalMissedClasses: { type: Number, default: 0 },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;


