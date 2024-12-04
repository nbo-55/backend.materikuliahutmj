const mongoose = require('mongoose');

const MateriKuliahSchema = new mongoose.Schema({
    materi_kuliah: { type: String, required: true },
    mata_kuliah_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MataKuliah',
      required: true,
    },
  });
  
  const MateriKuliah = mongoose.model('MateriKuliah', MateriKuliahSchema);
  module.exports = MateriKuliah;
  