/*
  Warnings:

  - You are about to drop the column `eventoId` on the `atividades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "atividades" DROP CONSTRAINT "atividades_eventoId_fkey";

-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "eventoId";
