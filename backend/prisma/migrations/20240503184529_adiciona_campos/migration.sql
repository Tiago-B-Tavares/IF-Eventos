/*
  Warnings:

  - Added the required column `avaliacao` to the `atividades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventoId` to the `atividades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `participantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "avaliacao" INTEGER NOT NULL,
ADD COLUMN     "eventoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "participantes" ADD COLUMN     "sexo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
