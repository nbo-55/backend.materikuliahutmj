const express = require("express");
const Materi = require("../models/Materi");

const router = express.Router();

// GET all materi
router.get("/", async (req, res) => {
  try {
    const materi = await Materi.find().populate("materi_kuliah_id", "materi_kuliah");
    res.status(200).json(materi); // Status 200 untuk sukses
  } catch (error) {
    console.error("Error saat mengambil data materi:", error.message);
    res.status(500).json({ message: "Gagal mengambil data materi", error: error.message });
  }
});

// POST a new materi
router.post("/", async (req, res) => {
  const { materi_kuliah_id, pengantar, pembahasan, contoh, referensi, latihan } = req.body;

  // Validasi input
  if (!materi_kuliah_id || !pengantar || !pembahasan || !contoh || !referensi || !latihan) {
    return res.status(400).json({
      message: "Semua field (materi_kuliah_id, pengantar, pembahasan, contoh, referensi, latihan) wajib diisi.",
    });
  }

  try {
    const newMateri = new Materi({
      materi_kuliah_id,
      pengantar,
      pembahasan,
      contoh,
      referensi,
      latihan,
    });

    const savedMateri = await newMateri.save();
    res.status(201).json(savedMateri); // Status 201 untuk data yang berhasil disimpan
  } catch (error) {
    console.error("Error saat menyimpan materi:", error.message);
    res.status(500).json({ message: "Gagal menambahkan materi", error: error.message });
  }
});

module.exports = router;
