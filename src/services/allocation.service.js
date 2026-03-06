import prisma from "../config/prisma.js";

export const runAllocation = async () => {

  await prisma.allocation.deleteMany();

  const students = await prisma.student.findMany();
  const subjects = await prisma.subject.findMany();
  const slots = await prisma.examSlot.findMany();
  const rooms = await prisma.room.findMany();

  const roomUsage = {};
  const allocations = [];

  for (const student of students) {

    const usedSlots = new Set();

    for (let i = 0; i < subjects.length; i++) {

      const subject = subjects[i];

      // cycle through slots
      const slot = slots[i % slots.length];

      if (usedSlots.has(slot.id)) continue;

      let assigned = false;

      for (const room of rooms) {

        const key = `${slot.id}-${room.id}`;

        if (!roomUsage[key]) {
          roomUsage[key] = 0;
        }

        if (roomUsage[key] >= room.capacity) continue;

        const allocation = await prisma.allocation.create({
          data: {
            studentId: student.id,
            subjectId: subject.id,
            slotId: slot.id,
            roomId: room.id
          }
        });

        allocations.push(allocation);

        usedSlots.add(slot.id);
        roomUsage[key]++;

        assigned = true;
        break;

      }

      if (!assigned) {
        console.log("No room available for slot");
      }

    }

  }

  return { totalAllocations: allocations.length };

};