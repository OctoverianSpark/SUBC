-- DropForeignKey
ALTER TABLE "public"."DailyTimeEntry" DROP CONSTRAINT "DailyTimeEntry_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaterialRequest" DROP CONSTRAINT "MaterialRequest_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WeeklyTimecard" DROP CONSTRAINT "WeeklyTimecard_projectId_fkey";

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialRequest" ADD CONSTRAINT "MaterialRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
