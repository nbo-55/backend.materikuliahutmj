const mongoose = require('mongoose');

const MateriSchema = new mongoose.Schema({
  materi_kuliah_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MateriKuliah', required: true },
  pengantar: String,
  pembahasan: String,
  contoh: String,
  referensi: [String],
  latihan: String,
  gambar: {
    data: String, // Data gambar dalam format Base64
    contentType: String, // Contoh: 'image/png' atau 'image/jpeg'
  },
});

module.exports = mongoose.model('Materi', MateriSchema);
