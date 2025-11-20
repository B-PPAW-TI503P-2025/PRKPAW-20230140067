import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-10">

      <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center border">

        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Selamat Datang 🎉
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          Kamu berhasil login! Ini adalah halaman Dashboard.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="py-2 px-6 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;
