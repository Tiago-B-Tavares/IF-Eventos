/*
  Warnings:

  - You are about to drop the `eventos_organizadores` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `googleId` on table `organizadores` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "eventos_organizadores" DROP CONSTRAINT "eventos_organizadores_evento_id_fkey";

-- DropForeignKey
ALTER TABLE "eventos_organizadores" DROP CONSTRAINT "eventos_organizadores_organizador_id_fkey";

-- AlterTable
ALTER TABLE "organizadores" ALTER COLUMN "googleId" SET NOT NULL;

-- DropTable
DROP TABLE "eventos_organizadores";

-- CreateTable
CREATE TABLE "evento_organizador" (
    "organizador_id" TEXT NOT NULL,
    "evento_id" TEXT NOT NULL,

    CONSTRAINT "evento_organizador_pkey" PRIMARY KEY ("organizador_id","evento_id")
);

-- AddForeignKey
ALTER TABLE "evento_organizador" ADD CONSTRAINT "evento_organizador_organizador_id_fkey" FOREIGN KEY ("organizador_id") REFERENCES "organizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_organizador" ADD CONSTRAINT "evento_organizador_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
