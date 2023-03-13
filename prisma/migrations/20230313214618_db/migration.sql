/*
  Warnings:

  - You are about to drop the column `nomADM_` on the `adm` table. All the data in the column will be lost.
  - The primary key for the `boissoncommande` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actif` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `codeDeDeverrouillage_` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `etat` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `positionX` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `distributeur` table. All the data in the column will be lost.
  - You are about to drop the `agent_commerciale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agent_maitenance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[emailADM]` on the table `adm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailAnnonceur]` on the table `annonceur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailClient]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailConsommateur]` on the table `consommateur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailDecideur]` on the table `decideur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailSADM]` on the table `sadm` will be added. If there are existing duplicate values, this will fail.
  - Made the column `dateAction` on table `actionsuspecte` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `actionsuspecte` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notif` on table `actionsuspecte` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `nomADM` to the `adm` table without a default value. This is not possible if the table is not empty.
  - Made the column `prenomADM` on table `adm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailADM` on table `adm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motDePasseADM` on table `adm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sexe` on table `annoncepublicitaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prix` on table `annoncepublicitaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateDebut` on table `annoncepublicitaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateFin` on table `annoncepublicitaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomAnnonceur` on table `annonceur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailAnnonceur` on table `annonceur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titre` on table `anomalie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `anomalie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomBoisson` on table `boisson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tarif` on table `boisson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomClient` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailClient` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateCommande` on table `commande` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomConsommateur` on table `consommateur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenomConsommateur` on table `consommateur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailConsommateur` on table `consommateur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motDePasseConsommateur` on table `consommateur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomDecideur` on table `decideur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenomDecideur` on table `decideur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailDecideur` on table `decideur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motDePasseDecideur` on table `decideur` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `codeDeDeverrouillage` to the `distributeur` table without a default value. This is not possible if the table is not empty.
  - Made the column `adresse` on table `distributeur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `etat` on table `facture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prix` on table `facture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notif` on table `facture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titre` on table `panne` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `panne` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titre` on table `reclamation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `reclamation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateReclamation` on table `reclamation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notif` on table `reclamation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateReclamationAuto` on table `reclamationauto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `reclamationauto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titre` on table `reponse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `reponse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateReponse` on table `reponse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notif` on table `reponse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomSADM` on table `sadm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenomSADM` on table `sadm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailSADM` on table `sadm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motDePasseSADM` on table `sadm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateDebut` on table `tache` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateFin` on table `tache` required. This step will fail if there are existing NULL values in that column.
  - Made the column `etat` on table `tache` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notif` on table `tache` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateVol` on table `vol` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `vol` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notif` on table `vol` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `idBoisson` ON `annoncepublicitaire`;

-- DropIndex
DROP INDEX `idCommande` ON `reclamation`;

-- AlterTable
ALTER TABLE `actionsuspecte` MODIFY `dateAction` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL,
    MODIFY `notif` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `adm` DROP COLUMN `nomADM_`,
    ADD COLUMN `nomADM` VARCHAR(200) NOT NULL,
    MODIFY `prenomADM` VARCHAR(200) NOT NULL,
    MODIFY `emailADM` VARCHAR(200) NOT NULL,
    MODIFY `motDePasseADM` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `annoncepublicitaire` MODIFY `sexe` VARCHAR(50) NOT NULL,
    MODIFY `prix` DOUBLE NOT NULL,
    MODIFY `dateDebut` DATETIME(0) NOT NULL,
    MODIFY `dateFin` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `annonceur` MODIFY `nomAnnonceur` VARCHAR(200) NOT NULL,
    MODIFY `emailAnnonceur` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `anomalie` MODIFY `titre` VARCHAR(200) NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `boisson` MODIFY `nomBoisson` VARCHAR(200) NOT NULL,
    MODIFY `tarif` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `boissoncommande` DROP PRIMARY KEY,
    MODIFY `idDistributeur` INTEGER NULL,
    ADD PRIMARY KEY (`idBoisson`, `idCommande`);

-- AlterTable
ALTER TABLE `client` MODIFY `nomClient` VARCHAR(200) NOT NULL,
    MODIFY `emailClient` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `commande` MODIFY `dateCommande` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `consommateur` MODIFY `nomConsommateur` VARCHAR(200) NOT NULL,
    MODIFY `prenomConsommateur` VARCHAR(200) NOT NULL,
    MODIFY `emailConsommateur` VARCHAR(200) NOT NULL,
    MODIFY `motDePasseConsommateur` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `decideur` MODIFY `nomDecideur` VARCHAR(200) NOT NULL,
    MODIFY `prenomDecideur` VARCHAR(200) NOT NULL,
    MODIFY `emailDecideur` VARCHAR(200) NOT NULL,
    MODIFY `motDePasseDecideur` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `distributeur` DROP COLUMN `actif`,
    DROP COLUMN `codeDeDeverrouillage_`,
    DROP COLUMN `etat`,
    DROP COLUMN `positionX`,
    DROP COLUMN `positionY`,
    ADD COLUMN `codeDeDeverrouillage` VARCHAR(200) NOT NULL,
    MODIFY `adresse` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `facture` MODIFY `etat` VARCHAR(50) NOT NULL,
    MODIFY `prix` DOUBLE NOT NULL,
    MODIFY `notif` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `panne` MODIFY `titre` VARCHAR(200) NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `reclamation` MODIFY `titre` VARCHAR(200) NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL,
    MODIFY `dateReclamation` DATETIME(0) NOT NULL,
    MODIFY `notif` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `reclamationauto` MODIFY `dateReclamationAuto` DATETIME(0) NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `reponse` MODIFY `titre` VARCHAR(200) NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL,
    MODIFY `dateReponse` DATETIME(0) NOT NULL,
    MODIFY `notif` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `sadm` MODIFY `nomSADM` VARCHAR(200) NOT NULL,
    MODIFY `prenomSADM` VARCHAR(200) NOT NULL,
    MODIFY `emailSADM` VARCHAR(200) NOT NULL,
    MODIFY `motDePasseSADM` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `tache` MODIFY `dateDebut` DATETIME(0) NOT NULL,
    MODIFY `dateFin` DATETIME(0) NOT NULL,
    MODIFY `etat` VARCHAR(50) NOT NULL,
    MODIFY `notif` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `vol` MODIFY `dateVol` DATETIME(0) NOT NULL,
    MODIFY `description` VARCHAR(200) NOT NULL,
    MODIFY `notif` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `agent_commerciale`;

-- DropTable
DROP TABLE `agent_maitenance`;

-- CreateTable
CREATE TABLE `ac` (
    `idAC` INTEGER NOT NULL AUTO_INCREMENT,
    `nomAc` VARCHAR(200) NOT NULL,
    `prenomAC` VARCHAR(200) NOT NULL,
    `emailAC` VARCHAR(200) NOT NULL,
    `telephoneAC` VARCHAR(200) NULL,
    `motDePasseAC` VARCHAR(200) NOT NULL,
    `idClient` INTEGER NOT NULL,

    UNIQUE INDEX `emailAC`(`emailAC`),
    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idAC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am` (
    `idAM` INTEGER NOT NULL AUTO_INCREMENT,
    `nomAM` VARCHAR(200) NOT NULL,
    `prenomAM` VARCHAR(200) NOT NULL,
    `emailAM` VARCHAR(200) NOT NULL,
    `telephoneAM` VARCHAR(200) NULL,
    `motDePasseAM` VARCHAR(200) NOT NULL,
    `idClient` INTEGER NOT NULL,

    UNIQUE INDEX `emailAM`(`emailAM`),
    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idAM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `emailADM` ON `adm`(`emailADM`);

-- CreateIndex
CREATE INDEX `idBoisson` ON `annoncepublicitaire`(`idBoisson`);

-- CreateIndex
CREATE UNIQUE INDEX `emailAnnonceur` ON `annonceur`(`emailAnnonceur`);

-- CreateIndex
CREATE UNIQUE INDEX `emailClient` ON `client`(`emailClient`);

-- CreateIndex
CREATE UNIQUE INDEX `emailConsommateur` ON `consommateur`(`emailConsommateur`);

-- CreateIndex
CREATE UNIQUE INDEX `emailDecideur` ON `decideur`(`emailDecideur`);

-- CreateIndex
CREATE INDEX `idCommande` ON `reclamation`(`idCommande`);

-- CreateIndex
CREATE UNIQUE INDEX `emailSADM` ON `sadm`(`emailSADM`);
