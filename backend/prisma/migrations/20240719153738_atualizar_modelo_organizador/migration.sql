/*
  Warnings:

  - Added the required column `role` to the `organizadores` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sexo` on the `participantes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ACTIVITY_ADMIN');

-- AlterTable
ALTER TABLE "organizadores" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "participantes" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Sexo" NOT NULL;

-- DropEnum
DROP TYPE "sexo";
