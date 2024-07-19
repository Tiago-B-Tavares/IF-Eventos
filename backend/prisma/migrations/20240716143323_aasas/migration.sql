/*
  Warnings:

  - You are about to alter the column `ch` on the `atividades` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "atividades" ALTER COLUMN "ch" SET DATA TYPE INTEGER;
