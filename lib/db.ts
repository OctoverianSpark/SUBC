import { PrismaClient, Role } from '@prisma/client'

export const prisma = new PrismaClient()

// ======================= USERS =======================
export const userDb = {
  findAll: (config={}) => prisma.user.findMany(config),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  create: (data: { name?: string; email: string; password: string; role?: Role }) =>
    prisma.user.create({ data }),
  update: (id: number, data: any) => prisma.user.update({ where: { id }, data }),
  delete: (id: number) => prisma.user.delete({ where: { id } })
}

// ======================= PROJECTS =======================
export const projectDb = {
  findAll: (config = {}) => prisma.project.findMany(config),
  findById: (id: number) => prisma.project.findUnique({ where: { id } }),
  findWithRelations: (id: number) =>
    prisma.project.findUnique({
      where: { id },
      include: {
        bondings: true,
        insurances: true,
        licenses: true,
        documents: true,
        estimates: true,
        billings: true,
        MaterialRequest: { include: { MaterialOrder: true } },
        manager: true
      }
    }),
  create: (data: any) => prisma.project.create({ data }),
  update: (id: number, data: any) => prisma.project.update({ where: { id }, data }),
  delete: (id: number) => prisma.project.delete({ where: { id } })
}

// ======================= TASKS =======================
export const taskDb = {
  findAll: () => prisma.task.findMany(),
  findById: (id: number) => prisma.task.findUnique({ where: { id } }),
  create: (data: any) => prisma.task.create({ data }),
  update: (id: number, data: any) => prisma.task.update({ where: { id }, data }),
  delete: (id: number) => prisma.task.delete({ where: { id } })
}

// ======================= ESTIMATES =======================
export const estimateDb = {
  findAll: () => prisma.estimate.findMany(),
  findById: (id: number) => prisma.estimate.findUnique({ where: { id } }),
  findByProjectId: (projectId: number) =>
    prisma.estimate.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }),
  create: (data: any) => prisma.estimate.create({ data }),
  update: (id: number, data: any) => prisma.estimate.update({ where: { id }, data }),
  delete: (id: number) => prisma.estimate.delete({ where: { id } })
}

// ======================= BILLING =======================
type CreateBillingInput = {
  projectId: number
  amount: number
  dueDate: Date | null
  paid: boolean
  invoiceNumber: string
}
export const billingDb = {
  findAll: () => prisma.billing.findMany({
    include: { project: {select: {name: true}}}
  }),
  findById: (id: number) => prisma.billing.findUnique({ where: { id },include: { project: {select: {name: true}}} }),
  findByProjectId: (projectId: number) =>
    prisma.billing.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }),
    create: (input: CreateBillingInput) =>
    prisma.billing.create({
      data: {
        projectId: input.projectId,
        amount: input.amount,
        dueDate: input.dueDate,
        paid: input.paid,
        invoiceNumber: input.invoiceNumber
      }
    }),
  update: (id: number, data: any) => prisma.billing.update({ where: { id }, data }),
  delete: (id: number) => prisma.billing.delete({ where: { id } })
}

// ======================= EMPLOYEES =======================

type CreateEmployeeInput = {
  firstName: string
  lastName: string
  address: string | null
  city: string | null
  classificationIds: number[]
}

export const employeeDb = {
  findAll: () => prisma.employee.findMany(),
  findById: (id: number) => prisma.employee.findUnique({ where: { id } }),

  // ⬇️ AJUSTADO: transforma classificationIds -> classifications.connect
  create: async (input: CreateEmployeeInput) => {
    const { classificationIds, ...rest } = input
    const ids = Array.from(new Set(classificationIds)).filter(Number.isInteger)

    return prisma.employee.create({
      data: {
        ...rest,
        ...(ids.length
          ? { classifications: { connect: ids.map(id => ({ id })) } }
          : {})
      },
      include: { classifications: true }
    })
  },

  update: async (
    id: number,
    input: Partial<Omit<CreateEmployeeInput, 'classificationIds'>> & { classificationIds?: number[] }
  ) => {
    const ids = input.classificationIds
      ? Array.from(new Set(input.classificationIds)).filter(Number.isInteger)
      : undefined

    return prisma.employee.update({
      where: { id },
      data: {
        ...input,
        ...(ids
          ? { classifications: { set: ids.map(id => ({ id })) } } // reemplaza el set completo
          : {})
      },
      include: { classifications: true }
    })
  },

  delete: (id: number) => prisma.employee.delete({ where: { id } })
}
// ======================= CLASSIFICATIONS =======================
export const employeeClassificationDb = {
  findAll: () => prisma.employeeClassification.findMany(),
  findById: (id: number) => prisma.employeeClassification.findUnique({ where: { id } }),
  create: (data: any) => prisma.employeeClassification.create({ data }),
  update: (id: number, data: any) => prisma.employeeClassification.update({ where: { id }, data }),
  delete: (id: number) => prisma.employeeClassification.delete({ where: { id } })
}
export const classificationDb = {
  findAll: () => prisma.classification.findMany(),
  findById: (id: number) => prisma.classification.findUnique({ where: { id } }),
  create: (data: any) => prisma.classification.create({ data }),
  update: (id: number, data: any) => prisma.classification.update({ where: { id }, data }),
  delete: (id: number) => prisma.classification.delete({ where: { id } })
}

