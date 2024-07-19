/*
  Warnings:

  - You are about to drop the column `data` on the `eventos` table. All the data in the column will be lost.
  - Added the required column `dataFim` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "data",
ADD COLUMN     "dataFim" TEXT NOT NULL,
ADD COLUMN     "dataInicio" TEXT NOT NULL;
