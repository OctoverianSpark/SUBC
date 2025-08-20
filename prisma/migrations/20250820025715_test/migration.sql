-- DropForeignKey
ALTER TABLE "public"."Estimate" DROP CONSTRAINT "Estimate_projectId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Estimate" ADD CONSTRAINT "Estimate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
