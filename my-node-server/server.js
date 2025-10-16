// server.js
const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/books'); // Impor Router Buku

const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---

// 1. CORS
app.use(cors()); 

// 2. Body Parser (untuk membaca JSON request body)
app.use(express.json()); 

// 3. Logging Middleware (Jawaban Soal No. 2)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const log = `${timestamp} - ${req.method} ${req.url}`;
    console.log(log);
    // Lanjutkan ke handler berikutnya
    next();
});

// --- ROUTING ---

app.get('/', (req, res) => {
    res.send('API Perpustakaan Sederhana Berjalan. Akses /api/books untuk CRUD.');
});

// Pasang router buku pada path /api/books
app.use('/api/books', bookRoutes); 

// --- ERROR HANDLING MIDDLEWARE (Jawaban Soal No. 3) ---

// 1. Middleware 404 Not Found
app.use((req, res, next) => {
    const error = new Error(`Tidak Ditemukan - URL ${req.originalUrl} tidak ada.`);
    error.status = 404;
    next(error); // Meneruskan ke global error handler
});

// 2. Global Error Handler
app.use((err, req, res, next) => {
    // Tentukan status code: gunakan status error (jika ada), jika tidak gunakan 500
    const statusCode = err.status || 500; 

    // Log error untuk debugging di server
    console.error(`[ERROR ${statusCode}] ${err.message}`);

    // Kirim respons error ke klien
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Terjadi kesalahan server internal.',
        // Hanya kirim stack trace di lingkungan development
        stack: process.env.NODE_ENV === 'production' ? '🤫' : err.stack
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
    console.log(`CRUD endpoints available at http://localhost:${PORT}/api/books`);
});