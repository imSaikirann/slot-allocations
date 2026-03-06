/*
  Warnings:

  - Added the required column `session` to the `ExamSlot` table without a default value. This is not possible if the table is not empty.
  - Made the column `hallTicket` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Session" AS ENUM ('AM', 'PM');

-- AlterTable
ALTER TABLE "ExamSlot" ADD COLUMN     "session" "Session" NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "hallTicket" SET NOT NULL;
