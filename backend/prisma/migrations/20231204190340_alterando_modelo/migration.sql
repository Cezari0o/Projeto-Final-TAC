/*
  Warnings:

  - You are about to drop the `CategoriaCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstadoPacienteCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FabricanteCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdadePacienteCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaisPacienteCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RacaCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SexoCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SistemaOrigemCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VacinaDoseCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VacinaNomeCount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CategoriaCount";

-- DropTable
DROP TABLE "EstadoPacienteCount";

-- DropTable
DROP TABLE "FabricanteCount";

-- DropTable
DROP TABLE "IdadePacienteCount";

-- DropTable
DROP TABLE "PaisPacienteCount";

-- DropTable
DROP TABLE "RacaCount";

-- DropTable
DROP TABLE "SexoCount";

-- DropTable
DROP TABLE "SistemaOrigemCount";

-- DropTable
DROP TABLE "VacinaDoseCount";

-- DropTable
DROP TABLE "VacinaNomeCount";

-- CreateTable
CREATE TABLE "DataCount" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "itemCategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryCount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataCount_itemName_key" ON "DataCount"("itemName");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryCount_name_key" ON "CategoryCount"("name");

-- AddForeignKey
ALTER TABLE "DataCount" ADD CONSTRAINT "DataCount_itemCategoryId_fkey" FOREIGN KEY ("itemCategoryId") REFERENCES "CategoryCount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
