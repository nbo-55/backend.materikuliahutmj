const express = require("express");
const MataKuliah = require("../models/MataKuliah");
const mongoose = require("mongoose");

const router = express.Router();

// GET all mata kuliah
router.get("/", async (req, res) => {
  try {
    const mataKuliah = await MataKuliah.find().populate("jurusan_id", "nama_jurusan");
    res.status(200).json(mataKuliah); // Status 200 untuk sukses
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data mata kuliah.", error });
  }
});

// POST a new mata kuliah
router.post("/", async (req, res) => {
  const { mata_kuliah, jurusan_id } = req.body;

  if (!mata_kuliah || !jurusan_id) {
    return res.status(400).json({
      message: "Nama mata kuliah dan jurusan_id harus diisi.",
    });
  }

  try {
    const newMataKuliah = new MataKuliah({
      mata_kuliah: mata_kuliah.toLowerCase(),
      jurusan_id,
    });

    const savedMataKuliah = await newMataKuliah.save();
    res.status(201).json(savedMataKuliah); // Status 201 untuk data baru
  } catch (error) {
    console.error("Error saat menyimpan mata kuliah:", error);
    res.status(500).json({ message: "Gagal menyimpan data mata kuliah.", error });
  }
});

// DELETE mata kuliah by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID tidak valid." });
  }

  try {
    const result = await MataKuliah.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Data mata kuliah tidak ditemukan." });
    }
    res.status(200).json({ message: "Data mata kuliah berhasil dihapus." });
  } catch (error) {
    console.error("Error menghapus data mata kuliah:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus data.", error });
  }
});

module.exports = router;
  