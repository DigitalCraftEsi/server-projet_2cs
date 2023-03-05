CREATE TABLE Consumer(
   idConsumer INT,
   lastNameConsumer VARCHAR(200),
   firstnameConsumer VARCHAR(200),
   emailConsumer VARCHAR(200),
   phoneConsumer VARCHAR(200),
   passwordConsumer VARCHAR(200),
   PRIMARY KEY(idConsumer)
);

CREATE TABLE SADM(
   idSADM INT,
   lastNameSADM VARCHAR(200),
   firstNameSADM VARCHAR(200),
   emailSADM VARCHAR(200),
   phoneSADM VARCHAR(200),
   PasswordSADM VARCHAR(200),
   PRIMARY KEY(idSADM)
);

CREATE TABLE Client(
   idClient INT,
   nameClient VARCHAR(200),
   emailClient VARCHAR(200),
   phoneClient VARCHAR(200),
   PRIMARY KEY(idClient)
);

CREATE TABLE Advertiser(
   idAdvertiser INT,
   nameAdvertiser VARCHAR(200),
   emailAdvertiser VARCHAR(200),
   phoneAdvertiser VARCHAR(200),
   PRIMARY KEY(idAdvertiser)
);

CREATE TABLE DecisionMaker(
   idDecisionMaker INT,
   lastNameDecisionMaker VARCHAR(200),
   firstNameDecisionMaker VARCHAR(200),
   emailDecisionMaker VARCHAR(200),
   phoneDecisionMaker VARCHAR(200),
   PasswordDecisionMaker VARCHAR(50),
   idClient INT NOT NULL,
   PRIMARY KEY(idDecisionMaker),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Agent_Maitenance(
   idAM INT,
   lastNameAM VARCHAR(200),
   firstNameAM VARCHAR(200),
   emailAM VARCHAR(200),
   phoneAM VARCHAR(200),
   PasswordAM VARCHAR(200),
   idClient INT NOT NULL,
   PRIMARY KEY(idAM),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Agent_Commercial(
   idAC INT,
   lastNameAC VARCHAR(200),
   firstNameAC VARCHAR(200),
   emailAC VARCHAR(200),
   phoneAC VARCHAR(200),
   PasswordAC VARCHAR(200),
   idClient INT NOT NULL,
   PRIMARY KEY(idAC),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE ADM(
   idADM INT,
   lastNameADM_ VARCHAR(200),
   firstNameADM VARCHAR(200),
   emailADM VARCHAR(200),
   phoneADM VARCHAR(200),
   PasswordADM VARCHAR(200),
   idClient INT NOT NULL,
   PRIMARY KEY(idADM),
   UNIQUE(idClient),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE Distributeur(
   idDistributeur INT,
   positionX INT,
   positionY INT,
   address VARCHAR(200),
   state VARCHAR(50),
   unlockCode VARCHAR(200),
   actif LOGICAL,
   idAC INT,
   PRIMARY KEY(idDistributeur),
   FOREIGN KEY(idAC) REFERENCES Agent_Commercial(idAC)
);

CREATE TABLE Order_(
   idOrder INT,
   dateOrder DATETIME,
   idConsumer INT NOT NULL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idOrder),
   FOREIGN KEY(idConsumer) REFERENCES Consumer(idConsumer),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Claim(
   idClaim INT,
   title VARCHAR(200),
   description VARCHAR(200),
   dateClaim DATETIME,
   notif LOGICAL,
   idOrder INT NOT NULL,
   PRIMARY KEY(idClaim),
   UNIQUE(idOrder),
   FOREIGN KEY(idOrder) REFERENCES Order_(idOrder)
);

CREATE TABLE Stole(
   idStole INT,
   dateStole DATETIME,
   description VARCHAR(200),
   notif LOGICAL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idStole),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Invoice(
   idInvoice INT,
   state VARCHAR(50),
   price DOUBLE,
   notif LOGICAL,
   idOrder INT NOT NULL,
   PRIMARY KEY(idInvoice),
   UNIQUE(idOrder),
   FOREIGN KEY(idOrder) REFERENCES Order_(idOrder)
);

CREATE TABLE Answer(
   idAnswer INT,
   title VARCHAR(200),
   description VARCHAR(200),
   dateAnswer DATETIME,
   notif LOGICAL,
   idClaim INT NOT NULL,
   idAC INT NOT NULL,
   PRIMARY KEY(idAnswer),
   UNIQUE(idClaim),
   FOREIGN KEY(idClaim) REFERENCES Claim(idClaim),
   FOREIGN KEY(idAC) REFERENCES Agent_Commercial(idAC)
);

CREATE TABLE Task(
   idTask INT,
   dateBeginning DATETIME,
   dateEnd DATETIME,
   state VARCHAR(50),
   notif LOGICAL,
   idDistributeur INT NOT NULL,
   idAM INT,
   PRIMARY KEY(idTask),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur),
   FOREIGN KEY(idAM) REFERENCES Agent_Maitenance(idAM)
);

CREATE TABLE SuspiciousAction(
   idSuspiciousAction INT,
   dateAction INT,
   description VARCHAR(200),
   notif LOGICAL,
   idDistributeur INT NOT NULL,
   PRIMARY KEY(idSuspiciousAction),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Beverage(
   idBeverage INT,
   nameBeverage VARCHAR(200),
   price DOUBLE,
   idDistributeur INT,
   PRIMARY KEY(idBeverage),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur)
);

CREATE TABLE Advertisement(
   idAnnonce INT,
   sexe VARCHAR(1),
   ageMin INT,
   ageMax INT,
   video VARCHAR(200),
   region VARCHAR(200),
   price DOUBLE,
   dateBeginning DATETIME,
   dateEnd DATETIME,
   periode INT,
   idBeverage INT,
   idAdvertiser INT NOT NULL,
   PRIMARY KEY(idAnnonce),
   FOREIGN KEY(idBeverage) REFERENCES Beverage(idBeverage),
   FOREIGN KEY(idAdvertiser) REFERENCES Advertiser(idAdvertiser)
);

CREATE TABLE BreakDown(
   idBreerakDown INT,
   title VARCHAR(200),
   description VARCHAR(200),
   idTask INT,
   PRIMARY KEY(idBreerakDown),
   UNIQUE(idTask),
   FOREIGN KEY(idTask) REFERENCES Task(idTask)
);

CREATE TABLE Anomaly(
   idAnomaly INT,
   title VARCHAR(200),
   description VARCHAR(200),
   idTask INT,
   PRIMARY KEY(idAnomaly),
   UNIQUE(idTask),
   FOREIGN KEY(idTask) REFERENCES Task(idTask)
);

CREATE TABLE AMDistributeur(
   idDistributeur INT,
   idAM INT,
   PRIMARY KEY(idDistributeur, idAM),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur),
   FOREIGN KEY(idAM) REFERENCES Agent_Maitenance(idAM)
);

CREATE TABLE DistributeurClient(
   idDistributeur INT,
   idClient INT,
   PRIMARY KEY(idDistributeur, idClient),
   FOREIGN KEY(idDistributeur) REFERENCES Distributeur(idDistributeur),
   FOREIGN KEY(idClient) REFERENCES Client(idClient)
);

CREATE TABLE BeverageOrder(
   idBeverage INT,
   idOrder INT,
   Quantite INT,
   PRIMARY KEY(idBeverage, idOrder),
   FOREIGN KEY(idBeverage) REFERENCES Beverage(idBeverage),
   FOREIGN KEY(idOrder) REFERENCES Order_(idOrder)
);
