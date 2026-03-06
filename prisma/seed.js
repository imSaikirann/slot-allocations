import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkgPg from "pg";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;
const { Pool } = pkgPg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding database...");

  // Subjects
  await prisma.subject.createMany({
    data: [
      { name: "Mathematics" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "DBMS" },
      { name: "Artificial Intelligence" },
    ],
  });

  console.log("Subjects created");

  // Rooms
  await prisma.room.createMany({
    data: [
      { name: "Room A", capacity: 30 },
      { name: "Room B", capacity: 40 },
      { name: "Room C", capacity: 50 },
    ],
  });

  console.log("Rooms created");

  // Exam Slots
await prisma.examSlot.createMany({
  data: [
    {
      date: new Date("2026-05-10"),
      startTime: "09:00",
      endTime: "12:00",
      session: "AM"
    },
    {
      date: new Date("2026-05-10"),
      startTime: "14:00",
      endTime: "17:00",
      session: "PM"
    },
    {
      date: new Date("2026-05-11"),
      startTime: "09:00",
      endTime: "12:00",
      session: "AM"
    },
  ],
});

  console.log("Exam slots created");

  // Create Students
// Create Students
console.log("Creating students...");

for (let i = 1; i <= 50; i++) {

  const user = await prisma.user.create({
    data: {
      name: `Student ${i}`,
      email: `student${i}@mail.com`,
      password: "password123",
      role: "STUDENT",
    },
  });

  const hallTicket = `22CS${String(i).padStart(3, "0")}`;

  await prisma.student.create({
    data: {
      userId: user.id,
      hallTicket: hallTicket
    },
  });

}


const hashedPassword = await bcrypt.hash("admin123",10);

await prisma.user.create({
  data: {
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "ADMIN"
  }
});
console.log("Admin created");

console.log("Students created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });