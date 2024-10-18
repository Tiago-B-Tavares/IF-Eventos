/*
  Warnings:

  - You are about to drop the `atividade_responsaveis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `responsaveis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "atividade_responsaveis" DROP CONSTRAINT "atividade_responsaveis_atividade_id_fkey";

-- DropForeignKey
ALTER TABLE "atividade_responsaveis" DROP CONSTRAINT "atividade_responsaveis_responsavel_id_fkey";

-- DropTable
DROP TABLE "atividade_responsaveis";

-- DropTable
DROP TABLE "responsaveis";
