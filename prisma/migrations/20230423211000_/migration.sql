/*
  Warnings:

  - You are about to drop the column `periode` on the `annoncepublicitaire` table. All the data in the column will be lost.
  - The primary key for the `boisson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idDistributeur` on the `boissoncommande` table. All the data in the column will be lost.
  - Made the column `sexe` on table `annoncepublicitaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idDistributeur` on table `annoncepublicitaire` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `boisson` table without a default value. This is not possible if the table is not empty.
  - Made the column `Quantite` on table `boissoncommande` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `distuid` to the `distributeur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `odbuid` to the `distributeur` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idClient` ON `ac`;

-- DropIndex
DROP INDEX `idClient` ON `adm`;

-- DropIndex
DROP INDEX `idAnnonceur` ON `annoncepublicitaire`;

-- DropIndex
DROP INDEX `idBoisson` ON `annoncepublicitaire`;

-- DropIndex
DROP INDEX `idDistributeur` ON `boisson`;

-- DropIndex
DROP INDEX `idCommande` ON `boissoncommande`;

-- DropIndex
DROP INDEX `idConsommateur` ON `commande`;

-- DropIndex
DROP INDEX `idDistributeur` ON `commande`;

-- DropIndex
DROP INDEX `idClient` ON `decideur`;

-- DropIndex
DROP INDEX `idAM` ON `distributeur`;

-- AlterTable
ALTER TABLE `ac` ADD COLUMN `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif';

-- AlterTable
ALTER TABLE `adm` ADD COLUMN `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif';

-- AlterTable
ALTER TABLE `am` ADD COLUMN `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif';

-- AlterTable
ALTER TABLE `annoncepublicitaire` DROP COLUMN `periode`,
    ADD COLUMN `visible` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `sexe` VARCHAR(50) NOT NULL,
    MODIFY `idDistributeur` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `boisson` DROP PRIMARY KEY,
    ADD COLUMN `cafe` DOUBLE NULL,
    ADD COLUMN `description` VARCHAR(200) NOT NULL,
    ADD COLUMN `eau` DOUBLE NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `lait` DOUBLE NULL,
    ADD COLUMN `sucre` DOUBLE NULL,
    ADD COLUMN `the` DOUBLE NULL,
    ADD PRIMARY KEY (`idBoisson`);

-- AlterTable
ALTER TABLE `boissoncommande` DROP COLUMN `idDistributeur`,
    MODIFY `Quantite` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `commande` ADD COLUMN `status` ENUM('enAttente', 'echouee', 'terminee') NOT NULL DEFAULT 'enAttente';

-- AlterTable
ALTER TABLE `decideur` ADD COLUMN `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif';

-- AlterTable
ALTER TABLE `distributeur` ADD COLUMN `distuid` VARCHAR(200) NOT NULL,
    ADD COLUMN `odbuid` VARCHAR(200) NOT NULL;

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
ALTER TABLE `decideur` ADD CONSTRAINT `decideur_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distributeur` ADD CONSTRAINT `distributeur_idAM_fkey` FOREIGN KEY (`idAM`) REFERENCES `am`(`idAM`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distributeur` ADD CONSTRAINT `distributeur_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ac` ADD CONSTRAINT `ac_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am` ADD CONSTRAINT `am_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;
