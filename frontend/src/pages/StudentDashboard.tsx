import { useState } from "react";
import api from "../services/api";

export default function StudentDashboard() {

  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading,setLoading] = useState(false)

  const fetchSchedule = async () => {

    if (!studentId) {
      alert("Enter Hall Ticket");
      return;
    }

    try{

      setLoading(true)

      const res = await api.get(`/allocation/student/${studentId}`);

      setData(res.data);

    }catch(err){
      alert("Student not found")
    }finally{
      setLoading(false)
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* PAGE HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Exam Schedule Portal
        </h1>

        <p className="text-gray-500">
          Check your exam room and schedule
        </p>

      </div>

      {/* SEARCH BOX */}

      <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto mb-10">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Enter Hall Ticket
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Example: 22CS001"
            className="border p-3 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={fetchSchedule}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            View
          </button>

        </div>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="text-center text-gray-600 mb-6">
          Loading schedule...
        </div>

      )}

      {/* EXAM CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((exam: any) => (

          <div
            key={exam.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* SUBJECT */}

            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {exam.subject.name}
            </h3>

            {/* DATE */}

            <p className="text-gray-600 mb-1">
              📅 {exam.slot.date.substring(0,10)}
            </p>

            {/* TIME */}

            <p className="mb-1">

              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">

                {exam.slot.startTime} {exam.slot.session}

              </span>

            </p>

            {/* ROOM */}

            <p className="text-gray-600 mt-2">
              🏫 {exam.room.name}
            </p>

          </div>

        ))}

      </div>

      {/* EMPTY STATE */}

      {data.length === 0 && !loading && (

        <div className="text-center text-gray-500 mt-10">

          Enter your hall ticket to view exam schedule

        </div>

      )}

    </div>

  );
}