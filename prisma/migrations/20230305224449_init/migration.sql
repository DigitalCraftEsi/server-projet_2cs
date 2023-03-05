/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `actionsuspecte` (
    `idActionSuspecte` INTEGER NOT NULL,
    `dateAction` INTEGER NULL,
    `description` VARCHAR(200) NULL,
    `notif` BOOLEAN NULL,
    `idDistributeur` INTEGER NOT NULL,

    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idActionSuspecte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adm` (
    `idADM` INTEGER NOT NULL,
    `nomADM_` VARCHAR(200) NULL,
    `prenomADM` VARCHAR(200) NULL,
    `emailADM` VARCHAR(200) NULL,
    `telephoneADM` VARCHAR(200) NULL,
    `motDePasseADM` VARCHAR(200) NULL,
    `idClient` INTEGER NOT NULL,

    UNIQUE INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idADM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agent_commerciale` (
    `idAC` INTEGER NOT NULL,
    `nomAc` VARCHAR(200) NULL,
    `prenomAC` VARCHAR(200) NULL,
    `emailAC` VARCHAR(200) NULL,
    `telephoneAC` VARCHAR(200) NULL,
    `motDePasseAC` VARCHAR(200) NULL,
    `idClient` INTEGER NOT NULL,

    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idAC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agent_maitenance` (
    `idAM` INTEGER NOT NULL,
    `nomAM` VARCHAR(200) NULL,
    `prenomAM` VARCHAR(200) NULL,
    `emailAM` VARCHAR(200) NULL,
    `telephoneAM` VARCHAR(200) NULL,
    `motDePasseAM` VARCHAR(200) NULL,
    `idClient` INTEGER NOT NULL,

    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idAM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amdistributeur` (
    `idDistributeur` INTEGER NOT NULL,
    `idAM` INTEGER NOT NULL,

    INDEX `idAM`(`idAM`),
    PRIMARY KEY (`idDistributeur`, `idAM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `annoncepublicitaire` (
    `idAnnonce` INTEGER NOT NULL,
    `sexe` VARCHAR(1) NULL,
    `ageMin` INTEGER NULL,
    `ageMax` INTEGER NULL,
    `video` VARCHAR(200) NULL,
    `region` VARCHAR(200) NULL,
    `prix` DOUBLE NULL,
    `dateDebut` DATETIME(0) NULL,
    `dateFin` DATETIME(0) NULL,
    `periode` INTEGER NULL,
    `idBoisson` INTEGER NULL,
    `idDistributeur` INTEGER NULL,
    `idAnnonceur` INTEGER NOT NULL,

    INDEX `idAnnonceur`(`idAnnonceur`),
    INDEX `idBoisson`(`idBoisson`, `idDistributeur`),
    PRIMARY KEY (`idAnnonce`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `annonceur` (
    `idAnnonceur` INTEGER NOT NULL,
    `nomAnnonceur` VARCHAR(200) NULL,
    `emailAnnonceur` VARCHAR(200) NULL,
    `telephoneAnnonceur` VARCHAR(200) NULL,

    PRIMARY KEY (`idAnnonceur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anomalie` (
    `idAnomalie` INTEGER NOT NULL,
    `titre` VARCHAR(200) NULL,
    `description` VARCHAR(200) NULL,
    `idTache` INTEGER NULL,

    UNIQUE INDEX `idTache`(`idTache`),
    PRIMARY KEY (`idAnomalie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boisson` (
    `idBoisson` INTEGER NOT NULL,
    `idDistributeur` INTEGER NOT NULL,
    `nomBoisson` VARCHAR(200) NULL,
    `tarif` DOUBLE NULL,
    `idDistributeur_1` INTEGER NULL,

    INDEX `idDistributeur_1`(`idDistributeur_1`),
    PRIMARY KEY (`idBoisson`, `idDistributeur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boissoncommande` (
    `idBoisson` INTEGER NOT NULL,
    `idDistributeur` INTEGER NOT NULL,
    `idCommande` INTEGER NOT NULL,
    `Quantite` INTEGER NULL,

    INDEX `idCommande`(`idCommande`),
    PRIMARY KEY (`idBoisson`, `idDistributeur`, `idCommande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `idClient` INTEGER NOT NULL,
    `nomClient` VARCHAR(200) NULL,
    `emailClient` VARCHAR(200) NULL,
    `telephoneClient` VARCHAR(200) NULL,

    PRIMARY KEY (`idClient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commande` (
    `idCommande` INTEGER NOT NULL,
    `dateCommande` DATETIME(0) NULL,
    `idConsommateur` INTEGER NOT NULL,
    `idDistributeur` INTEGER NOT NULL,

    INDEX `idConsommateur`(`idConsommateur`),
    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idCommande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consommateur` (
    `idConsommateur` INTEGER NOT NULL,
    `nomConsommateur` VARCHAR(200) NULL,
    `prenomConsommateur` VARCHAR(200) NULL,
    `emailConsommateur` VARCHAR(200) NULL,
    `telephoneConsommateur` VARCHAR(200) NULL,
    `motDePasseConsommateur` VARCHAR(200) NULL,

    PRIMARY KEY (`idConsommateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `decideur` (
    `idDecideur` INTEGER NOT NULL,
    `nomDecideur` VARCHAR(200) NULL,
    `prenomDecideur` VARCHAR(200) NULL,
    `emailDecideur` VARCHAR(200) NULL,
    `telephoneDecideur` VARCHAR(200) NULL,
    `motDePasseDecideur` VARCHAR(50) NULL,
    `idClient` INTEGER NOT NULL,

    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idDecideur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `distributeur` (
    `idDistributeur` INTEGER NOT NULL AUTO_INCREMENT,
    `positionX` INTEGER NULL,
    `positionY` INTEGER NULL,
    `adresse` VARCHAR(200) NULL,
    `etat` VARCHAR(50) NULL,
    `codeDeDeverrouillage_` VARCHAR(200) NULL,
    `actif` BOOLEAN NULL DEFAULT true,
    `idClient` INTEGER NULL,
    `idAC` INTEGER NULL,

    INDEX `idAC`(`idAC`),
    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idDistributeur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facture` (
    `idFacture` INTEGER NOT NULL,
    `etat` VARCHAR(50) NULL,
    `prix` DOUBLE NULL,
    `notif` BOOLEAN NULL,
    `idCommande` INTEGER NOT NULL,

    UNIQUE INDEX `idCommande`(`idCommande`),
    PRIMARY KEY (`idFacture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `panne` (
    `idPanne` INTEGER NOT NULL,
    `titre` VARCHAR(200) NULL,
    `description` VARCHAR(200) NULL,
    `idTache` INTEGER NULL,

    UNIQUE INDEX `idTache`(`idTache`),
    PRIMARY KEY (`idPanne`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reclamation` (
    `idReclamation` INTEGER NOT NULL,
    `titre` VARCHAR(200) NULL,
    `description` VARCHAR(200) NULL,
    `dateReclamation` DATETIME(0) NULL,
    `notif` BOOLEAN NULL,
    `idCommande` INTEGER NOT NULL,

    UNIQUE INDEX `idCommande`(`idCommande`),
    PRIMARY KEY (`idReclamation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reponse` (
    `idReponse` INTEGER NOT NULL,
    `titre` VARCHAR(200) NULL,
    `description` VARCHAR(200) NULL,
    `dateReponse` DATETIME(0) NULL,
    `notif` BOOLEAN NULL,
    `idReclamation` INTEGER NOT NULL,
    `idAC` INTEGER NOT NULL,

    UNIQUE INDEX `idReclamation`(`idReclamation`),
    INDEX `idAC`(`idAC`),
    PRIMARY KEY (`idReponse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sadm` (
    `idSADM` INTEGER NOT NULL,
    `nomSADM` VARCHAR(200) NULL,
    `prenomSADM` VARCHAR(200) NULL,
    `emailSADM` VARCHAR(200) NULL,
    `telephoneSADM` VARCHAR(200) NULL,
    `motDePasseSADM` VARCHAR(200) NULL,

    PRIMARY KEY (`idSADM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tache` (
    `idTache` INTEGER NOT NULL,
    `dateDebut` DATETIME(0) NULL,
    `dateFin` DATETIME(0) NULL,
    `etat` VARCHAR(50) NULL,
    `notif` BOOLEAN NULL,
    `idDistributeur` INTEGER NOT NULL,
    `idAM` INTEGER NULL,

    INDEX `idAM`(`idAM`),
    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idTache`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vol` (
    `idVol` INTEGER NOT NULL,
    `dateVol` DATETIME(0) NULL,
    `description` VARCHAR(200) NULL,
    `notif` BOOLEAN NULL,
    `idDistributeur` INTEGER NOT NULL,

    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idVol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reclamationauto` (
    `idReclamationAuto` INTEGER NOT NULL,
    `dateReclamationAuto` DATETIME(0) NULL,
    `description` VARCHAR(200) NULL,
    `idCommande` INTEGER NOT NULL,

    UNIQUE INDEX `idCommande`(`idCommande`),
    PRIMARY KEY (`idReclamationAuto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
