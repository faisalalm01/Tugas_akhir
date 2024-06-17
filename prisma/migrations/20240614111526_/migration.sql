/*
  Warnings:

  - You are about to drop the column `image` on the `cctv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cctv` DROP COLUMN `image`,
    ADD COLUMN `imageBanner` VARCHAR(191) NULL,
    ADD COLUMN `passwordUser` VARCHAR(191) NULL,
    MODIFY `userIp` VARCHAR(191) NULL,
    MODIFY `path` VARCHAR(191) NULL;
