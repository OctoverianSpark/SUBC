-- AlterTable
ALTER TABLE "public"."Billing" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "invoiceNumber" TEXT,
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "terminationDate" TIMESTAMP(3),
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "public"."Estimate" ADD COLUMN     "estimatorId" INTEGER,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "statusRefId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "jobNumber" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "statusCode" TEXT,
ADD COLUMN     "statusRefId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "assignedToId" INTEGER,
    "assignedAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "status" TEXT,
    "completionDate" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyTimeEntry" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "workDate" TIMESTAMP(3) NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,
    "overtimeHours" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "DailyTimeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeeklyTimecard" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "totalHours" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "WeeklyTimecard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthlyBilling" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MonthlyBilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmployeeClassHistory" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "classificationId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "reason" TEXT,

    CONSTRAINT "EmployeeClassHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectStatusRef" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProjectStatusRef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EstimateStatusRef" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EstimateStatusRef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EstimatorExternal" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "userId" INTEGER,

    CONSTRAINT "EstimatorExternal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyBilling_projectId_year_month_key" ON "public"."MonthlyBilling"("projectId", "year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStatusRef_code_key" ON "public"."ProjectStatusRef"("code");

-- CreateIndex
CREATE UNIQUE INDEX "EstimateStatusRef_code_key" ON "public"."EstimateStatusRef"("code");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorExternal_email_key" ON "public"."EstimatorExternal"("email");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_statusRefId_fkey" FOREIGN KEY ("statusRefId") REFERENCES "public"."ProjectStatusRef"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estimate" ADD CONSTRAINT "Estimate_estimatorId_fkey" FOREIGN KEY ("estimatorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Estimate" ADD CONSTRAINT "Estimate_statusRefId_fkey" FOREIGN KEY ("statusRefId") REFERENCES "public"."EstimateStatusRef"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyTimeEntry" ADD CONSTRAINT "DailyTimeEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyTimecard" ADD CONSTRAINT "WeeklyTimecard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthlyBilling" ADD CONSTRAINT "MonthlyBilling_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeClassHistory" ADD CONSTRAINT "EmployeeClassHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmployeeClassHistory" ADD CONSTRAINT "EmployeeClassHistory_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "public"."EmployeeClassification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EstimatorExternal" ADD CONSTRAINT "EstimatorExternal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
