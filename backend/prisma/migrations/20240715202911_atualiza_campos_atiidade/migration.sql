/*
  Warnings:

  - Added the required column `ch` to the `atividades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concomitante` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "ch" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "concomitante" BOOLEAN NOT NULL;
