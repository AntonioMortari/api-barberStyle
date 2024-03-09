/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `Root` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Root" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Root" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Root";
DROP TABLE "Root";
ALTER TABLE "new_Root" RENAME TO "Root";
CREATE UNIQUE INDEX "Root_email_key" ON "Root"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
