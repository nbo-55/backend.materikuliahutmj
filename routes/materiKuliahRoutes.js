const express = require('express');
const MateriKuliah = require('../models/MateriKuliah');
const mongoose = require('mongoose');

const router = express.Router();

// POST untuk menambahkan materi kuliah
router.post("/", async (req, res) => {
  const { mata_kuliah_id, materi_kuliah } = req.body;

  if (!mata_kuliah_id || !materi_kuliah) {
    return res.status(400).json({ message: "Field mata_kuliah_id dan materi_kuliah wajib diisi." });
  }

  try {
    const newMateriKuliah = new MateriKuliah({
      mata_kuliah_id,
      materi_kuliah,
    });

    const savedMateriKuliah = await newMateriKuliah.save();
    res.status(201).json(savedMateriKuliah); // Status 201 untuk data yang berhasil disimpan
  } catch (error) {
    console.error("Error saat menyimpan materi kuliah:", error.message);
    res.status(500).json({ message: "Gagal menambahkan materi kuliah", error: error.message });
  }
});

module.exports = router;
