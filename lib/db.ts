import { PrismaClient, Role, ProjectStatus, EstimateStatus } from '@prisma/client'

export const prisma = new PrismaClient()

// --- USER CRUD ---
export const userDb = {
  findAll: () => prisma.user.findMany(),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  create: (data: { name: string, email: string, password: string, role?: Role }) => prisma.user.create({ data }),
  update: (id: number, data: any) => prisma.user.update({ where: { id }, data }),
  delete: (id: number) => prisma.user.delete({ where: { id } })
}

// --- PROJECT CRUD ---
export const projectDb = {
  findAll: () => prisma.project.findMany(),
  findById: (id: number) => prisma.project.findUnique({ where: { id } }),
  create: (data: any) => prisma.project.create({ data }),
  update: (id: number, data: any) => prisma.project.update({ where: { id }, data }),
  delete: (id: number) => prisma.project.delete({ where: { id } })
}

// --- TASK CRUD ---
export const taskDb = {
  findAll: () => prisma.task.findMany(),
  findById: (id: number) => prisma.task.findUnique({ where: { id } }),
  create: (data: any) => prisma.task.create({ data }),
  update: (id: number, data: any) => prisma.task.update({ where: { id }, data }),
  delete: (id: number) => prisma.task.delete({ where: { id } })
}

// --- ESTIMATE CRUD ---
export const estimateDb = {
  findAll: () => prisma.estimate.findMany(),
  findById: (id: number) => prisma.estimate.findUnique({ where: { id } }),
  create: (data: any) => prisma.estimate.create({ data }),
  update: (id: number, data: any) => prisma.estimate.update({ where: { id }, data }),
  delete: (id: number) => prisma.estimate.delete({ where: { id } })
}

// --- BILLING CRUD ---
export const billingDb = {
  findAll: () => prisma.billing.findMany(),
  findById: (id: number) => prisma.billing.findUnique({ where: { id } }),
  create: (data: any) => prisma.billing.create({ data }),
  update: (id: number, data: any) => prisma.billing.update({ where: { id }, data }),
  delete: (id: number) => prisma.billing.delete({ where: { id } })
}

// --- EMPLOYEE CRUD ---
export const employeeDb = {
  findAll: () => prisma.employee.findMany(),
  findById: (id: number) => prisma.employee.findUnique({ where: { id } }),
  create: (data: any) => prisma.employee.create({ data }),
  update: (id: number, data: any) => prisma.employee.update({ where: { id }, data }),
  delete: (id: number) => prisma.employee.delete({ where: { id } })
}

// --- CLASSIFICATION CRUD ---
export const classificationDb = {
  findAll: () => prisma.classification.findMany(),
  findById: (id: number) => prisma.classification.findUnique({ where: { id } }),
  create: (data: any) => prisma.classification.create({ data }),
  update: (id: number, data: any) => prisma.classification.update({ where: { id }, data }),
  delete: (id: number) => prisma.classification.delete({ where: { id } })
}

// --- EMPLOYEE CLASSIFICATION CRUD ---
export const employeeClassificationDb = {
  findAll: () => prisma.employeeClassification.findMany(),
  findById: (id: number) => prisma.employeeClassification.findUnique({ where: { id } }),
  create: (data: any) => prisma.employeeClassification.create({ data }),
  update: (id: number, data: any) => prisma.employeeClassification.update({ where: { id }, data }),
  delete: (id: number) => prisma.employeeClassification.delete({ where: { id } })
}

// --- DAILY TIME ENTRY CRUD ---
export const dailyTimeEntryDb = {
  findAll: () => prisma.dailyTimeEntry.findMany(),
  findById: (id: number) => prisma.dailyTimeEntry.findUnique({ where: { id } }),
  create: (data: any) => prisma.dailyTimeEntry.create({ data }),
  update: (id: number, data: any) => prisma.dailyTimeEntry.update({ where: { id }, data }),
  delete: (id: number) => prisma.dailyTimeEntry.delete({ where: { id } })
}

// --- WEEKLY TIMECARD CRUD ---
export const weeklyTimecardDb = {
  findAll: () => prisma.weeklyTimecard.findMany(),
  findById: (id: number) => prisma.weeklyTimecard.findUnique({ where: { id } }),
  create: (data: any) => prisma.weeklyTimecard.create({ data }),
  update: (id: number, data: any) => prisma.weeklyTimecard.update({ where: { id }, data }),
  delete: (id: number) => prisma.weeklyTimecard.delete({ where: { id } })
}

// --- PAYROLL CRUD ---
export const payrollDb = {
  findAll: () =>
    prisma.payroll.findMany({
      include: { employee: true } // 🔹 Trae siempre el empleado relacionado
    }),
  findById: (id: number) =>
    prisma.payroll.findUnique({
      where: { id },
      include: { employee: true }
    }),
  create: (data: any) =>
    prisma.payroll.create({
      data,
      include: { employee: true }
    }),
  update: (id: number, data: any) =>
    prisma.payroll.update({
      where: { id },
      data,
      include: { employee: true }
    }),
  delete: (id: number) => prisma.payroll.delete({ where: { id } })
}
// --- BONDING CRUD ---
export const bondingDb = {
  findAll: () => prisma.bonding.findMany(),
  findById: (id: number) => prisma.bonding.findUnique({ where: { id } }),
  create: (data: any) => prisma.bonding.create({ data }),
  update: (id: number, data: any) => prisma.bonding.update({ where: { id }, data }),
  delete: (id: number) => prisma.bonding.delete({ where: { id } })
}

// --- INSURANCE CRUD ---
export const insuranceDb = {
  findAll: () => prisma.insurance.findMany(),
  findById: (id: number) => prisma.insurance.findUnique({ where: { id } }),
  create: (data: any) => prisma.insurance.create({ data }),
  update: (id: number, data: any) => prisma.insurance.update({ where: { id }, data }),
  delete: (id: number) => prisma.insurance.delete({ where: { id } })
}

// --- LICENSE CRUD ---
export const licenseDb = {
  findAll: () => prisma.license.findMany(),
  findById: (id: number) => prisma.license.findUnique({ where: { id } }),
  create: (data: any) => prisma.license.create({ data }),
  update: (id: number, data: any) => prisma.license.update({ where: { id }, data }),
  delete: (id: number) => prisma.license.delete({ where: { id } })
}

// --- DOCUMENT CRUD ---
export const documentDb = {
  findAll: () => prisma.document.findMany(),
  findById: (id: number) => prisma.document.findUnique({ where: { id } }),
  create: (data: any) => prisma.document.create({ data }),
  update: (id: number, data: any) => prisma.document.update({ where: { id }, data }),
  delete: (id: number) => prisma.document.delete({ where: { id } })
}

// --- USER AUTH ---
export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null
  // Comparación simple, reemplazar por hash si es necesario
  if (user.password !== password) return null
  return user
}
