-- AlterTable
ALTER TABLE `distributeur` ADD COLUMN `actif` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `etat` VARCHAR(50) NULL,
    ADD COLUMN `positionX` INTEGER NULL,
    ADD COLUMN `positionY` INTEGER NULL,
    MODIFY `adresse` VARCHAR(200) NULL,
    MODIFY `codeDeDeverrouillage` VARCHAR(200) NULL;
