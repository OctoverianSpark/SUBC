/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNumber]` on the table `Billing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Billing" ALTER COLUMN "invoiceNumber" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Billing_invoiceNumber_key" ON "public"."Billing"("invoiceNumber");
