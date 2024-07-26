-- DropForeignKey
ALTER TABLE "evento_organizador" DROP CONSTRAINT "evento_organizador_evento_id_fkey";

-- AddForeignKey
ALTER TABLE "evento_organizador" ADD CONSTRAINT "evento_organizador_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
