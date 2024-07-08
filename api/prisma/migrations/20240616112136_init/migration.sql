/*
  Warnings:

  - You are about to drop the column `update` on the `post` table. All the data in the column will be lost.
  - Added the required column `update_at` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `update`,
    ADD COLUMN `update_at` TIMESTAMP(0) NOT NULL;
