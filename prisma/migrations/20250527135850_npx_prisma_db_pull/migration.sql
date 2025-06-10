/*
  Warnings:

  - Added the required column `categorie` to the `CheckListe_Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN "token" TEXT;

-- CreateTable
CREATE TABLE "EcoSuggestion" (
    "id_eco_suggestion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,
    CONSTRAINT "EcoSuggestion_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CheckListe_Item" (
    "id_checkliste_item" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_item" TEXT NOT NULL,
    "description" TEXT,
    "categorie" TEXT NOT NULL,
    "requis" BOOLEAN NOT NULL DEFAULT false,
    "eco_friendly" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_CheckListe_Item" ("id_checkliste_item", "nom_item") SELECT "id_checkliste_item", "nom_item" FROM "CheckListe_Item";
DROP TABLE "CheckListe_Item";
ALTER TABLE "new_CheckListe_Item" RENAME TO "CheckListe_Item";
CREATE TABLE "new_Destination" (
    "id_destination" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT NOT NULL,
    "avis_global" REAL NOT NULL DEFAULT 0,
    "eco_rating" INTEGER NOT NULL DEFAULT 1,
    "climat" TEXT,
    "meilleure_periode" TEXT,
    "tags" TEXT,
    "image1" TEXT NOT NULL,
    "image2" TEXT,
    "image3" TEXT
);
INSERT INTO "new_Destination" ("avis_global", "description", "id_destination", "image1", "image2", "image3", "pays", "region") SELECT "avis_global", "description", "id_destination", "image1", "image2", "image3", "pays", "region" FROM "Destination";
DROP TABLE "Destination";
ALTER TABLE "new_Destination" RENAME TO "Destination";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
