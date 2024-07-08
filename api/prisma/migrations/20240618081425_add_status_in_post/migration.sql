-- AlterTable
ALTER TABLE `post` ADD COLUMN `status` ENUM('public', 'private') NULL DEFAULT 'public';
