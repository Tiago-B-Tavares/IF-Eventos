/*
  Warnings:

  - Added the required column `nome` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventos" ADD COLUMN     "nome" TEXT NOT NULL;
