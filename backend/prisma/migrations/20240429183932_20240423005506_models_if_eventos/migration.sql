/*
  Warnings:

  - You are about to drop the column `descricao` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `vagas` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `eventoId` on the `inscricoes` table. All the data in the column will be lost.
  - Added the required column `banner` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atividadeId` to the `inscricoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inscricoes" DROP CONSTRAINT "inscricoes_eventoId_fkey";

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "descricao",
DROP COLUMN "localizacao",
DROP COLUMN "vagas",
ADD COLUMN     "banner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "inscricoes" DROP COLUMN "eventoId",
ADD COLUMN     "atividadeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "atividades" (
    "id" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "vagas" INTEGER NOT NULL,
    "banner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "atividades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
