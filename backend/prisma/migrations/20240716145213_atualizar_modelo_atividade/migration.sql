/*
  Warnings:

  - Added the required column `evento_id` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "evento_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
