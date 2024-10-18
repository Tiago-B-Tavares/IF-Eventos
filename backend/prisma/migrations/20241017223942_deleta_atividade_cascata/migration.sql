-- DropForeignKey
ALTER TABLE "inscricoes" DROP CONSTRAINT "inscricoes_atividade_id_fkey";

-- DropForeignKey
ALTER TABLE "inscricoes" DROP CONSTRAINT "inscricoes_participante_id_fkey";

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_participante_id_fkey" FOREIGN KEY ("participante_id") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
