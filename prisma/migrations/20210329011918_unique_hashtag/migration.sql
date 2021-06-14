/*
  Warnings:

  - You are about to drop the `_HashtagToPhoto` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[hashtag]` on the table `Hashtag`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToPhoto" DROP CONSTRAINT "_HashtagToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPhoto" DROP CONSTRAINT "_HashtagToPhoto_B_fkey";

-- DropTable
DROP TABLE "_HashtagToPhoto";

-- CreateTable
CREATE TABLE "_PhotoToHashtag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToHashtag_AB_unique" ON "_PhotoToHashtag"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToHashtag_B_index" ON "_PhotoToHashtag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hashtag_unique" ON "Hashtag"("hashtag");

-- AddForeignKey
ALTER TABLE "_PhotoToHashtag" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToHashtag" ADD FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
