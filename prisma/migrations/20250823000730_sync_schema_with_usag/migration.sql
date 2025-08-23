-- DropForeignKey
ALTER TABLE "public"."Billing" DROP CONSTRAINT "Billing_projectId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Billing" ADD CONSTRAINT "Billing_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