// ======================= DAILY TIME ENTRY =======================
export const dailyTimeEntryDb = {
  findAll: () => prisma.dailyTimeEntry.findMany(),
  findById: (id: number) => prisma.dailyTimeEntry.findUnique({ where: { id } }),
  create: (data: any) => prisma.dailyTimeEntry.create({ data }),
  update: (id: number, data: any) => prisma.dailyTimeEntry.update({ where: { id }, data }),
  delete: (id: number) => prisma.dailyTimeEntry.delete({ where: { id } })
}

// ======================= WEEKLY TIMECARD =======================
export const weeklyTimecardDb = {
  findAll: () => prisma.weeklyTimecard.findMany(),
  findById: (id: number) => prisma.weeklyTimecard.findUnique({ where: { id } }),
  create: (data: any) => prisma.weeklyTimecard.create({ data }),
  update: (id: number, data: any) => prisma.weeklyTimecard.update({ where: { id }, data }),
  delete: (id: number) => prisma.weeklyTimecard.delete({ where: { id } })
}

// ======================= PAYROLL =======================
export const payrollDb = {
  findAll: () =>
    prisma.payroll.findMany({
      include: { employee: true }
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

// ======================= BONDING =======================
export const bondingDb = {
  findAll: () => prisma.bonding.findMany(),
  findById: (id: number) => prisma.bonding.findUnique({ where: { id } }),
  findByProjectId: (projectId: number) =>
    prisma.bonding.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }),
  create: (data: any) => prisma.bonding.create({ data }),
  update: (id: number, data: any) => prisma.bonding.update({ where: { id }, data }),
  delete: (id: number) => prisma.bonding.delete({ where: { id } })
}

// ======================= INSURANCE =======================
export const insuranceDb = {
  findAll: () => prisma.insurance.findMany(),
  findById: (id: number) => prisma.insurance.findUnique({ where: { id } }),
  findByProjectId: (projectId: number) =>
    prisma.insurance.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }),
  create: (data: any) => prisma.insurance.create({ data }),
  update: (id: number, data: any) => prisma.insurance.update({ where: { id }, data }),
  delete: (id: number) => prisma.insurance.delete({ where: { id } })
}

// ======================= LICENSE =======================
export const licenseDb = {
  findAll: () => prisma.license.findMany(),
  findById: (id: number) => prisma.license.findUnique({ where: { id } }),
  findByProjectId: (projectId: number) =>
    prisma.license.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }),
  create: (data: any) => prisma.license.create({ data }),
  update: (id: number, data: any) => prisma.license.update({ where: { id }, data }),
  delete: (id: number) => prisma.license.delete({ where: { id } })
}

// ======================= DOCUMENTS =======================
export const documentDb = {
  findAll: () => prisma.document.findMany(),
  findById: (id: number) => prisma.document.findUnique({ where: { id } }),
  findByProjectId: (projectId: number) =>
    prisma.document.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }),
  create: (data: any) => prisma.document.create({ data }),
  update: (id: number, data: any) => prisma.document.update({ where: { id }, data }),
  delete: (id: number) => prisma.document.delete({ where: { id } })
}

// ======================= MATERIAL REQUESTS =======================
export const materialRequestDb = {
  findAll: () => prisma.materialRequest.findMany(),
  findById: (id: number) => prisma.materialRequest.findUnique({ where: { id } }),
  findByProjectId: (projectId: number) =>
    prisma.materialRequest.findMany({ 
      where: { projectId }, 
      orderBy: { requestedAt: 'desc' },
      include: { MaterialOrder: true }
    }),
  create: (data: any) => prisma.materialRequest.create({ data }),
  update: (id: number, data: any) =>
    prisma.materialRequest.update({ where: { id }, data }),
  delete: (id: number) => prisma.materialRequest.delete({ where: { id } })
}

// ======================= MATERIAL ORDERS =======================
export const materialOrderDb = {
  findAll: () => prisma.materialOrder.findMany({ include: { materialRequest: true } }),
  findById: (id: number) => prisma.materialOrder.findUnique({ 
    where: { id },
    include: { materialRequest: true }
  }),
  findByProjectId: (projectId: number) =>
    prisma.materialOrder.findMany({ 
      where: { materialRequest: { projectId } }, 
      orderBy: { orderDate: 'desc' },
      include: { 
        materialRequest: {
          include: {
            requester: true,
            approver: true
          }
        }
      }
    }),
  create: (data: any) => prisma.materialOrder.create({ 
    data, 
    include: { 
      materialRequest: {
        include: {
          requester: true,
          approver: true
        }
      }
    }
  }),
  update: (id: number, data: any) =>
    prisma.materialOrder.update({ where: { id }, data, include: { materialRequest: true } }),
  delete: (id: number) => prisma.materialOrder.delete({ where: { id } })
}

// ======================= AUTH =======================
export async function validateUser(email: string, password: string) {
  const user = await userDb.findByEmail(email)
  if (!user) return null
  // Comparación simple, reemplazar por hash si es necesario
  if (user.password !== password) return null
  return user
}
