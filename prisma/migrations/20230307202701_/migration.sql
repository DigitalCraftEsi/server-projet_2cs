/*
  Warnings:

  - You are about to drop the column `idDistributeur_1` on the `boisson` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `idDistributeur_1` ON `boisson`;

-- AlterTable
ALTER TABLE `boisson` DROP COLUMN `idDistributeur_1`,
    MODIFY `idBoisson` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE INDEX `idDistributeur` ON `boisson`(`idDistributeur`);
