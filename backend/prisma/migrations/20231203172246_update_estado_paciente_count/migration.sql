/*
  Warnings:

  - A unique constraint covering the columns `[estado]` on the table `EstadoPacienteCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EstadoPacienteCount_estado_key" ON "EstadoPacienteCount"("estado");
