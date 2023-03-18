/*
  Warnings:

  - You are about to drop the column `actif` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `etat` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `idAC` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `positionX` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `distributeur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idClient]` on the table `decideur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latitude` to the `distributeur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `distributeur` table without a default value. This is not possible if the table is not empty.
  - Made the column `adresse` on table `distributeur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `codeDeDeverrouillage` on table `distributeur` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `idClient` ON `decideur`;

-- DropIndex
DROP INDEX `idAC` ON `distributeur`;

-- AlterTable
ALTER TABLE `distributeur` DROP COLUMN `actif`,
    DROP COLUMN `etat`,
    DROP COLUMN `idAC`,
    DROP COLUMN `positionX`,
    DROP COLUMN `positionY`,
    ADD COLUMN `idAM` INTEGER NULL,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL,
    MODIFY `adresse` VARCHAR(200) NOT NULL,
    MODIFY `codeDeDeverrouillage` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `idClient` ON `decideur`(`idClient`);
