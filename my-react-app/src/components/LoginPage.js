import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (err) {
      alert("Terjadi kesalahan server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">

      {/* 🔥 NAVBAR FIXED — tidak akan bertumpuk lagi */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm py-3 px-6 flex gap-6 z-50">
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Register
        </Link>
      </nav>

      {/* FORM LOGIN */}
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <label className="block text-left mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-left mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
