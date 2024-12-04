const express = require("express");
const Fakultas = require("../models/Fakultas");
const mongoose = require("mongoose");

const router = express.Router();

// GET all fakultas
router.get("/", async (req, res) => {
  try {
    const fakultas = await Fakultas.find();
    res.status(200).json(fakultas); // Status 200 untuk kejelasan
  } catch (error) {
    console.error("Error mengambil data fakultas:", error);
    res.status(500).json({ message: "Gagal mengambil data fakultas.", error });
  }
});

// POST a new fakultas
router.post("/", async (req, res) => {
  try {
    const { nama_fakultas } = req.body;

    if (!nama_fakultas) {
      return res.status(400).json({ message: "Nama fakultas tidak disediakan." });
    }

    // Cek apakah nama_fakultas sudah ada di database
    const existingFakultas = await Fakultas.findOne({ nama_fakultas: nama_fakultas.toLowerCase() });

    if (existingFakultas) {
      return res.status(200).json({
        message: `Fakultas "${nama_fakultas}" sudah ada. Anda dapat melanjutkan.`,
        fakultas: existingFakultas,
      });
    }

    // Simpan fakultas baru
    const newFakultas = new Fakultas({ nama_fakultas: nama_fakultas.toLowerCase() });
    const savedFakultas = await newFakultas.save();
    res.status(201).json(savedFakultas); // Status 201 untuk data baru

  } catch (error) {
    console.error("Error saat menambahkan fakultas:", error);
    res.status(500).json({ message: "Terjadi kesalahan server.", error });
  }
});

// DELETE fakultas by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID tidak valid." });
  }

  try {
    const result = await Fakultas.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Data fakultas tidak ditemukan." });
    }
    res.status(200).json({ message: "Data fakultas berhasil dihapus." });
  } catch (error) {
    console.error("Error menghapus data fakultas:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus data.", error });
  }
});

module.exports = router;
