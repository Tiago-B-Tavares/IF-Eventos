-- DropForeignKey
ALTER TABLE "atividade_responsaveis" DROP CONSTRAINT "atividade_responsaveis_responsavel_id_fkey";

-- AddForeignKey
ALTER TABLE "atividade_responsaveis" ADD CONSTRAINT "atividade_responsaveis_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "responsaveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
