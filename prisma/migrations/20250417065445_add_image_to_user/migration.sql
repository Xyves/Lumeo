/*
  Warnings:

  - You are about to drop the column `profile_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_url",
ADD COLUMN     "image" TEXT;
