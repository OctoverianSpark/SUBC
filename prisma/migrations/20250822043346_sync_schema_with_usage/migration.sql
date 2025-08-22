/*
  Warnings:

  - The values [SUBMITTED,APPROVED,SCHEDULED,DELIVERED_TO_OFFICE,DELIVERED_TO_SITE] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `invoiceNumber` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `DailyTimeEntry` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `materialOrderId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `requestedById` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `classificationId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `hireDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `terminationDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `statusRefId` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Insurance` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `approvedAt` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `officeETA` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderedAt` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `siteETA` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `MaterialOrder` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `weekEnd` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `weekStart` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `client` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectStatusRefId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `assignedAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `completionDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `totalHours` on the `WeeklyTimecard` table. All the data in the column will be lost.
  - You are about to drop the column `weekStart` on the `WeeklyTimecard` table. All the data in the column will be lost.
  - You are about to drop the `CertifiedPayroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeClassHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeLevelModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeProjectAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstimateStatusRef` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstimatorExternal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthlyBilling` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectStatusRef` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Bonding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Bonding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Bonding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Bonding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityReceived` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classificationId` to the `EmployeeClassification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `EmployeeClassification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `EmployeeClassification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverage` to the `Insurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Insurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyNumber` to the `Insurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Insurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Insurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuedBy` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validFrom` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validTo` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestId` to the `MaterialOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `MaterialOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductions` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grossPay` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netPay` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodEnd` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodStart` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalHours` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `weekStartDate` to the `WeeklyTimecard` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DeliveryStatus" AS ENUM ('PENDING', 'RECEIVED', 'PARTIAL', 'DAMAGED');

-- CreateEnum
CREATE TYPE "public"."MaterialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."EstimateStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'AWARDED', 'REJECTED', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."OrderStatus_new" AS ENUM ('PENDING', 'ORDERED', 'IN_TRANSIT', 'DELIVERED');
ALTER TABLE "public"."MaterialOrder" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."MaterialOrder" ALTER COLUMN "status" TYPE "public"."OrderStatus_new" USING ("status"::text::"public"."OrderStatus_new");
ALTER TYPE "public"."OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "public"."OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "public"."MaterialOrder" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Billing" DROP CONSTRAINT "Billing_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CertifiedPayroll" DROP CONSTRAINT "CertifiedPayroll_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_driverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_materialOrderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_requestedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_classificationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_levelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeClassHistory" DROP CONSTRAINT "EmployeeClassHistory_classificationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeClassHistory" DROP CONSTRAINT "EmployeeClassHistory_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" DROP CONSTRAINT "EmployeeProjectAssignment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" DROP CONSTRAINT "EmployeeProjectAssignment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Estimate" DROP CONSTRAINT "Estimate_statusRefId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EstimatorExternal" DROP CONSTRAINT "EstimatorExternal_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialOrder" DROP CONSTRAINT "MaterialOrder_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MonthlyBilling" DROP CONSTRAINT "MonthlyBilling_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payroll" DROP CONSTRAINT "Payroll_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_projectStatusRefId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_projectId_fkey";

-- DropIndex
DROP INDEX "public"."Bonding_projectId_key";

-- DropIndex
DROP INDEX "public"."Employee_email_key";

-- DropIndex
DROP INDEX "public"."EmployeeClassification_name_key";

-- DropIndex
DROP INDEX "public"."Insurance_projectId_key";

-- DropIndex
DROP INDEX "public"."License_projectId_key";

-- DropIndex
DROP INDEX "public"."Project_jobNumber_key";

-- AlterTable
ALTER TABLE "public"."Billing" DROP COLUMN "invoiceNumber",
DROP COLUMN "notes",
DROP COLUMN "period",
ADD COLUMN     "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Bonding" DROP COLUMN "deadline",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."DailyTimeEntry" DROP COLUMN "notes";

-- AlterTable
ALTER TABLE "public"."Delivery" DROP COLUMN "createdAt",
DROP COLUMN "driverId",
DROP COLUMN "employeeId",
DROP COLUMN "materialOrderId",
DROP COLUMN "requestedById",
DROP COLUMN "scheduledDate",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "vehicleId",
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "quantityReceived" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "public"."DeliveryStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Document" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "public"."Employee" DROP COLUMN "active",
DROP COLUMN "classificationId",
DROP COLUMN "email",
DROP COLUMN "hireDate",
DROP COLUMN "levelId",
DROP COLUMN "phone",
DROP COLUMN "state",
DROP COLUMN "terminationDate",
DROP COLUMN "userId",
DROP COLUMN "zip";

-- AlterTable
ALTER TABLE "public"."EmployeeClassification" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "classificationId" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Estimate" DROP COLUMN "description",
DROP COLUMN "notes",
DROP COLUMN "statusRefId",
DROP COLUMN "status",
ADD COLUMN     "status" "public"."EstimateStatus" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Insurance" DROP COLUMN "deadline",
ADD COLUMN     "coverage" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "policyNumber" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."License" DROP COLUMN "deadline",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "issuedBy" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "validFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "validTo" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."MaterialOrder" DROP COLUMN "approvedAt",
DROP COLUMN "description",
DROP COLUMN "officeETA",
DROP COLUMN "orderedAt",
DROP COLUMN "projectId",
DROP COLUMN "siteETA",
DROP COLUMN "submittedAt",
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "requestId" INTEGER NOT NULL,
ADD COLUMN     "supplier" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Payroll" DROP COLUMN "amount",
DROP COLUMN "projectId",
DROP COLUMN "weekEnd",
DROP COLUMN "weekStart",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deductions" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "grossPay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "netPay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "periodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalHours" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "client",
DROP COLUMN "projectStatusRefId",
DROP COLUMN "userId",
ADD COLUMN     "managerId" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "assignedAt",
DROP COLUMN "completionDate",
DROP COLUMN "notes",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."WeeklyTimecard" DROP COLUMN "totalHours",
DROP COLUMN "weekStart",
ADD COLUMN     "weekStartDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."CertifiedPayroll";

-- DropTable
DROP TABLE "public"."Contract";

-- DropTable
DROP TABLE "public"."EmployeeClassHistory";

-- DropTable
DROP TABLE "public"."EmployeeLevelModel";

-- DropTable
DROP TABLE "public"."EmployeeProjectAssignment";

-- DropTable
DROP TABLE "public"."EstimateStatusRef";

-- DropTable
DROP TABLE "public"."EstimatorExternal";

-- DropTable
DROP TABLE "public"."MonthlyBilling";

-- DropTable
DROP TABLE "public"."ProjectStatusRef";

-- DropTable
DROP TABLE "public"."Vehicle";

-- DropEnum
DROP TYPE "public"."EmployeeLevel";

-- DropEnum
DROP TYPE "public"."ProjectRole";

-- DropEnum
DROP TYPE "public"."ProjectStatusEnum";

-- CreateTable
CREATE TABLE "public"."Classification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "craftCode" TEXT NOT NULL,
    "payRate" DOUBLE PRECISION NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MaterialRequest" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "status" "public"."MaterialStatus" NOT NULL DEFAULT 'PENDING',
    "requestedBy" INTEGER NOT NULL,
    "approvedBy" INTEGER,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "MaterialRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Billing" ADD CONSTRAINT "Billing_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeClassification" ADD CONSTRAINT "EmployeeClassification_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "public"."Classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeClassification" ADD CONSTRAINT "EmployeeClassification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialRequest" ADD CONSTRAINT "MaterialRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialRequest" ADD CONSTRAINT "MaterialRequest_requestedBy_fkey" FOREIGN KEY ("requestedBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialRequest" ADD CONSTRAINT "MaterialRequest_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialOrder" ADD CONSTRAINT "MaterialOrder_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."MaterialRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."MaterialOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
