/*
  Warnings:

  - You are about to drop the column `colaboradores` on the `atividades` table. All the data in the column will be lost.
  - You are about to drop the column `responsavel` on the `atividades` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "colaboradores",
DROP COLUMN "responsavel";

-- CreateTable
CREATE TABLE "responsaveis" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "responsaveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividade_responsaveis" (
    "id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "responsavel_id" TEXT NOT NULL,

    CONSTRAINT "atividade_responsaveis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "atividade_responsaveis" ADD CONSTRAINT "atividade_responsaveis_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade_responsaveis" ADD CONSTRAINT "atividade_responsaveis_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
