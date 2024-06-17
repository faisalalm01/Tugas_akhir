/*
  Warnings:

  - You are about to drop the column `imageBanner` on the `cctv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cctv` DROP COLUMN `imageBanner`,
    ADD COLUMN `image` VARCHAR(191) NULL;
