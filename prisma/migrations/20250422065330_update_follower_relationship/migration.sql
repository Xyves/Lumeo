/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Follower` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followerUserId,followedUserId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followedUserId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerUserId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropIndex
DROP INDEX "Follower_followerId_followingId_key";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "followerId",
DROP COLUMN "followingId",
DROP COLUMN "userId",
ADD COLUMN     "followedUserId" TEXT NOT NULL,
ADD COLUMN     "followerUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follower_followerUserId_followedUserId_key" ON "Follower"("followerUserId", "followedUserId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
