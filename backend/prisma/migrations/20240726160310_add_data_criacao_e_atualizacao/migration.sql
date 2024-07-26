/*
  Warnings:

  - Added the required column `updatedAt` to the `atividade_organizadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `atividade_responsaveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `evento_organizador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `responsaveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividade_organizadores" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "atividade_responsaveis" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "evento_organizador" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "responsaveis" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
