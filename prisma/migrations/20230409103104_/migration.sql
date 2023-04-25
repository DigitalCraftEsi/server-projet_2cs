/*
  Warnings:

  - You are about to drop the column `prix` on the `annoncepublicitaire` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `annoncepublicitaire` DROP COLUMN `prix`;

-- AlterTable
ALTER TABLE `commande` MODIFY `prix` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `boissoncommande` ADD CONSTRAINT `boissoncommande_idCommande_fkey` FOREIGN KEY (`idCommande`) REFERENCES `commande`(`idCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idConsommateur_fkey` FOREIGN KEY (`idConsommateur`) REFERENCES `consommateur`(`idConsommateur`) ON DELETE RESTRICT ON UPDATE CASCADE;
