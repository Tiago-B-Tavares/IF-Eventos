/*
  Warnings:

  - Added the required column `responsavel` to the `atividades` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sexo` on the `participantes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "sexo" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "colaboradores" TEXT[],
ADD COLUMN     "responsavel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "participantes" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "sexo" NOT NULL;
