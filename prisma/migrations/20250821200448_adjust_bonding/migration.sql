/*
  Warnings:

  - You are about to drop the column `amount` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `coverage` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `policyNumber` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `issuedBy` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `License` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Bonding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `Insurance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `License` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobNumber]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobNumber` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bonding" DROP COLUMN "amount",
DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "provider",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "deadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Document" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Insurance" DROP COLUMN "coverage",
DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "policyNumber",
DROP COLUMN "provider",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "deadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."License" DROP COLUMN "createdAt",
DROP COLUMN "issuedBy",
DROP COLUMN "number",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
DROP COLUMN "validFrom",
DROP COLUMN "validTo",
ADD COLUMN     "deadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "jobNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Payroll" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bonding_projectId_key" ON "public"."Bonding"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_projectId_key" ON "public"."Insurance"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "License_projectId_key" ON "public"."License"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_jobNumber_key" ON "public"."Project"("jobNumber");

-- AddForeignKey
ALTER TABLE "public"."Payroll" ADD CONSTRAINT "Payroll_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
