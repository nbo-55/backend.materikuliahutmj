const mongoose = require('mongoose');

const MataKuliahSchema = new mongoose.Schema({
  mata_kuliah: { type: String, required: true },
  jurusan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jurusan', // Merujuk ke model Jurusan
    required: true,
  },
});

const MataKuliah = mongoose.model('MataKuliah', MataKuliahSchema);

module.exports = MataKuliah;
