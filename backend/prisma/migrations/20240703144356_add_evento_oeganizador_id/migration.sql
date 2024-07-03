/*
  Warnings:

  - Changed the type of `vagas` on the `atividades` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `id` to the `evento_organizador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "vagas",
ADD COLUMN     "vagas" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "evento_organizador" ADD COLUMN     "id" TEXT NOT NULL;
