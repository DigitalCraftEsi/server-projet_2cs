/*
  Warnings:

  - You are about to drop the column `nomAc` on the `ac` table. All the data in the column will be lost.
  - Added the required column `nomAC` to the `ac` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ac` DROP COLUMN `nomAc`,
    ADD COLUMN `nomAC` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE INDEX `idAM` ON `distributeur`(`idAM`);

-- AddForeignKey
ALTER TABLE `boissoncommande` ADD CONSTRAINT `boissoncommande_idCommande_fkey` FOREIGN KEY (`idCommande`) REFERENCES `commande`(`idCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idConsommateur_fkey` FOREIGN KEY (`idConsommateur`) REFERENCES `consommateur`(`idConsommateur`) ON DELETE RESTRICT ON UPDATE CASCADE;
