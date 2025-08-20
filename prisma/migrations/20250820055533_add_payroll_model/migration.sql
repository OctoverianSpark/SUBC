-- DropForeignKey
ALTER TABLE "public"."Bonding" DROP CONSTRAINT "Bonding_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Insurance" DROP CONSTRAINT "Insurance_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_projectId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Bonding" ADD CONSTRAINT "Bonding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Insurance" ADD CONSTRAINT "Insurance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."License" ADD CONSTRAINT "License_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
