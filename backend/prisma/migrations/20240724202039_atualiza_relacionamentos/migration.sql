-- DropForeignKey
ALTER TABLE "atividades" DROP CONSTRAINT "atividades_evento_id_fkey";

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
