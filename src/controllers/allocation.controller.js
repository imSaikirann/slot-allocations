import prisma from "../config/prisma.js";
import { runAllocation } from "../services/allocation.service.js";

export const generateAllocation = async (req, res) => {

  const result = await runAllocation();

  res.json({
    message: "Allocation completed",
    data: result
  });

};



export const getStudentSchedule = async (req, res) => {

  const { hallTicket } = req.params;

  console.log("Hall Ticket:", hallTicket);

  const data = await prisma.allocation.findMany({

    where: {
      student: {
        is: {
          hallTicket: hallTicket
        }
      }
    },

    include: {
      student: {
        include: {
          user: true
        }
      },
      subject: true,
      slot: true,
      room: true
    }

  });

  

  res.json(data);

};

export const getAllAllocations = async (req, res) => {

  const data = await prisma.allocation.findMany({

    include: {
      student: {
        select: {
          hallTicket: true,
          user: {
            select: {
              name: true
            }
          }
        }
      },
      subject: true,
      slot: true,
      room: true
    }

  });

  res.json(data);

};