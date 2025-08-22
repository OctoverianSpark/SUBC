/*
  Warnings:

  - You are about to drop the column `active` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Employee" DROP COLUMN "active";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
