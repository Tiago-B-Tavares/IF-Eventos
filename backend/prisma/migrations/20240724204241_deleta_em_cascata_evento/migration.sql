-- DropForeignKey
ALTER TABLE "atividade_organizadores" DROP CONSTRAINT "atividade_organizadores_atividade_id_fkey";

-- DropForeignKey
ALTER TABLE "atividade_responsaveis" DROP CONSTRAINT "atividade_responsaveis_atividade_id_fkey";

-- AddForeignKey
ALTER TABLE "atividade_organizadores" ADD CONSTRAINT "atividade_organizadores_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade_responsaveis" ADD CONSTRAINT "atividade_responsaveis_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
