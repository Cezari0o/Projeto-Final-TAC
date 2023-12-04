/*
  Warnings:

  - You are about to drop the column `count` on the `EstadoPacienteCount` table. All the data in the column will be lost.
  - Added the required column `total` to the `EstadoPacienteCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EstadoPacienteCount" DROP COLUMN "count",
ADD COLUMN     "total" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "VacinaNomeCount" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VacinaNomeCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdadePacienteCount" (
    "id" SERIAL NOT NULL,
    "idade" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdadePacienteCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SistemaOrigemCount" (
    "id" SERIAL NOT NULL,
    "sistema" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SistemaOrigemCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SexoCount" (
    "id" SERIAL NOT NULL,
    "sexo" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SexoCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaCount" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriaCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RacaCount" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RacaCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacinaDoseCount" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VacinaDoseCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaisPacienteCount" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaisPacienteCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FabricanteCount" (
    "id" SERIAL NOT NULL,
    "fabricanteNome" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FabricanteCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MunicipioCount" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MunicipioCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VacinaNomeCount_nome_key" ON "VacinaNomeCount"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "IdadePacienteCount_idade_key" ON "IdadePacienteCount"("idade");

-- CreateIndex
CREATE UNIQUE INDEX "SistemaOrigemCount_sistema_key" ON "SistemaOrigemCount"("sistema");

-- CreateIndex
CREATE UNIQUE INDEX "SexoCount_sexo_key" ON "SexoCount"("sexo");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaCount_categoria_key" ON "CategoriaCount"("categoria");

-- CreateIndex
CREATE UNIQUE INDEX "RacaCount_nome_key" ON "RacaCount"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "VacinaDoseCount_descricao_key" ON "VacinaDoseCount"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "PaisPacienteCount_nome_key" ON "PaisPacienteCount"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "FabricanteCount_fabricanteNome_key" ON "FabricanteCount"("fabricanteNome");

-- AddForeignKey
ALTER TABLE "MunicipioCount" ADD CONSTRAINT "MunicipioCount_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
