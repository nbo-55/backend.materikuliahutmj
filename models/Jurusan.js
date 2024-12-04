const mongoose = require('mongoose');

const jurusanSchema = new mongoose.Schema({
  nama_jurusan: { type: String, required: true },
  fakultas_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fakultas', // Merujuk ke model Fakultas
    required: true,
  },
});

const Jurusan = mongoose.model('Jurusan', jurusanSchema);

module.exports = Jurusan;
