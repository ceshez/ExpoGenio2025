/*
  Warnings:

  - A unique constraint covering the columns `[userId,path]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Page_path_key";

-- CreateIndex
CREATE UNIQUE INDEX "Page_userId_path_key" ON "public"."Page"("userId", "path");
