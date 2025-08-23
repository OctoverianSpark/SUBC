/*
  Warnings:

  - The values [PENDING,IN_TRANSIT,DELIVERED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dueDate` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `issuedAt` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredAt` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `quantityReceived` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `classificationId` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `estimatorId` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `orderDate` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `jobNumber` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Bonding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Classification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyTimeEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Insurance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `License` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaterialRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyTimecard` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `period` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialOrderId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestedById` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDate` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classificationId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EmployeeClassification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `MaterialOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `MaterialOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EmployeeLevel" AS ENUM ('APPRENTICE', 'JOURNEYMAN', 'FOREMAN', 'SUPERINTENDENT');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."OrderStatus_new" AS ENUM ('SUBMITTED', 'APPROVED', 'ORDERED', 'SCHEDULED', 'DELIVERED_TO_OFFICE', 'DELIVERED_TO_SITE');
ALTER TABLE "public"."MaterialOrder" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."MaterialOrder" ALTER COLUMN "status" TYPE "public"."OrderStatus_new" USING ("status"::text::"public"."OrderStatus_new");
ALTER TYPE "public"."OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "public"."OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "public"."MaterialOrder" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Bonding" DROP CONSTRAINT "Bonding_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeClassification" DROP CONSTRAINT "EmployeeClassification_classificationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeClassification" DROP CONSTRAINT "EmployeeClassification_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Estimate" DROP CONSTRAINT "Estimate_estimatorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Estimate" DROP CONSTRAINT "Estimate_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Insurance" DROP CONSTRAINT "Insurance_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialOrder" DROP CONSTRAINT "MaterialOrder_requestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialRequest" DROP CONSTRAINT "MaterialRequest_approvedBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialRequest" DROP CONSTRAINT "MaterialRequest_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialRequest" DROP CONSTRAINT "MaterialRequest_requestedBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_managerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."Billing" DROP COLUMN "dueDate",
DROP COLUMN "issuedAt",
DROP COLUMN "paid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "period" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Delivery" DROP COLUMN "deliveredAt",
DROP COLUMN "orderId",
DROP COLUMN "quantityReceived",
DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "driverId" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER,
ADD COLUMN     "materialOrderId" INTEGER NOT NULL,
ADD COLUMN     "requestedById" INTEGER NOT NULL,
ADD COLUMN     "scheduledDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Employee" DROP COLUMN "address",
DROP COLUMN "city",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "classificationId" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "hireDate" TIMESTAMP(3),
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "public"."EmployeeClassification" DROP COLUMN "classificationId",
DROP COLUMN "employeeId",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Estimate" DROP COLUMN "estimatorId",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."MaterialOrder" DROP COLUMN "orderDate",
DROP COLUMN "requestId",
DROP COLUMN "supplier",
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "officeETA" TIMESTAMP(3),
ADD COLUMN     "orderedAt" TIMESTAMP(3),
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "siteETA" TIMESTAMP(3),
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "jobNumber",
DROP COLUMN "managerId",
DROP COLUMN "status",
ADD COLUMN     "client" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "active",
DROP COLUMN "name",
ALTER COLUMN "role" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."Bonding";

-- DropTable
DROP TABLE "public"."Classification";

-- DropTable
DROP TABLE "public"."DailyTimeEntry";

-- DropTable
DROP TABLE "public"."Document";

-- DropTable
DROP TABLE "public"."Insurance";

-- DropTable
DROP TABLE "public"."License";

-- DropTable
DROP TABLE "public"."MaterialRequest";

-- DropTable
DROP TABLE "public"."Payroll";

-- DropTable
DROP TABLE "public"."Task";

-- DropTable
DROP TABLE "public"."WeeklyTimecard";

-- DropEnum
DROP TYPE "public"."DeliveryStatus";

-- DropEnum
DROP TYPE "public"."EstimateStatus";

-- DropEnum
DROP TYPE "public"."MaterialStatus";

-- DropEnum
DROP TYPE "public"."ProjectStatus";

-- CreateTable
CREATE TABLE "public"."EmployeeLevelModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EmployeeLevelModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contract" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "bondingDeadline" TIMESTAMP(3),
    "insuranceDeadline" TIMESTAMP(3),
    "licenseDeadline" TIMESTAMP(3),
    "payrollDeadline" TIMESTAMP(3),
    "materialsDeadline" TIMESTAMP(3),

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CertifiedPayroll" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CertifiedPayroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_projectId_key" ON "public"."Contract"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "public"."Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "public"."Employee"("email");

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "public"."EmployeeClassification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "public"."EmployeeLevelModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estimate" ADD CONSTRAINT "Estimate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertifiedPayroll" ADD CONSTRAINT "CertifiedPayroll_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialOrder" ADD CONSTRAINT "MaterialOrder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_materialOrderId_fkey" FOREIGN KEY ("materialOrderId") REFERENCES "public"."MaterialOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
