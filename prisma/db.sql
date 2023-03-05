CREATE TABLE Consommateur(
   idConsommateur INT,
   nomConsommateur VARCHAR(200),
   prenomConsommateur VARCHAR(200),
   emailConsommateur VARCHAR(200),
   telephoneConsommateur VARCHAR(200),
   motDePasseConsommateur VARCHAR(200),
   PRIMARY KEY(idConsommateur)
);

CREATE TABLE SADM(
   idSADM INT,
   nomSADM VARCHAR(200),
   prenomSADM VARCHAR(200),
   emailSADM VARCHAR(200),
   telephoneSADM VARCHAR(200),
   motDePasseSADM VARCHAR(200),
   PRIMARY KEY(idSADM)
);

CREATE TABLE Client(
   idClient INT,
   nomClient VARCHAR(200),
   emailClient VARCHAR(200),
   telephoneClient VARCHAR(200),
   PRIMARY KEY(idClient)
);

CREATE TABLE Annonceur(
   idAnnonceur INT,
   nomAnnonceur VARCHAR(200),
   emailAnnonceur VARCHAR(200),
   telephoneAnnonceur VARCHAR(200),
   PRIMARY KEY(idAnnonceur)
);

CREATE TABLE Decideur(
   idDecideur INT,
   nomDecideur VARCHAR(200),
   prenomDecideur VARCHAR(200),
   emailDecideur VARCHAR(200),
   telephoneDecideur VARCHAR(200),
   motDePasseDecideur VARCHAR(50),
   idClient INT NOT NULL,
   PRIMARY KEY(idDecideur),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Agent_Maitenance(
   idAM INT,
   nomAM VARCHAR(200),
   prenomAM VARCHAR(200),
   emailAM VARCHAR(200),
   telephoneAM VARCHAR(200),
   motDePasseAM VARCHAR(200),
   idClient INT NOT NULL,
   PRIMARY KEY(idAM),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Agent_Commerciale(
   idAC INT,
   nomAc VARCHAR(200),
   prenomAC VARCHAR(200),
   emailAC VARCHAR(200),
   telephoneAC VARCHAR(200),
   motDePasseAC VARCHAR(200),
   idClient INT NOT NULL,
   PRIMARY KEY(idAC),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE ADM(
   idADM INT,
   nomADM_ VARCHAR(200),
   prenomADM VARCHAR(200),
   emailADM VARCHAR(200),
   telephoneADM VARCHAR(200),
   motDePasseADM VARCHAR(200),
   idClient INT NOT NULL,
   PRIMARY KEY(idADM),
   UNIQUE(idClient),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Distributeur(
   idDistributeur INT,
   positionX INT,
   positionY INT,
   adresse VARCHAR(200),
   etat VARCHAR(50),
   codeDeDeverrouillage_ VARCHAR(200),
   actif BOOLEAN,
   idClient INT,
   idAC INT,
   PRIMARY KEY(idDistributeur),
   FOREIGN KEY(idClient) REFERENCES Client(idClient),
   FOREIGN KEY(idAC) REFERENCES Agent_Commerciale(idAC)
);

CREATE TABLE Commande(
   idCommande INT,
   dateCommande DATETIME,
   idConsommateur INT NOT NULL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idCommande),
   FOREIGN KEY(idConsommateur) REFERENCES Consommateur(idConsommateur),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Reclamation(
   idReclamation INT,
   titre VARCHAR(200),
   description VARCHAR(200),
   dateReclamation DATETIME,
   notif BOOLEAN,
   idCommande INT NOT NULL,
   PRIMARY KEY(idReclamation),
   UNIQUE(idCommande),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);

CREATE TABLE Vol(
   idVol INT,
   dateVol DATETIME,
   description VARCHAR(200),
   notif BOOLEAN,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idVol),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Facture(
   idFacture INT,
   etat VARCHAR(50),
   prix DOUBLE,
   notif BOOLEAN,
   idCommande INT NOT NULL,
   PRIMARY KEY(idFacture),
   UNIQUE(idCommande),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);

CREATE TABLE Reponse(
   idReponse INT,
   titre VARCHAR(200),
   description VARCHAR(200),
   dateReponse DATETIME,
   notif BOOLEAN,
   idReclamation INT NOT NULL,
   idAC INT NOT NULL,
   PRIMARY KEY(idReponse),
   UNIQUE(idReclamation),
   FOREIGN KEY(idReclamation) REFERENCES Reclamation(idReclamation),
   FOREIGN KEY(idAC) REFERENCES Agent_Commerciale(idAC)
);

CREATE TABLE Tache(
   idTache INT,
   dateDebut DATETIME,
   dateFin DATETIME,
   etat VARCHAR(50),
   notif BOOLEAN,
   idDistributeur INT NOT NULL,
   idAM INT,
   PRIMARY KEY(idTache),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur),
   FOREIGN KEY(idAM) REFERENCES Agent_Maitenance(idAM)
);

CREATE TABLE ActionSuspecte(
   idActionSuspecte INT,
   dateAction INT,
   description VARCHAR(200),
   notif BOOLEAN,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idActionSuspecte),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE ReclamationAuto(
   idReclamationAuto INT,
   dateReclamationAuto DATETIME,
   description VARCHAR(200),
   idCommande INT NOT NULL,
   PRIMARY KEY(idReclamationAuto),
   UNIQUE(idCommande),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);

CREATE TABLE Boisson(
   idBoisson INT,
   idDistributeur INT,
   nomBoisson VARCHAR(200),
   tarif DOUBLE,
   idDistributeur_1 INT,
   PRIMARY KEY(idBoisson, idDistributeur),
   FOREIGN KEY(idDistributeur_1) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE AnnoncePublicitaire(
   idAnnonce INT,
   sexe VARCHAR(1),
   ageMin INT,
   ageMax INT,
   video VARCHAR(200),
   region VARCHAR(200),
   prix DOUBLE,
   dateDebut DATETIME,
   dateFin DATETIME,
   periode INT,
   idBoisson INT,
   idDistributeur INT,
   idAnnonceur INT NOT NULL,
   PRIMARY KEY(idAnnonce),
   FOREIGN KEY(idBoisson, idDistributeur) REFERENCES Boisson(idBoisson, idDistributeur),
   FOREIGN KEY(idAnnonceur) REFERENCES Annonceur(idAnnonceur)
);

CREATE TABLE Panne(
   idPanne INT,
   titre VARCHAR(200),
   description VARCHAR(200),
   idTache INT,
   PRIMARY KEY(idPanne),
   UNIQUE(idTache),
   FOREIGN KEY(idTache) REFERENCES Tache(idTache)
);

CREATE TABLE Anomalie(
   idAnomalie INT,
   titre VARCHAR(200),
   description VARCHAR(200),
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
   FOREIGN KEY(idAM) REFERENCES Agent_Maitenance(idAM)
);

CREATE TABLE BoissonCommande(
   idBoisson INT,
   idDistributeur INT,
   idCommande INT,
   Quantite INT,
   PRIMARY KEY(idBoisson, idDistributeur, idCommande),
   FOREIGN KEY(idBoisson, idDistributeur) REFERENCES Boisson(idBoisson, idDistributeur),
   FOREIGN KEY(idCommande) REFERENCES Commande(idCommande)
);
