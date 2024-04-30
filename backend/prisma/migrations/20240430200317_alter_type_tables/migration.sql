-- AlterTable
ALTER TABLE "atividades" ALTER COLUMN "horario" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "eventos" ALTER COLUMN "data" SET DATA TYPE TEXT,
ALTER COLUMN "horario" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "inscricoes" ALTER COLUMN "dataInscricao" SET DATA TYPE TEXT;
