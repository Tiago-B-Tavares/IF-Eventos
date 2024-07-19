/*
  Warnings:

  - You are about to drop the column `evento_id` on the `atividades` table. All the data in the column will be lost.
  - Added the required column `eventoId` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "atividades" DROP CONSTRAINT "atividades_evento_id_fkey";

-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "evento_id",
ADD COLUMN     "eventoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
