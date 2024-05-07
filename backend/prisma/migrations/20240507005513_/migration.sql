/*
  Warnings:

  - You are about to drop the column `eventoId` on the `atividades` table. All the data in the column will be lost.
  - You are about to drop the column `atividadeId` on the `inscricoes` table. All the data in the column will be lost.
  - You are about to drop the column `participanteId` on the `inscricoes` table. All the data in the column will be lost.
  - Added the required column `evento_id` to the `atividades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atividade_id` to the `inscricoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participante_id` to the `inscricoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "atividades" DROP CONSTRAINT "atividades_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "inscricoes" DROP CONSTRAINT "inscricoes_atividadeId_fkey";

-- DropForeignKey
ALTER TABLE "inscricoes" DROP CONSTRAINT "inscricoes_participanteId_fkey";

-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "eventoId",
ADD COLUMN     "evento_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "inscricoes" DROP COLUMN "atividadeId",
DROP COLUMN "participanteId",
ADD COLUMN     "atividade_id" TEXT NOT NULL,
ADD COLUMN     "participante_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_participante_id_fkey" FOREIGN KEY ("participante_id") REFERENCES "participantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
