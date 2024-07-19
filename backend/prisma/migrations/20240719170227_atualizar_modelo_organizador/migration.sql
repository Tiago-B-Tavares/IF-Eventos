/*
  Warnings:

  - The primary key for the `evento_organizador` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "atividades" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "evento_organizador" DROP CONSTRAINT "evento_organizador_pkey",
ADD CONSTRAINT "evento_organizador_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "eventos" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "inscricoes" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "organizadores" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "participantes" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "atividade_organizadores" (
    "id" TEXT NOT NULL,
    "organizador_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,

    CONSTRAINT "atividade_organizadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "atividade_organizadores" ADD CONSTRAINT "atividade_organizadores_organizador_id_fkey" FOREIGN KEY ("organizador_id") REFERENCES "organizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade_organizadores" ADD CONSTRAINT "atividade_organizadores_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
