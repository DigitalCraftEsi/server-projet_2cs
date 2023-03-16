/*
  Warnings:

  - You are about to drop the `amdistributeur` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idClient]` on the table `ac` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `idClient` ON `ac`;

-- DropTable
DROP TABLE `amdistributeur`;

-- CreateIndex
CREATE UNIQUE INDEX `idClient` ON `ac`(`idClient`);
