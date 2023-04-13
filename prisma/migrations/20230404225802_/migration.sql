/*
  Warnings:

  - You are about to drop the `facture` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prix` to the `commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statut` to the `distributeur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commande` ADD COLUMN `prix` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `distributeur` ADD COLUMN `statut` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `facture`;

-- AddForeignKey
ALTER TABLE `boissoncommande` ADD CONSTRAINT `boissoncommande_idCommande_fkey` FOREIGN KEY (`idCommande`) REFERENCES `commande`(`idCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idConsommateur_fkey` FOREIGN KEY (`idConsommateur`) REFERENCES `consommateur`(`idConsommateur`) ON DELETE RESTRICT ON UPDATE CASCADE;
