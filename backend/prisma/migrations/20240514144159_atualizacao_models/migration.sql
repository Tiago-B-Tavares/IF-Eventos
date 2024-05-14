/*
  Warnings:

  - You are about to drop the column `dataInscricao` on the `inscricoes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `inscricoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "inscricoes" DROP COLUMN "dataInscricao",
DROP COLUMN "status";
