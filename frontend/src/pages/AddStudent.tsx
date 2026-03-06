import { useState } from "react";
import api from "../services/api";

export default function AddStudent(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [hallTicket,setHallTicket] = useState("")

  const submit = async () => {

    try{

      await api.post("/student/create",{
        name,
        email,
        hallTicket
      })

      alert("Student added successfully")

      setName("")
      setEmail("")
      setHallTicket("")

    }catch(err){
        console.log(err)
      alert("Error adding student")

    }

  }

  return(

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Add Student
      </h1>

      <div className="flex flex-col gap-4 w-96">

        <input
          placeholder="Student Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Hall Ticket"
          value={hallTicket}
          onChange={(e)=>setHallTicket(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={submit}
          className="bg-green-600 text-white p-2 rounded"
        >
          Add Student
        </button>

      </div>

    </div>

  )

}