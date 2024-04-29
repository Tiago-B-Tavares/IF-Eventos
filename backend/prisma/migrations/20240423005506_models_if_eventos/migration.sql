-- CreateTable
CREATE TABLE
    "organizadores" (
        "id" TEXT NOT NULL,
        "nome" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "senha" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "organizadores_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "eventos" (
        "id" TEXT NOT NULL,
        "data" TIMESTAMP(3) NOT NULL,
        "horario" TIMESTAMP(3) NOT NULL,
        "localizacao" TEXT NOT NULL,
        "descricao" TEXT NOT NULL,
        "vagas" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "participantes" (
        "id" TEXT NOT NULL,
        "nome" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "senha" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "participantes_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "inscricoes" (
        "id" TEXT NOT NULL,
        "dataInscricao" TIMESTAMP(3) NOT NULL,
        "status" BOOLEAN NOT NULL,
        "eventoId" TEXT NOT NULL,
        "participanteId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "inscricoes_pkey" PRIMARY KEY ("id")
    );

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_id_fkey" FOREIGN KEY ("id") REFERENCES "organizadores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;