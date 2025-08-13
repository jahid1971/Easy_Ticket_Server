/*
  Warnings:

  - You are about to drop the column `column` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `row` on the `Seat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Bus" ADD COLUMN     "coverImageUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."Seat" DROP COLUMN "column",
DROP COLUMN "row";
