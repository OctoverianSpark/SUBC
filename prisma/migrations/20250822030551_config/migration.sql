/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `EmployeeClassification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `EmployeeLevelModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmployeeClassification_name_key" ON "public"."EmployeeClassification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeLevelModel_name_key" ON "public"."EmployeeLevelModel"("name");
