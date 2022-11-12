-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Publication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Publication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Publication" ("authorId", "id", "text", "title") SELECT "authorId", "id", "text", "title" FROM "Publication";
DROP TABLE "Publication";
ALTER TABLE "new_Publication" RENAME TO "Publication";
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "publicationId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("authorId", "id", "publicationId", "text") SELECT "authorId", "id", "publicationId", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
