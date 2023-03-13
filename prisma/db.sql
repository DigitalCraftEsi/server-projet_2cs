CREATE TABLE Consommateur(
   idConsommateur INT AUTO_INCREMENT,
   nomConsommateur VARCHAR(200) NOT NULL,
   prenomConsommateur VARCHAR(200) NOT NULL,
   emailConsommateur VARCHAR(200) NOT NULL,
   telephoneConsommateur VARCHAR(200),
   motDePasseConsommateur VARCHAR(200) NOT NULL,
   UNIQUE(emailConsommateur),
   PRIMARY KEY(idConsommateur)
);

CREATE TABLE SADM(
   idSADM INT AUTO_INCREMENT,
   nomSADM VARCHAR(200) NOT NULL,
   prenomSADM VARCHAR(200) NOT NULL,
   emailSADM VARCHAR(200) NOT NULL,
   telephoneSADM VARCHAR(200),
   motDePasseSADM VARCHAR(200) NOT NULL,
   UNIQUE(emailSADM),
   PRIMARY KEY(idSADM)
);

CREATE TABLE Client(
   idClient INT AUTO_INCREMENT,
   nomClient VARCHAR(200) NOT NULL,
   emailClient VARCHAR(200) NOT NULL,
   telephoneClient VARCHAR(200),
   UNIQUE(emailClient),
   PRIMARY KEY(idClient)
);

CREATE TABLE Annonceur(
   idAnnonceur INT AUTO_INCREMENT,
   nomAnnonceur VARCHAR(200) NOT NULL,
   emailAnnonceur VARCHAR(200) NOT NULL,
   telephoneAnnonceur VARCHAR(200),
   UNIQUE(emailAnnonceur),
   PRIMARY KEY(idAnnonceur)
);

