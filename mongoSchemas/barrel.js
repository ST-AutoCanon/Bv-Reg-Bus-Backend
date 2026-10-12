

const mongoose = require('mongoose');

const barrelSchema = new mongoose.Schema({
  barrel1: { type: String, required: true },
  barrel1A: { type: String, required: true },
  barrel2: { type: String, required: true },
  barrel3: { type: String, required: true },
  barrel4: { type: String, required: true },
  serialNumber: { type: String, required: true },
  finalOutput: { type: String, required: true, unique: true },
  submittedBy: { type: String, required: true },
  submittedAt: { type: Date, required: true },
  description: { type: String },
  partNumbers: [{ type: String }],
  descriptions: [{ type: String }], 
  angleA: [{ type: Number }],
  angleB: [{ type: Number }],
  length: [{ type: Number }],
  distA: [{ type: Number }],
  distB: [{ type: Number }],
  designer: [{ type: String }],
  date: [{ type: String }],
  applicable: [{ type: String }] // Changed to string
});


module.exports = mongoose.model('Barrel', barrelSchema);
