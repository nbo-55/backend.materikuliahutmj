const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Rute untuk Generate Materi
router.post('/', async (req, res) => {
  const { mataKuliah, materiKuliah } = req.body;

  // Validasi input
  if (!mataKuliah || !materiKuliah || typeof mataKuliah !== 'string' || typeof materiKuliah !== 'string') {
    return res.status(400).json({ message: 'Nama Mata Kuliah dan Materi Kuliah diperlukan dan harus berupa string.' });
  }

  try {
    // Panggil OpenAI API untuk membuat materi pengajaran
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        max_tokens: 1600, // Membatasi panjang respons
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: 'Anda adalah AI yang membantu menghasilkan materi pengajaran untuk mata kuliah dan materi kuliah. Buatkan materi pengajaran yang mencakup pengantar, pembahasan, contoh, referensi, dan latihan.'
          },
          {
            role: 'user',
            content: `Buatkan materi pengajaran untuk mata kuliah ${mataKuliah} dengan judul materi ${materiKuliah}. Buatkan bagian pengantar, pembahasan, contoh yang relevan, referensi yang sesuai, dan latihan untuk mahasiswa. Format output harus sesuai dengan label berikut: Pengantar, Pembahasan, Contoh, Referensi, Latihan, dengan 650 kata.`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Ambil konten dari respons OpenAI
    const aiContent = response.data.choices[0].message.content;

    // Pisahkan setiap bagian materi berdasarkan format output
    const sections = {
      pengantar: '',
      pembahasan: '',
      contoh: '',
      referensi: [],
      latihan: '',
    };

    // Gunakan regex untuk memisahkan bagian materi
    const pengantarMatch = aiContent.match(/Pengantar:(.*?)Pembahasan:/s);
    const pembahasanMatch = aiContent.match(/Pembahasan:(.*?)Contoh:/s);
    const contohMatch = aiContent.match(/Contoh:(.*?)Referensi:/s);
    const referensiMatch = aiContent.match(/Referensi:(.*?)Latihan:/s);
    const latihanMatch = aiContent.match(/Latihan:(.*)/s);

    if (pengantarMatch) sections.pengantar = pengantarMatch[1].trim();
    if (pembahasanMatch) sections.pembahasan = pembahasanMatch[1].trim();
    if (contohMatch) sections.contoh = contohMatch[1].trim();
    if (referensiMatch) {
      sections.referensi = referensiMatch[1]
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    if (latihanMatch) sections.latihan = latihanMatch[1].trim();

    // Kirim respons ke frontend
    res.status(200).json(sections);
  } catch (error) {
    console.error('Error saat memanggil OpenAI API:', error.message);

    if (error.response) {
      console.error('Detail Error dari OpenAI:', error.response.data);
      return res.status(error.response.status).json({
        message: 'Gagal menghasilkan materi',
        error: error.response.data,
      });
    }

    res.status(500).json({ message: 'Gagal menghasilkan materi', error: error.message });
  }
});

module.exports = router;
