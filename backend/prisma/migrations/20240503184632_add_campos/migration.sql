/*
  Warnings:

  - Added the required column `idade` to the `participantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participantes" ADD COLUMN     "idade" INTEGER NOT NULL;
