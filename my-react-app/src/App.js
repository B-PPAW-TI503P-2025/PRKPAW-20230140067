import React, { useState } from 'react';
// Semua styling menggunakan Tailwind CSS class langsung di JSX

function App() {
  // State untuk menyimpan nilai input nama pengguna
  // Diinisialisasi dengan string kosong
  const [nama, setNama] = useState('');

  // State untuk menyimpan nama yang dikonfirmasi setelah tombol ditekan
  const [namaSambutan, setNamaSambutan] = useState('');

  // Fungsi yang dipanggil setiap kali pengguna mengetik di input
  const handleInputChange = (event) => {
    // Memperbarui state 'nama' dengan nilai input saat ini
    setNama(event.target.value);
  };
  
  // Tambahkan fungsi untuk menampilkan sambutan saat tombol diklik
  const tampilkanSambutan = () => {
    // Pastikan nama tidak hanya spasi kosong
    if (nama.trim()) {
        setNamaSambutan(nama.trim());
    } else {
        setNamaSambutan('Pengguna Misterius');
    }
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      
      {/* Kartu Utama untuk Konten */}
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Aplikasi Sambutan React Dinamis
        </h1>

        {/* Form Input Nama */}
        <div className="mb-6">
          <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-2">
            Masukkan Nama Anda:
          </label>
          <input
            id="name-input"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
            placeholder="Ketik nama Anda di sini..."
            // Menghubungkan nilai input ke state 'nama'
            value={nama}
            // Mendaftarkan fungsi handleInputChange saat ada perubahan input
            onChange={handleInputChange}
            // Memungkinkan penekanan Enter untuk memicu sambutan
            onKeyPress={(e) => { if (e.key === 'Enter') tampilkanSambutan(); }}
          />
        </div>

        {/* Tombol Tampilkan Sambutan */}
        <button
          onClick={tampilkanSambutan}
          disabled={nama.trim() === ''}
          className="w-full py-3 px-4 mb-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 transition duration-200 ease-in-out transform hover:scale-[1.01]"
        >
          Tampilkan Pesan Selamat Datang
        </button>

        {/* Pesan Selamat Datang (hanya muncul setelah tombol diklik) */}
        {namaSambutan && (
          <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg animate-fadeIn">
            <p className="text-xl font-bold">
              {/* Tampilkan pesan selamat datang dengan nama yang dikonfirmasi. */}
              Hello, {namaSambutan}!
            </p>
          </div>
        )}
        
      </div>
      
    </div>
  );
}

export default App;
