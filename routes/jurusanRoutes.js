const express = require("express");
const Jurusan = require("../models/Jurusan");
const mongoose = require("mongoose");

const router = express.Router();

// GET all jurusan
router.get("/", async (req, res) => {
  try {
    const jurusan = await Jurusan.find().populate("fakultas_id", "nama_fakultas");
    res.status(200).json(jurusan); // Status 200 untuk kejelasan
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data jurusan.", error });
  }
});

// POST a new jurusan
router.post("/", async (req, res) => {
  const { nama_jurusan, fakultas_id } = req.body;

  if (!nama_jurusan || !fakultas_id) {
    return res.status(400).json({
      message: "Nama jurusan dan fakultas_id harus diisi.",
    });
  }

  try {
    // Simpan jurusan baru
    const newJurusan = new Jurusan({
      nama_jurusan: nama_jurusan.toLowerCase(),
      fakultas_id,
    });

    const savedJurusan = await newJurusan.save();
    res.status(201).json(savedJurusan); // Status 201 untuk data baru
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan data jurusan.", error });
  }
});

// DELETE jurusan by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID tidak valid." });
  }

  try {
    const result = await Jurusan.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Data jurusan tidak ditemukan." });
    }
    res.status(200).json({ message: "Data jurusan berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus data.", error });
  }
});

module.exports = router;
