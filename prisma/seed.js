import {
  PrismaClient,
  Role,
  ProjectStatus,
  EstimateStatus,
  MaterialStatus,
  OrderStatus,
  DeliveryStatus
} from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  console.log('🌱 Starting seed...')

  // --- USERS ---
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashed_admin_pass', // 🔒 en real usar bcrypt
      role: Role.ADMIN
    }
  })

  const manager = await prisma.user.create({
    data: {
      name: 'Project Manager',
      email: 'pm@example.com',
      password: 'hashed_pm_pass',
      role: Role.PROJECT_MANAGER
    }
  })

  const estimator = await prisma.user.create({
    data: {
      name: 'Estimator User',
      email: 'estimator@example.com',
      password: 'hashed_est_pass',
      role: Role.ESTIMATOR
    }
  })

  const regularUser = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: 'hashed_user_pass',
      role: Role.USER
    }
  })

  // --- PROJECT ---
  const project = await prisma.project.create({
    data: {
      jobNumber: 'JOB-001',
      name: 'Main Building Construction',
      status: ProjectStatus.IN_PROGRESS,
      managerId: manager.id
    }
  })

  // --- TASKS ---
  await prisma.task.createMany({
    data: [
      {
        name: 'Site Preparation',
        projectId: project.id,
        assignedToId: manager.id,
        dueDate: new Date('2025-09-01')
      },
      {
        name: 'Foundation Work',
        projectId: project.id,
        assignedToId: regularUser.id,
        dueDate: new Date('2025-09-10')
      }
    ]
  })

  // --- ESTIMATES ---
  await prisma.estimate.create({
    data: {
      projectId: project.id,
      estimatorId: estimator.id,
      amount: 150000,
      status: EstimateStatus.SUBMITTED
    }
  })

  // --- BILLING ---
  await prisma.billing.create({
    data: {
      projectId: project.id,
      amount: 50000,
      dueDate: new Date('2025-09-30')
    }
  })

  // --- EMPLOYEE & CLASSIFICATION ---
  const employee = await prisma.employee.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      city: 'Medellín'
    }
  })

  const classification = await prisma.classification.create({
    data: {
      name: 'Electrician',
      craftCode: 'ELEC-001',
      payRate: 25,
      effectiveDate: new Date('2025-01-01')
    }
  })

  await prisma.employeeClassification.create({
    data: {
      employeeId: employee.id,
      classificationId: classification.id,
      startDate: new Date('2025-02-01')
    }
  })

  // --- TIME ENTRIES ---
  await prisma.dailyTimeEntry.create({
    data: {
      employeeId: employee.id,
      projectId: project.id,
      workDate: new Date('2025-08-20'),
      hoursWorked: 8
    }
  })

  await prisma.weeklyTimecard.create({
    data: {
      employeeId: employee.id,
      projectId: project.id,
      weekStartDate: new Date('2025-08-18'),
      notes: 'Worked on foundation'
    }
  })

  // --- PAYROLL ---
  await prisma.payroll.create({
    data: {
      employeeId: employee.id,
      periodStart: new Date('2025-08-01'),
      periodEnd: new Date('2025-08-15'),
      totalHours: 80,
      grossPay: 2000,
      deductions: 200,
      netPay: 1800
    }
  })

  // --- BONDING / INSURANCE / LICENSE ---
  await prisma.bonding.create({
    data: {
      projectId: project.id,
      provider: 'Surety Inc.',
      amount: 10000,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31')
    }
  })

  await prisma.insurance.create({
    data: {
      projectId: project.id,
      provider: 'Insurance Co.',
      policyNumber: 'INS-12345',
      coverage: 'General Liability',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31')
    }
  })

  await prisma.license.create({
    data: {
      projectId: project.id,
      type: 'Construction License',
      number: 'LIC-2025-001',
      issuedBy: 'City Authority',
      validFrom: new Date('2025-01-01'),
      validTo: new Date('2025-12-31')
    }
  })

  // --- DOCUMENT ---
  await prisma.document.create({
    data: {
      projectId: project.id,
      name: 'Blueprints',
      url: 'https://example.com/docs/blueprints.pdf'
    }
  })

  // --- MATERIAL REQUEST / ORDER / DELIVERY ---
  const materialRequest = await prisma.materialRequest.create({
    data: {
      projectId: project.id,
      material: 'Concrete',
      quantity: 50,
      status: MaterialStatus.APPROVED,
      requestedBy: regularUser.id,
      approvedBy: manager.id,
      approvedAt: new Date('2025-08-15')
    }
  })

  const order = await prisma.materialOrder.create({
    data: {
      requestId: materialRequest.id,
      supplier: 'Cement Supplier',
      status: OrderStatus.ORDERED
    }
  })

  await prisma.delivery.create({
    data: {
      orderId: order.id,
      deliveredAt: new Date('2025-08-19'),
      quantityReceived: 50,
      status: DeliveryStatus.RECEIVED
    }
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
