import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="font-bold">
        Exam Allocation System
      </h1>

      <div className="space-x-4">

        <Link to="/">Admin</Link>

        <Link to="/student">Student</Link>

      </div>

    </div>
  );
}