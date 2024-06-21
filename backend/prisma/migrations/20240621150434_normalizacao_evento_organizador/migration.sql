/*
  Warnings:

  - You are about to drop the column `organizador_id` on the `eventos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_organizador_id_fkey";

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "organizador_id";

-- AlterTable
ALTER TABLE "organizadores" ADD COLUMN     "googleId" TEXT;

-- CreateTable
CREATE TABLE "eventos_organizadores" (
    "id" TEXT NOT NULL,
    "organizador_id" TEXT NOT NULL,
    "evento_id" TEXT NOT NULL,

    CONSTRAINT "eventos_organizadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "eventos_organizadores" ADD CONSTRAINT "eventos_organizadores_organizador_id_fkey" FOREIGN KEY ("organizador_id") REFERENCES "organizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_organizadores" ADD CONSTRAINT "eventos_organizadores_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
