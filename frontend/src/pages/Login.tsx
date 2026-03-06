import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const login = async () => {

    try {

      setLoading(true);

      const res = await api.post("/auth/admin/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/admin");

    } catch (err) {

      console.log(err);
      alert("Invalid credentials");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-2">
          Exam Allocation
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Admin Portal
        </p>

        {/* EMAIL */}

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* DIVIDER */}

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* STUDENT PORTAL LINK */}

        <button
          onClick={()=>navigate("/student")}
          className="w-full border border-gray-300 p-3 rounded hover:bg-gray-100 transition"
        >
          Go to Student Portal
        </button>

      </div>

    </div>
  );
}