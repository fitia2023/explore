-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "date_de_naissance" DATETIME NOT NULL,
    "tel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Destination" (
    "id_destination" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pays" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avis_global" REAL NOT NULL,
    "image1" TEXT NOT NULL,
    "image2" TEXT NOT NULL,
    "image3" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id_commentaire" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_commentaire" DATETIME NOT NULL,
    "image_commentaire" TEXT,
    "utilisateurId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    CONSTRAINT "Commentaire_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Commentaire_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activite" (
    "id_activite" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_activite" TEXT NOT NULL,
    "description_activite" TEXT NOT NULL,
    "image_activite" TEXT,
    "destinationId" INTEGER NOT NULL,
    CONSTRAINT "Activite_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id_contact" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date_envoie" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CheckListe_Item" (
    "id_checkliste_item" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_item" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Formalite_administrative_Item" (
    "id_formalite_administrative_item" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripition_formalite" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "fait_par" (
    "utilisateurId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,

    PRIMARY KEY ("utilisateurId", "destinationId"),
    CONSTRAINT "fait_par_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "fait_par_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contient" (
    "destinationId" INTEGER NOT NULL,
    "checklistItemId" INTEGER NOT NULL,

    PRIMARY KEY ("destinationId", "checklistItemId"),
    CONSTRAINT "contient_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contient_checklistItemId_fkey" FOREIGN KEY ("checklistItemId") REFERENCES "CheckListe_Item" ("id_checkliste_item") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "requiert" (
    "destinationId" INTEGER NOT NULL,
    "formaliteItemId" INTEGER NOT NULL,

    PRIMARY KEY ("destinationId", "formaliteItemId"),
    CONSTRAINT "requiert_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "requiert_formaliteItemId_fkey" FOREIGN KEY ("formaliteItemId") REFERENCES "Formalite_administrative_Item" ("id_formalite_administrative_item") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cocher" (
    "utilisateurId" INTEGER NOT NULL,
    "checklistItemId" INTEGER NOT NULL,
    "date_cocher" DATETIME NOT NULL,

    PRIMARY KEY ("utilisateurId", "checklistItemId"),
    CONSTRAINT "cocher_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur" ("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cocher_checklistItemId_fkey" FOREIGN KEY ("checklistItemId") REFERENCES "CheckListe_Item" ("id_checkliste_item") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_mail_key" ON "Utilisateur"("mail");
