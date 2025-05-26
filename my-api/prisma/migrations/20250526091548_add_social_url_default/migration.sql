/*
  Warnings:

  - Added the required column `socialURLOrBuyMeACoffee` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "donorId" INTEGER NOT NULL DEFAULT 21,
ADD COLUMN     "socialURLOrBuyMeACoffee" TEXT NOT NULL;
