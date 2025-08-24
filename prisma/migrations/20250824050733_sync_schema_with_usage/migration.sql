/*
  Warnings:

  - You are about to drop the column `bondingId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `licenseId` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `value` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_bondingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_insuranceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_licenseId_fkey";

-- AlterTable
ALTER TABLE "public"."Contract" DROP COLUMN "bondingId",
DROP COLUMN "insuranceId",
DROP COLUMN "licenseId",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
