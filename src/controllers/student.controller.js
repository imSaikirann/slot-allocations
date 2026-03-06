import prisma from "../config/prisma.js";

export const createStudent = async (req, res) => {

  const { name, email, hallTicket, subjects } = req.body;

  try {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: "password123",
        role: "STUDENT"
      }
    });

    const student = await prisma.student.create({
      data: {
        hallTicket,
        userId: user.id
 
      }
    });

    if(subjects && subjects.length > 0){

      const relations = subjects.map(subjectId => ({
        studentId: student.id,
        subjectId
      }));

      await prisma.studentSubject.createMany({
        data: relations
      });

    }

    res.json({
      message: "Student created successfully",
      student
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creating student"
    });

  }

};