/*
  Warnings:

  - Made the column `caption` on table `Photo` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "caption" SET NOT NULL;
