import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Navbar from "./components/Navbar";
import AddStudent from "./pages/AddStudent";

export default function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>

    </BrowserRouter>
  );
}