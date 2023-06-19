-- CreateTable
CREATE TABLE `actionsuspecte` (
    `idActionSuspecte` INTEGER NOT NULL AUTO_INCREMENT,
    `dateAction` INTEGER NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `notif` BOOLEAN NOT NULL,
    `idDistributeur` INTEGER NOT NULL,

    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idActionSuspecte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adm` (
    `idADM` INTEGER NOT NULL AUTO_INCREMENT,
    `nomADM` VARCHAR(200) NOT NULL,
    `prenomADM` VARCHAR(200) NOT NULL,
    `emailADM` VARCHAR(200) NOT NULL,
    `telephoneADM` VARCHAR(200) NULL,
    `motDePasseADM` VARCHAR(200) NOT NULL,
    `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif',
    `idClient` INTEGER NOT NULL,
    `picture` VARCHAR(200) NULL,

    UNIQUE INDEX `emailADM`(`emailADM`),
    PRIMARY KEY (`idADM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `annoncepublicitaire` (
    `idAnnonce` INTEGER NOT NULL AUTO_INCREMENT,
    `sexe` VARCHAR(50) NOT NULL,
    `ageMin` INTEGER NULL,
    `ageMax` INTEGER NULL,
    `video` VARCHAR(200) NULL,
    `region` VARCHAR(200) NULL,
    `dateDebut` DATETIME(0) NOT NULL,
    `dateFin` DATETIME(0) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `idBoisson` INTEGER NULL,
    `idDistributeur` INTEGER NOT NULL,
    `idAnnonceur` INTEGER NOT NULL,

    PRIMARY KEY (`idAnnonce`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `annonceur` (
    `idAnnonceur` INTEGER NOT NULL AUTO_INCREMENT,
    `nomAnnonceur` VARCHAR(200) NOT NULL,
    `emailAnnonceur` VARCHAR(200) NOT NULL,
    `telephoneAnnonceur` VARCHAR(200) NULL,

    UNIQUE INDEX `emailAnnonceur`(`emailAnnonceur`),
    PRIMARY KEY (`idAnnonceur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anomalie` (
    `idAnomalie` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `idTache` INTEGER NULL,

    PRIMARY KEY (`idAnomalie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boisson` (
    `idBoisson` INTEGER NOT NULL AUTO_INCREMENT,
    `nomBoisson` VARCHAR(200) NOT NULL,
    `tarif` DOUBLE NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `image` VARCHAR(191) NULL,
    `eau` DOUBLE NULL,
    `cafe` DOUBLE NULL,
    `lait` DOUBLE NULL,
    `the` DOUBLE NULL,
    `sucre` DOUBLE NULL,
    `idDistributeur` INTEGER NOT NULL,

    PRIMARY KEY (`idBoisson`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boissoncommande` (
    `idBoisson` INTEGER NOT NULL,
    `idCommande` INTEGER NOT NULL,
    `Quantite` INTEGER NOT NULL,

    PRIMARY KEY (`idBoisson`, `idCommande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `idClient` INTEGER NOT NULL AUTO_INCREMENT,
    `nomClient` VARCHAR(200) NOT NULL,
    `emailClient` VARCHAR(200) NOT NULL,
    `telephoneClient` VARCHAR(200) NULL,

    UNIQUE INDEX `emailClient`(`emailClient`),
    PRIMARY KEY (`idClient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commande` (
    `idCommande` INTEGER NOT NULL AUTO_INCREMENT,
    `dateCommande` DATETIME(0) NOT NULL,
    `prix` DOUBLE NULL,
    `idConsommateur` INTEGER NOT NULL,
    `idDistributeur` INTEGER NOT NULL,
    `status` ENUM('enAttente', 'echouee', 'terminee') NOT NULL DEFAULT 'enAttente',

    PRIMARY KEY (`idCommande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consommateur` (
    `idConsommateur` INTEGER NOT NULL AUTO_INCREMENT,
    `nomConsommateur` VARCHAR(200) NOT NULL,
    `prenomConsommateur` VARCHAR(200) NOT NULL,
    `emailConsommateur` VARCHAR(200) NOT NULL,
    `telephoneConsommateur` VARCHAR(200) NULL,
    `motDePasseConsommateur` VARCHAR(200) NOT NULL,
    `picture` VARCHAR(200) NULL,

    UNIQUE INDEX `emailConsommateur`(`emailConsommateur`),
    PRIMARY KEY (`idConsommateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `decideur` (
    `idDecideur` INTEGER NOT NULL AUTO_INCREMENT,
    `nomDecideur` VARCHAR(200) NOT NULL,
    `prenomDecideur` VARCHAR(200) NOT NULL,
    `emailDecideur` VARCHAR(200) NOT NULL,
    `telephoneDecideur` VARCHAR(200) NULL,
    `motDePasseDecideur` VARCHAR(200) NOT NULL,
    `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif',
    `idClient` INTEGER NOT NULL,
    `picture` VARCHAR(200) NULL,

    UNIQUE INDEX `emailDecideur`(`emailDecideur`),
    PRIMARY KEY (`idDecideur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `distributeur` (
    `idDistributeur` INTEGER NOT NULL AUTO_INCREMENT,
    `adresse` VARCHAR(200) NULL,
    `codeDeDeverrouillage` VARCHAR(200) NULL,
    `longitude` DOUBLE NULL,
    `latitude` DOUBLE NULL,
    `statut` VARCHAR(191) NULL,
    `distuid` VARCHAR(200) NOT NULL,
    `idAM` INTEGER NULL,
    `idClient` INTEGER NULL,

    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idDistributeur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `panne` (
    `idPanne` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `idTache` INTEGER NULL,

    PRIMARY KEY (`idPanne`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reclamation` (
    `idReclamation` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `dateReclamation` DATETIME(0) NOT NULL,
    `notif` BOOLEAN NOT NULL,
    `idCommande` INTEGER NOT NULL,

    INDEX `idCommande`(`idCommande`),
    PRIMARY KEY (`idReclamation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reponse` (
    `idReponse` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `dateReponse` DATETIME(0) NOT NULL,
    `notif` BOOLEAN NOT NULL,
    `idReclamation` INTEGER NOT NULL,
    `idAC` INTEGER NOT NULL,

    UNIQUE INDEX `idReclamation`(`idReclamation`),
    INDEX `idAC`(`idAC`),
    PRIMARY KEY (`idReponse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sadm` (
    `idSADM` INTEGER NOT NULL AUTO_INCREMENT,
    `nomSADM` VARCHAR(200) NOT NULL,
    `prenomSADM` VARCHAR(200) NOT NULL,
    `emailSADM` VARCHAR(200) NOT NULL,
    `telephoneSADM` VARCHAR(200) NULL,
    `motDePasseSADM` VARCHAR(200) NOT NULL,
    `picture` VARCHAR(200) NULL,

    UNIQUE INDEX `emailSADM`(`emailSADM`),
    PRIMARY KEY (`idSADM`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tache` (
    `idTache` INTEGER NOT NULL AUTO_INCREMENT,
    `dateDebut` DATETIME(0) NOT NULL,
    `dateFin` DATETIME(0) NOT NULL,
    `etat` VARCHAR(50) NOT NULL,
    `notif` BOOLEAN NOT NULL,
    `idDistributeur` INTEGER NOT NULL,
    `idAM` INTEGER NULL,

    INDEX `idAM`(`idAM`),
    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idTache`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vol` (
    `idVol` INTEGER NOT NULL AUTO_INCREMENT,
    `dateVol` DATETIME(0) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `notif` BOOLEAN NOT NULL,
    `idDistributeur` INTEGER NOT NULL,

    INDEX `idDistributeur`(`idDistributeur`),
    PRIMARY KEY (`idVol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reclamationauto` (
    `idReclamationAuto` INTEGER NOT NULL AUTO_INCREMENT,
    `dateReclamationAuto` DATETIME(0) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `idCommande` INTEGER NOT NULL,

    UNIQUE INDEX `idCommande`(`idCommande`),
    PRIMARY KEY (`idReclamationAuto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ac` (
    `idAC` INTEGER NOT NULL AUTO_INCREMENT,
    `nomAC` VARCHAR(200) NOT NULL,
    `prenomAC` VARCHAR(200) NOT NULL,
    `emailAC` VARCHAR(200) NOT NULL,
    `telephoneAC` VARCHAR(200) NULL,
    `motDePasseAC` VARCHAR(200) NOT NULL,
    `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif',
    `idClient` INTEGER NOT NULL,
    `picture` VARCHAR(200) NULL,

    UNIQUE INDEX `emailAC`(`emailAC`),
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
    `status` ENUM('actif', 'bannis') NOT NULL DEFAULT 'actif',
    `idClient` INTEGER NOT NULL,
    `picture` VARCHAR(200) NULL,

    UNIQUE INDEX `emailAM`(`emailAM`),
    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idAM`)
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
ALTER TABLE `anomalie` ADD CONSTRAINT `anomalie_idTache_fkey` FOREIGN KEY (`idTache`) REFERENCES `tache`(`idTache`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `panne` ADD CONSTRAINT `panne_idTache_fkey` FOREIGN KEY (`idTache`) REFERENCES `tache`(`idTache`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reclamation` ADD CONSTRAINT `reclamation_idCommande_fkey` FOREIGN KEY (`idCommande`) REFERENCES `commande`(`idCommande`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reponse` ADD CONSTRAINT `reponse_idReclamation_fkey` FOREIGN KEY (`idReclamation`) REFERENCES `reclamation`(`idReclamation`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ac` ADD CONSTRAINT `ac_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am` ADD CONSTRAINT `am_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `client`(`idClient`) ON DELETE RESTRICT ON UPDATE CASCADE;
