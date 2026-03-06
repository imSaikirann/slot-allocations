import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard(){

  const navigate = useNavigate();

  const [data,setData] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const [status,setStatus] = useState("")

  const generate = async () => {

    setLoading(true)

    const steps = [
      "Starting allocation engine...",
      "Loading students...",
      "Checking subjects...",
      "Assigning exam slots...",
      "Allocating rooms...",
      "Finalizing schedule..."
    ]

    for(const step of steps){
      setStatus(step)
      await new Promise(r => setTimeout(r,700))
    }

    await api.post("/allocation/generate")

    setStatus("Allocation completed ✓")

    setTimeout(()=>{
      setLoading(false)
      setStatus("")
    },1000)

  }

  const loadAllocations = async () => {

    const res = await api.get("/allocation/all")

    setData(res.data)

  }

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button
          onClick={()=>{
            localStorage.removeItem("token")
            navigate("/admin-login")
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* ACTION BUTTONS */}

      <div className="flex gap-4 mb-8">

        <button
          onClick={generate}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
        >
          Generate Allocation
        </button>

        <button
          onClick={loadAllocations}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          View Students
        </button>

        <button
          onClick={()=>navigate("/add-student")}
          className="bg-purple-600 text-white px-6 py-2 rounded shadow hover:bg-purple-700"
        >
          Add Student
        </button>

      </div>

      {/* LOADING MODAL */}

      {loading && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-8 rounded-xl shadow-lg text-center w-96">

            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>

            <h2 className="text-lg font-semibold mb-2">
              Allocation Engine
            </h2>

            <p className="text-gray-600">
              {status}
            </p>

          </div>

        </div>

      )}

      {/* TABLE */}

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-200 text-gray-700">

            <tr>
              <th className="p-3 text-left">Hall Ticket</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Session</th>
              <th className="p-3 text-left">Room</th>
            </tr>

          </thead>

          <tbody>

            {data.map((item:any)=> (

              <tr key={item.id} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium">
                  {item.student.hallTicket}
                </td>

                <td className="p-3">
                  {item.student.user.name}
                </td>

                <td className="p-3">
                  {item.subject.name}
                </td>

                <td className="p-3">
                  {item.slot.date.substring(0,10)}
                </td>

                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                    {item.slot.startTime} {item.slot.session}
                  </span>
                </td>

                <td className="p-3">
                  {item.room.name}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}