CREATE TABLE Decideur(
   idDecideur INT AUTO_INCREMENT,
   nomDecideur VARCHAR(200) NOT NULL,
   prenomDecideur VARCHAR(200) NOT NULL,
   emailDecideur VARCHAR(200) NOT NULL,
   telephoneDecideur VARCHAR(200),
   motDePasseDecideur VARCHAR(200) NOT NULL,
   idClient INT NOT NULL,
   UNIQUE(emailDecideur),
   PRIMARY KEY(idDecideur),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE AM(
   idAM INT AUTO_INCREMENT,
   nomAM VARCHAR(200)NOT NULL,
   prenomAM VARCHAR(200) NOT NULL,
   emailAM VARCHAR(200) NOT NULL,
   telephoneAM VARCHAR(200),
   motDePasseAM VARCHAR(200) NOT NULL,
   idClient INT NOT NULL,
   UNIQUE(emailAM),
   PRIMARY KEY(idAM),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE AC(
   idAC INT AUTO_INCREMENT,
   nomAc VARCHAR(200) NOT NULL,
   prenomAC VARCHAR(200) NOT NULL,
   emailAC VARCHAR(200) NOT NULL,
   telephoneAC VARCHAR(200),
   motDePasseAC VARCHAR(200) NOT NULL,
   idClient INT NOT NULL,
   UNIQUE(emailAC),
   PRIMARY KEY(idAC),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE ADM(
   idADM INT AUTO_INCREMENT,
   nomADM VARCHAR(200) NOT NULL,
   prenomADM VARCHAR(200) NOT NULL,
   emailADM VARCHAR(200) NOT NULL,
   telephoneADM VARCHAR(200),
   motDePasseADM VARCHAR(200) NOT NULL,
   idClient INT NOT NULL,
   UNIQUE(idClient),
   UNIQUE(emailADM),
   PRIMARY KEY(idADM)
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Distributeur(
   idDistributeur INT AUTO_INCREMENT,
   adresse VARCHAR(200) NOT NULL,
   codeDeDeverrouillage VARCHAR(200) NOT NULL,
   idClient INT,
   idAC INT,
   PRIMARY KEY(idDistributeur),
   FOREIGN KEY(idClient) REFERENCES Client(idClient),
   FOREIGN KEY(idAC) REFERENCES AC(idAC)
);

CREATE TABLE Commande(
   idCommande INT AUTO_INCREMENT,
   dateCommande DATETIME  NOT NULL,
   idConsommateur INT NOT NULL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idCommande),
   FOREIGN KEY(idConsommateur) REFERENCES Consommateur(idConsommateur),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Reclamation(
   idReclamation INT AUTO_INCREMENT,
   titre VARCHAR(200) NOT NULL,
   description VARCHAR(200) NOT NULL,
   dateReclamation DATETIME NOT NULL,
   notif BOOLEAN NOT NULL,
   idCommande INT NOT NULL,
   PRIMARY KEY(idReclamation),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);

CREATE TABLE Vol(
   idVol INT AUTO_INCREMENT,
   dateVol DATETIME NOT NULL,
   description VARCHAR(200) NOT NULL,
   notif BOOLEAN NOT NULL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idVol),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Facture(
   idFacture INT AUTO_INCREMENT,
   etat VARCHAR(50) NOT NULL,
   prix DOUBLE NOT NULL,
   notif BOOLEAN NOT NULL,
   idCommande INT NOT NULL,
   PRIMARY KEY(idFacture),
   UNIQUE(idCommande),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);

CREATE TABLE Reponse(
   idReponse INT AUTO_INCREMENT,
   titre VARCHAR(200)  NOT NULL,
   description VARCHAR(200) NOT NULL,
   dateReponse DATETIME NOT NULL,
   notif BOOLEAN NOT NULL,
   idReclamation INT NOT NULL,
   idAC INT NOT NULL,
   PRIMARY KEY(idReponse),
   UNIQUE(idReclamation),
   FOREIGN KEY(idReclamation) REFERENCES Reclamation(idReclamation),
   FOREIGN KEY(idAC) REFERENCES AC(idAC)
);

CREATE TABLE Tache(
   idTache INT AUTO_INCREMENT,
   dateDebut DATETIME NOT NULL,
   dateFin DATETIME NOT NULL,
   etat VARCHAR(50) NOT NULL,
   notif BOOLEAN NOT NULL,
   idDistributeur INT NOT NULL,
   idAM INT,
   PRIMARY KEY(idTache),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur),
   FOREIGN KEY(idAM) REFERENCES AM(idAM)
);

CREATE TABLE ActionSuspecte(
   idActionSuspecte INT AUTO_INCREMENT,
   dateAction INT NOT NULL,
   description VARCHAR(200) NOT NULL,
   notif BOOLEAN NOT NULL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idActionSuspecte),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE ReclamationAuto(
   idReclamationAuto INT AUTO_INCREMENT,
   dateReclamationAuto DATETIME NOT NULL,
   description VARCHAR(200) NOT NULL,
   idCommande INT NOT NULL,
   PRIMARY KEY(idReclamationAuto),
   UNIQUE(idCommande),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);

CREATE TABLE Boisson(

   idBoisson INT AUTO_INCREMENT,
   idDistributeur INT NOT NULL,
   nomBoisson VARCHAR(200) NOT NULL,
   tarif DOUBLE NOT NULL,
   PRIMARY KEY(idBoisson, idDistributeur)
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE AnnoncePublicitaire(
   idAnnonce INT AUTO_INCREMENT,
   sexe VARCHAR(50) NOT NULL,
   ageMin INT,
   ageMax INT,
   video VARCHAR(200),
   region VARCHAR(200),
   prix DOUBLE NOT NULL,
   dateDebut DATETIME NOT NULL,
   dateFin DATETIME NOT NULL,
   periode INT,
   idBoisson INT,
   idDistributeur INT,
   idAnnonceur INT NOT NULL,
   PRIMARY KEY(idAnnonce),
   FOREIGN KEY(idBoisson) REFERENCES Boisson(idBoisson),
   FOREIGN KEY(idAnnonceur) REFERENCES Annonceur(idAnnonceur)
);

CREATE TABLE Panne(
   idPanne INT AUTO_INCREMENT,
   titre VARCHAR(200) NOT NULL,
   description VARCHAR(200) NOT NULL,
   idTache INT,
   PRIMARY KEY(idPanne),
   UNIQUE(idTache),
   FOREIGN KEY(idTache) REFERENCES Tache(idTache)
);

CREATE TABLE Anomalie(
   idAnomalie INT AUTO_INCREMENT,
   titre VARCHAR(200) NOT NULL,
   description VARCHAR(200) NOT NULL,
   idTache INT,
   PRIMARY KEY(idAnomalie),
   UNIQUE(idTache),
   FOREIGN KEY(idTache) REFERENCES Tache(idTache)
);

CREATE TABLE AMDistributeur(
   idDistributeur INT,
   idAM INT,
   PRIMARY KEY(idDistributeur, idAM),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur),
   FOREIGN KEY(idAM) REFERENCES AM(idAM)
);

CREATE TABLE BoissonCommande(
   idBoisson INT,
   idDistributeur INT,
   idCommande INT,
   Quantite INT,
   PRIMARY KEY(idBoisson, idCommande),
   FOREIGN KEY(idBoisson) REFERENCES Boisson(idBoisson),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);