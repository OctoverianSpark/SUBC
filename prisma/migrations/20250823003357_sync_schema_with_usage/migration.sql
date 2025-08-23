/*
  Warnings:

  - You are about to drop the column `endDate` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Bonding` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `EmployeeClassification` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `EmployeeClassification` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Bonding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Bonding" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."EmployeeClassification" DROP COLUMN "endDate",
DROP COLUMN "startDate";
