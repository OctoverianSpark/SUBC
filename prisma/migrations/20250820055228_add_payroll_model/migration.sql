-- CreateEnum
CREATE TYPE "public"."DeliveryStatus" AS ENUM ('PENDING', 'RECEIVED', 'PARTIAL', 'DAMAGED');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'ORDERED', 'IN_TRANSIT', 'DELIVERED');

-- CreateEnum
CREATE TYPE "public"."MaterialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Role" ADD VALUE 'OWNER';
ALTER TYPE "public"."Role" ADD VALUE 'ESTIMATOR';
ALTER TYPE "public"."Role" ADD VALUE 'BILLING';
ALTER TYPE "public"."Role" ADD VALUE 'PAYROLL';

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

-- CreateTable
CREATE TABLE "public"."MaterialOrder" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "supplier" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "MaterialOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Delivery" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "deliveredAt" TIMESTAMP(3),
    "quantityReceived" DOUBLE PRECISION NOT NULL,
    "status" "public"."DeliveryStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

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
