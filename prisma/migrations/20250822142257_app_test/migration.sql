/*
  Warnings:

  - Added the required column `updatedAt` to the `MaterialOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MaterialOrder" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "expectedDelivery" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orderedAt" TIMESTAMP(3),
ADD COLUMN     "quantity" DOUBLE PRECISION,
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ADD COLUMN     "totalAmount" DOUBLE PRECISION,
ADD COLUMN     "unitPrice" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
