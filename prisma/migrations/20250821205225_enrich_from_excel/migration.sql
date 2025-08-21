-- CreateEnum
CREATE TYPE "public"."ProjectStatusEnum" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "status" "public"."ProjectStatusEnum" NOT NULL DEFAULT 'PLANNED';
