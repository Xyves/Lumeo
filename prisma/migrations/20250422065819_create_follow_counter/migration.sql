-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followedCounter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "followingCounter" INTEGER NOT NULL DEFAULT 0;
