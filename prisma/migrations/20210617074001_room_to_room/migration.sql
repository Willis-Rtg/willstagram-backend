/*
  Warnings:

  - Made the column `roomId` on table `Message` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "roomId" SET NOT NULL;
