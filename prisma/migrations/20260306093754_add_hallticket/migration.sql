/*
  Warnings:

  - A unique constraint covering the columns `[hallTicket]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "hallTicket" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_hallTicket_key" ON "Student"("hallTicket");
