-- DropForeignKey
ALTER TABLE "public"."Billing" DROP CONSTRAINT "Billing_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bonding" DROP CONSTRAINT "Bonding_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CertifiedPayroll" DROP CONSTRAINT "CertifiedPayroll_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_materialOrderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeClassHistory" DROP CONSTRAINT "EmployeeClassHistory_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" DROP CONSTRAINT "EmployeeProjectAssignment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" DROP CONSTRAINT "EmployeeProjectAssignment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Estimate" DROP CONSTRAINT "Estimate_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Insurance" DROP CONSTRAINT "Insurance_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialOrder" DROP CONSTRAINT "MaterialOrder_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MonthlyBilling" DROP CONSTRAINT "MonthlyBilling_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payroll" DROP CONSTRAINT "Payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payroll" DROP CONSTRAINT "Payroll_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "name" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Bonding" ADD CONSTRAINT "Bonding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Insurance" ADD CONSTRAINT "Insurance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."License" ADD CONSTRAINT "License_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payroll" ADD CONSTRAINT "Payroll_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" ADD CONSTRAINT "EmployeeProjectAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" ADD CONSTRAINT "EmployeeProjectAssignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estimate" ADD CONSTRAINT "Estimate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Billing" ADD CONSTRAINT "Billing_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CertifiedPayroll" ADD CONSTRAINT "CertifiedPayroll_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialOrder" ADD CONSTRAINT "MaterialOrder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_materialOrderId_fkey" FOREIGN KEY ("materialOrderId") REFERENCES "public"."MaterialOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthlyBilling" ADD CONSTRAINT "MonthlyBilling_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeClassHistory" ADD CONSTRAINT "EmployeeClassHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
