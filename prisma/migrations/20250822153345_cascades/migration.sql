-- DropForeignKey
ALTER TABLE "public"."Delivery" DROP CONSTRAINT "Delivery_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialOrder" DROP CONSTRAINT "MaterialOrder_requestId_fkey";

-- AddForeignKey
ALTER TABLE "public"."MaterialOrder" ADD CONSTRAINT "MaterialOrder_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."MaterialRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."MaterialOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
