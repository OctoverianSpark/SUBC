-- CreateEnum
CREATE TYPE "public"."ProjectRole" AS ENUM ('WORKER', 'SUPERVISOR', 'MANAGER');

-- CreateTable
CREATE TABLE "public"."EmployeeProjectAssignment" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "role" "public"."ProjectRole" NOT NULL DEFAULT 'WORKER',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeProjectAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProjectAssignment_employeeId_projectId_key" ON "public"."EmployeeProjectAssignment"("employeeId", "projectId");

-- AddForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" ADD CONSTRAINT "EmployeeProjectAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeProjectAssignment" ADD CONSTRAINT "EmployeeProjectAssignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
