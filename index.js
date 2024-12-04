const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

// Koneksi ke database
connectDB();

// Inisialisasi aplikasi
const app = express();

// Middleware CORS
app.use(cors({
    origin: 'https://frontend.materikuliahutmj.web.id', // Domain frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Tangani Preflight OPTIONS Request
app.options('*', cors());

// Middleware untuk parsing body JSON
app.use(bodyParser.json());

// Rute API
app.use("/api/fakultas", require("./routes/fakultasRoutes"));
app.use("/api/jurusan", require("./routes/jurusanRoutes"));
app.use("/api/matakuliah", require("./routes/mataKuliahRoutes"));
app.use("/api/materikuliah", require("./routes/materiKuliahRoutes"));
app.use("/api/materi", require("./routes/materiRoutes"));
app.use("/api/generate-materi", require("./routes/generateMateriRoutes"));

// Ekspor aplikasi untuk digunakan sebagai serverless function
module.exports = app;

// Local development fallback
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});

