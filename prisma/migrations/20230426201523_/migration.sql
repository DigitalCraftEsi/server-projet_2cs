/*
  Warnings:

  - You are about to drop the column `picture` on the `consommateur` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `ac_idClient_fkey` ON `ac`;

-- DropIndex
DROP INDEX `adm_idClient_fkey` ON `adm`;

-- DropIndex
DROP INDEX `annoncepublicitaire_idAnnonceur_fkey` ON `annoncepublicitaire`;

-- DropIndex
DROP INDEX `annoncepublicitaire_idBoisson_fkey` ON `annoncepublicitaire`;

-- DropIndex
DROP INDEX `annoncepublicitaire_idDistributeur_fkey` ON `annoncepublicitaire`;

-- DropIndex
DROP INDEX `boisson_idDistributeur_fkey` ON `boisson`;

-- DropIndex
DROP INDEX `boissoncommande_idCommande_fkey` ON `boissoncommande`;

-- DropIndex
DROP INDEX `commande_idConsommateur_fkey` ON `commande`;

-- DropIndex
DROP INDEX `commande_idDistributeur_fkey` ON `commande`;

-- DropIndex
DROP INDEX `decideur_idClient_fkey` ON `decideur`;

-- DropIndex
DROP INDEX `distributeur_idAM_fkey` ON `distributeur`;

-- AlterTable
ALTER TABLE `consommateur` DROP COLUMN `picture`;

-- CreateTable
CREATE TABLE `card` (
    `cardNumber` VARCHAR(200) NOT NULL,
    `expiryMonth` VARCHAR(2) NOT NULL,
    `expiryYear` VARCHAR(2) NOT NULL,
    `holderName` VARCHAR(200) NOT NULL,
    `idConsommateur` INTEGER NOT NULL,

    UNIQUE INDEX `card_cardNumber_key`(`cardNumber`),
    PRIMARY KEY (`cardNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `actionsuspecte` ADD CONSTRAINT `actionsuspecte_idDistributeur_fkey` FOREIGN KEY (`idDistributeur`) REFERENCES `distributeur`(`idDistributeur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adm` ADD CONSTRAINT `adm_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `annoncepublicitaire` ADD CONSTRAINT `annoncepublicitaire_idBoisson_fkey` FOREIGN KEY (`idBoisson`) REFERENCES `boisson`(`idBoisson`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `annoncepublicitaire` ADD CONSTRAINT `annoncepublicitaire_idDistributeur_fkey` FOREIGN KEY (`idDistributeur`) REFERENCES `distributeur`(`idDistributeur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `annoncepublicitaire` ADD CONSTRAINT `annoncepublicitaire_idAnnonceur_fkey` FOREIGN KEY (`idAnnonceur`) REFERENCES `annonceur`(`idAnnonceur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boisson` ADD CONSTRAINT `boisson_idDistributeur_fkey` FOREIGN KEY (`idDistributeur`) REFERENCES `distributeur`(`idDistributeur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boissoncommande` ADD CONSTRAINT `boissoncommande_idBoisson_fkey` FOREIGN KEY (`idBoisson`) REFERENCES `boisson`(`idBoisson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boissoncommande` ADD CONSTRAINT `boissoncommande_idCommande_fkey` FOREIGN KEY (`idCommande`) REFERENCES `commande`(`idCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idConsommateur_fkey` FOREIGN KEY (`idConsommateur`) REFERENCES `consommateur`(`idConsommateur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idDistributeur_fkey` FOREIGN KEY (`idDistributeur`) REFERENCES `distributeur`(`idDistributeur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_idConsommateur_fkey` FOREIGN KEY (`idConsommateur`) REFERENCES `consommateur`(`idConsommateur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `decideur` ADD CONSTRAINT `decideur_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distributeur` ADD CONSTRAINT `distributeur_idAM_fkey` FOREIGN KEY (`idAM`) REFERENCES `am`(`idAM`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distributeur` ADD CONSTRAINT `distributeur_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ac` ADD CONSTRAINT `ac_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am` ADD CONSTRAINT `am_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;