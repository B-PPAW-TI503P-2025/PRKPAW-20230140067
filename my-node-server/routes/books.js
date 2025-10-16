// routes/books.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path ke file JSON
const DATA_PATH = path.join(__dirname, '..', 'data', 'books.json');

// Fungsi untuk membaca dan menulis data
const readBooks = () => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Jika file tidak ada atau kosong, kembalikan array kosong
        if (error.code === 'ENOENT' || error.message.includes('Unexpected end of JSON input')) {
            return [];
        }
        throw error;
    }
};

const writeBooks = (books) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(books, null, 4), 'utf8');
};

// --- VALIDATION MIDDLEWARE ---
const validateBook = (req, res, next) => {
    const { title, author, year, isbn } = req.body;

    if (!title || !author || !year || !isbn) {
        return res.status(400).json({ error: 'Semua field (title, author, year, isbn) harus diisi.' });
    }
    if (typeof year !== 'number' || year.toString().length !== 4) {
        return res.status(400).json({ error: 'Tahun harus berupa angka 4 digit yang valid.' });
    }
    // Asumsi ISBN harus berupa string
    if (typeof isbn !== 'string' || isbn.length < 10) {
        return res.status(400).json({ error: 'ISBN harus berupa string minimal 10 karakter.' });
    }

    next();
};

// --- CRUD ENDPOINTS ---

// 1. GET All Books (Read)
router.get('/', (req, res) => {
    const books = readBooks();
    res.status(200).json(books);
});

// 2. GET Book by ID (Read)
router.get('/:id', (req, res, next) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        // Meneruskan ke error handler 404
        const error = new Error(`Buku dengan ID ${req.params.id} tidak ditemukan.`);
        error.status = 404;
        return next(error); 
    }
    res.status(200).json(book);
});

// 3. POST New Book (Create)
router.post('/', validateBook, (req, res) => {
    const books = readBooks();
    const newBook = {
        id: (books.length + 1).toString(), // ID sederhana, bisa diganti dengan UUID
        ...req.body,
        year: parseInt(req.body.year) // Pastikan tahun adalah integer
    };

    // Cek duplikasi ISBN
    if (books.some(book => book.isbn === newBook.isbn)) {
         return res.status(409).json({ error: 'Buku dengan ISBN ini sudah ada.' });
    }

    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});

// 4. PUT Update Book (Update)
router.put('/:id', validateBook, (req, res, next) => {
    let books = readBooks();
    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1) {
        const error = new Error(`Buku dengan ID ${req.params.id} tidak ditemukan.`);
        error.status = 404;
        return next(error);
    }

    const updatedBook = {
        id: req.params.id,
        ...req.body,
        year: parseInt(req.body.year)
    };

    // Cek duplikasi ISBN, kecuali untuk buku yang sedang diupdate
    if (books.some((book, i) => book.isbn === updatedBook.isbn && i !== index)) {
         return res.status(409).json({ error: 'ISBN sudah digunakan oleh buku lain.' });
    }

    books[index] = updatedBook;
    writeBooks(books);
    res.status(200).json(updatedBook);
});

// 5. DELETE Book (Delete)
router.delete('/:id', (req, res, next) => {
    let books = readBooks();
    const initialLength = books.length;
    books = books.filter(b => b.id !== req.params.id);

    if (books.length === initialLength) {
        const error = new Error(`Buku dengan ID ${req.params.id} tidak ditemukan.`);
        error.status = 404;
        return next(error);
    }

    writeBooks(books);
    res.status(200).json({ message: `Buku dengan ID ${req.params.id} berhasil dihapus.` });
});

module.exports = router;