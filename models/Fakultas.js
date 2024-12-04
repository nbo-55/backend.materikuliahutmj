const mongoose = require('mongoose');

const FakultasSchema = new mongoose.Schema({
  nama_fakultas: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Fakultas', FakultasSchema);
