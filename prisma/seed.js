import { PrismaClient, Role, OrderStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  console.log('🌱 Starting seed...')

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.delivery.deleteMany()
  await prisma.materialOrder.deleteMany()
  await prisma.license.deleteMany()
  await prisma.insurance.deleteMany()
  await prisma.bonding.deleteMany()
  await prisma.contract.deleteMany()
  await prisma.project.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.user.deleteMany()

  // Create Users with names
  const projectManager1 = await prisma.user.upsert({
    where: { email: 'tom.wilson@company.com' },
    update: {},
    create: {
      email: 'tom.wilson@company.com',
      password: 'password123',
      role: Role.PROJECT_MANAGER
    }
  })

  const projectManager2 = await prisma.user.upsert({
    where: { email: 'laura.martinez@company.com' },
    update: {},
    create: {
      email: 'laura.martinez@company.com',
      password: 'password123',
      role: Role.PROJECT_MANAGER
    }
  })

  const estimator = await prisma.user.upsert({
    where: { email: 'carlos.rodriguez@company.com' },
    update: {},
    create: {
      email: 'carlos.rodriguez@company.com',
      password: 'password123',
      role: Role.ESTIMATOR
    }
  })

  const billingUser = await prisma.user.upsert({
    where: { email: 'susan.clark@company.com' },
    update: {},
    create: {
      email: 'susan.clark@company.com',
      password: 'password123',
      role: Role.BILLING
    }
  })

  const driver1 = await prisma.user.upsert({
    where: { email: 'driver1@example.com' },
    update: {},
    create: {
      email: 'driver1@example.com',
      password: 'password123',
      role: Role.USER
    }
  })

  const driver2 = await prisma.user.upsert({
    where: { email: 'driver2@example.com' },
    update: {},
    create: {
      email: 'driver2@example.com',
      password: 'password123',
      role: Role.USER
    }
  })

  const driver3 = await prisma.user.upsert({
    where: { email: 'driver3@example.com' },
    update: {},
    create: {
      email: 'driver3@example.com',
      password: 'password123',
      role: Role.USER
    }
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      password: 'password123',
      role: Role.ADMIN
    }
  })

  console.log('👥 Created users')

  // Create Estimate Status References
  const estimateStatuses = await Promise.all([
    prisma.estimateStatusRef.upsert({
      where: { code: 'DRAFT' },
      update: {},
      create: {
        code: 'DRAFT',
        name: 'Draft',
        description: 'Estimate in progress'
      }
    }),
    prisma.estimateStatusRef.upsert({
      where: { code: 'SUBMITTED' },
      update: {},
      create: {
        code: 'SUBMITTED',
        name: 'Submitted',
        description: 'Estimate submitted to client'
      }
    }),
    prisma.estimateStatusRef.upsert({
      where: { code: 'ACCEPTED' },
      update: {},
      create: {
        code: 'ACCEPTED',
        name: 'Accepted',
        description: 'Estimate accepted by client'
      }
    }),
    prisma.estimateStatusRef.upsert({
      where: { code: 'REJECTED' },
      update: {},
      create: {
        code: 'REJECTED',
        name: 'Rejected',
        description: 'Estimate rejected by client'
      }
    }),
    prisma.estimateStatusRef.upsert({
      where: { code: 'REVISED' },
      update: {},
      create: {
        code: 'REVISED',
        name: 'Revised',
        description: 'Estimate requires revision'
      }
    })
  ])

  console.log('📊 Created estimate status references')

  // Create Employee Classifications
  const classifications = await Promise.all([
    prisma.employeeClassification.upsert({
      where: { name: 'Laborer' },
      update: {},
      create: {
        name: 'Laborer',
        description: 'General construction laborer'
      }
    }),
    prisma.employeeClassification.upsert({
      where: { name: 'Carpenter' },
      update: {},
      create: {
        name: 'Carpenter',
        description: 'Skilled carpentry work'
      }
    }),
    prisma.employeeClassification.upsert({
      where: { name: 'Electrician' },
      update: {},
      create: {
        name: 'Electrician',
        description: 'Electrical installation and maintenance'
      }
    }),
    prisma.employeeClassification.upsert({
      where: { name: 'Plumber' },
      update: {},
      create: {
        name: 'Plumber',
        description: 'Plumbing installation and repair'
      }
    }),
    prisma.employeeClassification.upsert({
      where: { name: 'Heavy Equipment Operator' },
      update: {},
      create: {
        name: 'Heavy Equipment Operator',
        description: 'Operation of heavy machinery'
      }
    }),
    prisma.employeeClassification.upsert({
      where: { name: 'Concrete Finisher' },
      update: {},
      create: {
        name: 'Concrete Finisher',
        description: 'Concrete pouring and finishing'
      }
    })
  ])

  // Create Employee Levels
  const levels = await Promise.all([
    prisma.employeeLevelModel.upsert({
      where: { name: 'Apprentice' },
      update: {},
      create: { name: 'Apprentice' }
    }),
    prisma.employeeLevelModel.upsert({
      where: { name: 'Journeyman' },
      update: {},
      create: { name: 'Journeyman' }
    }),
    prisma.employeeLevelModel.upsert({
      where: { name: 'Foreman' },
      update: {},
      create: { name: 'Foreman' }
    }),
    prisma.employeeLevelModel.upsert({
      where: { name: 'Superintendent' },
      update: {},
      create: { name: 'Superintendent' }
    })
  ])

  console.log('📋 Created employee classifications and levels')

  // Create Employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@company.com',
        phone: '555-0101',
        classificationId: classifications[0].id, // Laborer
        levelId: levels[1].id, // Journeyman
        hireDate: new Date('2023-01-15'),
        active: true,
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zip: '62701',
        userId: driver1.id
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@company.com',
        phone: '555-0102',
        classificationId: classifications[1].id, // Carpenter
        levelId: levels[2].id, // Foreman
        hireDate: new Date('2022-06-01'),
        active: true,
        address: '456 Oak Ave',
        city: 'Springfield',
        state: 'IL',
        zip: '62702',
        userId: driver2.id
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@company.com',
        phone: '555-0103',
        classificationId: classifications[2].id, // Electrician
        levelId: levels[1].id, // Journeyman
        hireDate: new Date('2021-03-10'),
        active: true,
        address: '789 Pine St',
        city: 'Springfield',
        state: 'IL',
        zip: '62703',
        userId: driver3.id
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@company.com',
        phone: '555-0104',
        classificationId: classifications[3].id, // Plumber
        levelId: levels[3].id, // Superintendent
        hireDate: new Date('2020-11-20'),
        active: true,
        address: '321 Elm St',
        city: 'Springfield',
        state: 'IL',
        zip: '62704'
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@company.com',
        phone: '555-0105',
        classificationId: classifications[4].id, // Heavy Equipment Operator
        levelId: levels[1].id, // Journeyman
        hireDate: new Date('2023-07-01'),
        active: true,
        address: '654 Maple Ave',
        city: 'Springfield',
        state: 'IL',
        zip: '62705'
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Jennifer',
        lastName: 'Davis',
        email: 'jennifer.davis@company.com',
        phone: '555-0106',
        classificationId: classifications[5].id, // Concrete Finisher
        levelId: levels[2].id, // Foreman
        hireDate: new Date('2022-09-15'),
        active: true,
        address: '987 Cedar St',
        city: 'Springfield',
        state: 'IL',
        zip: '62706'
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'David',
        lastName: 'Miller',
        email: 'david.miller@company.com',
        phone: '555-0107',
        classificationId: classifications[0].id, // Laborer
        levelId: levels[0].id, // Apprentice
        hireDate: new Date('2024-02-01'),
        active: true,
        address: '147 Birch Ln',
        city: 'Springfield',
        state: 'IL',
        zip: '62707'
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Lisa',
        lastName: 'Wilson',
        email: 'lisa.wilson@company.com',
        phone: '555-0108',
        classificationId: classifications[1].id, // Carpenter
        levelId: levels[1].id, // Journeyman
        hireDate: new Date('2023-04-12'),
        active: true,
        address: '258 Spruce St',
        city: 'Springfield',
        state: 'IL',
        zip: '62708'
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'James',
        lastName: 'Anderson',
        email: 'james.anderson@company.com',
        phone: '555-0109',
        classificationId: classifications[2].id, // Electrician
        levelId: levels[2].id, // Foreman
        hireDate: new Date('2021-08-30'),
        active: false, // Terminated employee
        address: '369 Willow Ave',
        city: 'Springfield',
        state: 'IL',
        zip: '62709',
        terminationDate: new Date('2024-06-15')
      }
    }),
    prisma.employee.create({
      data: {
        firstName: 'Amanda',
        lastName: 'Taylor',
        email: 'amanda.taylor@company.com',
        phone: '555-0110',
        classificationId: classifications[3].id, // Plumber
        levelId: levels[0].id, // Apprentice
        hireDate: new Date('2024-01-08'),
        active: true,
        address: '741 Poplar St',
        city: 'Springfield',
        state: 'IL',
        zip: '62710'
      }
    })
  ])

  console.log('👷 Created employees')

  // Create Vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.upsert({
      where: { plate: 'ABC123' },
      update: {},
      create: {
        plate: 'ABC123',
        model: 'Ford F-150',
        capacity: 1000
      }
    }),
    prisma.vehicle.upsert({
      where: { plate: 'XYZ789' },
      update: {},
      create: {
        plate: 'XYZ789',
        model: 'Chevy Silverado',
        capacity: 1200
      }
    }),
    prisma.vehicle.upsert({
      where: { plate: 'DEF456' },
      update: {},
      create: {
        plate: 'DEF456',
        model: 'Ram 2500',
        capacity: 1500
      }
    }),
    prisma.vehicle.upsert({
      where: { plate: 'GHI789' },
      update: {},
      create: {
        plate: 'GHI789',
        model: 'Ford Transit Van',
        capacity: 800
      }
    }),
    prisma.vehicle.upsert({
      where: { plate: 'JKL012' },
      update: {},
      create: {
        plate: 'JKL012',
        model: 'Isuzu Box Truck',
        capacity: 2000
      }
    })
  ])

  console.log('🚚 Created vehicles')

  // Create Projects with related data
  const project1 = await prisma.project.create({
    data: {
      jobNumber: 'JOB-001',
      name: 'Downtown Office Complex',
      client: 'Metro Development Corp',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      contract: {
        create: {
          bondingDeadline: new Date('2024-02-01'),
          insuranceDeadline: new Date('2024-02-15'),
          licenseDeadline: new Date('2024-03-01'),
          payrollDeadline: new Date('2024-04-01'),
          materialsDeadline: new Date('2024-05-01')
        }
      },
      bonding: { create: { deadline: new Date('2024-02-01') } },
      insurance: { create: { deadline: new Date('2024-02-15') } },
      license: { create: { deadline: new Date('2024-03-01') } }
    }
  })

  const project2 = await prisma.project.create({
    data: {
      jobNumber: 'JOB-002',
      name: 'Residential Housing Development',
      client: 'Sunrise Homes LLC',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-02-28'),
      contract: {
        create: {
          bondingDeadline: new Date('2024-04-01'),
          insuranceDeadline: new Date('2024-04-15'),
          licenseDeadline: new Date('2024-05-01'),
          payrollDeadline: new Date('2024-06-01'),
          materialsDeadline: new Date('2024-07-01')
        }
      },
      bonding: { create: { deadline: new Date('2024-04-01') } },
      insurance: { create: { deadline: new Date('2024-04-15') } },
      license: { create: { deadline: new Date('2024-05-01') } }
    }
  })

  const project3 = await prisma.project.create({
    data: {
      jobNumber: 'JOB-003',
      name: 'Highway Bridge Renovation',
      client: 'State Department of Transportation',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-05-31'),
      contract: {
        create: {
          bondingDeadline: new Date('2024-07-01'),
          insuranceDeadline: new Date('2024-07-15'),
          licenseDeadline: new Date('2024-08-01'),
          payrollDeadline: new Date('2024-09-01'),
          materialsDeadline: new Date('2024-10-01')
        }
      },
      bonding: { create: { deadline: new Date('2024-07-01') } },
      insurance: { create: { deadline: new Date('2024-07-15') } },
      license: { create: { deadline: new Date('2024-08-01') } }
    }
  })

  const project4 = await prisma.project.create({
    data: {
      jobNumber: 'JOB-004',
      name: 'Shopping Mall Expansion',
      client: 'Retail Properties Inc',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-08-31'),
      contract: {
        create: {
          bondingDeadline: new Date('2024-10-01'),
          insuranceDeadline: new Date('2024-10-15'),
          licenseDeadline: new Date('2024-11-01'),
          payrollDeadline: new Date('2024-12-01'),
          materialsDeadline: new Date('2025-01-01')
        }
      },
      bonding: { create: { deadline: new Date('2024-10-01') } },
      insurance: { create: { deadline: new Date('2024-10-15') } },
      license: { create: { deadline: new Date('2024-11-01') } }
    }
  })

  console.log('🏗️ Created projects')

  // Create Estimates for each project
  const estimates = await Promise.all([
    // Project 1 estimates
    prisma.estimate.create({
      data: {
        projectId: project1.id,
        description: 'Foundation and Site Preparation',
        amount: 125000.0,
        estimatorId: estimator.id,
        status: 'ACCEPTED',
        statusRefId: estimateStatuses[2].id, // ACCEPTED
        notes: 'Includes excavation, concrete, and rebar'
      }
    }),
    prisma.estimate.create({
      data: {
        projectId: project1.id,
        description: 'Structural Steel Frame',
        amount: 275000.0,
        estimatorId: estimator.id,
        status: 'ACCEPTED',
        statusRefId: estimateStatuses[2].id, // ACCEPTED
        notes: 'Main building structure with fire-rated steel'
      }
    }),
    prisma.estimate.create({
      data: {
        projectId: project1.id,
        description: 'Electrical Systems',
        amount: 85000.0,
        estimatorId: estimator.id,
        status: 'SUBMITTED',
        statusRefId: estimateStatuses[1].id, // SUBMITTED
        notes: 'Complete electrical installation including emergency systems'
      }
    }),

    // Project 2 estimates
    prisma.estimate.create({
      data: {
        projectId: project2.id,
        description: 'Residential Units - Phase 1',
        amount: 450000.0,
        estimatorId: estimator.id,
        status: 'ACCEPTED',
        statusRefId: estimateStatuses[2].id, // ACCEPTED
        notes: '15 residential units with full finish package'
      }
    }),
    prisma.estimate.create({
      data: {
        projectId: project2.id,
        description: 'Site Development and Utilities',
        amount: 125000.0,
        estimatorId: estimator.id,
        status: 'REVISED',
        statusRefId: estimateStatuses[4].id, // REVISED
        notes: 'Client requested changes to landscaping plan'
      }
    }),

    // Project 3 estimates
    prisma.estimate.create({
      data: {
        projectId: project3.id,
        description: 'Bridge Demolition',
        amount: 180000.0,
        estimatorId: estimator.id,
        status: 'ACCEPTED',
        statusRefId: estimateStatuses[2].id, // ACCEPTED
        notes: 'Controlled demolition with environmental considerations'
      }
    }),
    prisma.estimate.create({
      data: {
        projectId: project3.id,
        description: 'New Bridge Construction',
        amount: 1250000.0,
        estimatorId: estimator.id,
        status: 'SUBMITTED',
        statusRefId: estimateStatuses[1].id, // SUBMITTED
        notes: 'Pre-stressed concrete bridge with 120ft span'
      }
    }),

    // Project 4 estimates
    prisma.estimate.create({
      data: {
        projectId: project4.id,
        description: 'Mall Expansion - Structural',
        amount: 680000.0,
        estimatorId: estimator.id,
        status: 'DRAFT',
        statusRefId: estimateStatuses[0].id, // DRAFT
        notes: 'Still calculating steel and concrete quantities'
      }
    }),
    prisma.estimate.create({
      data: {
        projectId: project4.id,
        description: 'HVAC and Mechanical Systems',
        amount: 320000.0,
        estimatorId: estimator.id,
        status: 'REJECTED',
        statusRefId: estimateStatuses[3].id, // REJECTED
        notes: 'Client found more competitive bid'
      }
    }),

    // Additional projects estimates
    prisma.estimate.create({
      data: {
        projectId: additionalProjects[0].id, // School Renovation
        description: 'Classroom Renovation Package',
        amount: 285000.0,
        estimatorId: estimator.id,
        status: 'SUBMITTED',
        statusRefId: estimateStatuses[1].id, // SUBMITTED
        notes: '12 classrooms with modern technology integration'
      }
    }),
    prisma.estimate.create({
      data: {
        projectId: additionalProjects[1].id, // Hospital Emergency Wing
        description: 'Emergency Wing Construction',
        amount: 1850000.0,
        estimatorId: estimator.id,
        status: 'DRAFT',
        statusRefId: estimateStatuses[0].id, // DRAFT
        notes: 'Complex medical facility with specialized systems'
      }
    })
  ])

  console.log('💰 Created estimates')

  // Create Billing Records
  const billingRecords = await Promise.all([
    // Project 1 billing
    prisma.billing.create({
      data: {
        projectId: project1.id,
        period: '2024-Q1',
        amount: 85000.0,
        invoiceNumber: 'INV-2024-001',
        dueDate: new Date('2024-04-15'),
        notes: 'Foundation work completed'
      }
    }),
    prisma.billing.create({
      data: {
        projectId: project1.id,
        period: '2024-Q2',
        amount: 125000.0,
        invoiceNumber: 'INV-2024-002',
        dueDate: new Date('2024-07-15'),
        notes: 'Structural steel installation'
      }
    }),
    prisma.billing.create({
      data: {
        projectId: project1.id,
        period: '2024-Q3',
        amount: 95000.0,
        invoiceNumber: 'INV-2024-003',
        dueDate: new Date('2024-10-15'),
        notes: 'Electrical and mechanical rough-in'
      }
    }),

    // Project 2 billing
    prisma.billing.create({
      data: {
        projectId: project2.id,
        period: '2024-07',
        amount: 75000.0,
        invoiceNumber: 'INV-2024-004',
        dueDate: new Date('2024-08-15'),
        notes: 'Site preparation and utilities'
      }
    }),
    prisma.billing.create({
      data: {
        projectId: project2.id,
        period: '2024-08',
        amount: 150000.0,
        invoiceNumber: 'INV-2024-005',
        dueDate: new Date('2024-09-15'),
        notes: 'First 5 residential units framed'
      }
    }),

    // Project 3 billing
    prisma.billing.create({
      data: {
        projectId: project3.id,
        period: '2024-Q2',
        amount: 180000.0,
        invoiceNumber: 'INV-2024-006',
        dueDate: new Date('2024-08-30'),
        notes: 'Bridge demolition completed'
      }
    }),
    prisma.billing.create({
      data: {
        projectId: project3.id,
        period: '2024-Q3',
        amount: 425000.0,
        invoiceNumber: 'INV-2024-007',
        dueDate: new Date('2024-11-30'),
        notes: 'New bridge foundation and piers'
      }
    }),

    // Project 4 billing
    prisma.billing.create({
      data: {
        projectId: project4.id,
        period: '2024-09',
        amount: 125000.0,
        invoiceNumber: 'INV-2024-008',
        dueDate: new Date('2024-10-30'),
        notes: 'Mall expansion demolition and prep work'
      }
    }),

    // School project billing
    prisma.billing.create({
      data: {
        projectId: additionalProjects[0].id,
        period: '2024-Q4',
        amount: 58000.0,
        invoiceNumber: 'INV-2024-009',
        dueDate: new Date('2025-01-15'),
        notes: 'Initial classroom demolition'
      }
    }),

    // Hospital project billing (future billing)
    prisma.billing.create({
      data: {
        projectId: additionalProjects[1].id,
        period: '2025-Q1',
        amount: 285000.0,
        invoiceNumber: 'INV-2025-001',
        dueDate: new Date('2025-04-15'),
        notes: 'Site preparation and foundation work'
      }
    })
  ])

  console.log('💳 Created billing records')

  // Create Monthly Billing Summaries
  const monthlyBillings = await Promise.all([
    // 2024 monthly summaries for various projects
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 6,
        projectId: project1.id,
        amount: 125000.0
      }
    }),
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 7,
        projectId: project1.id,
        amount: 95000.0
      }
    }),
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 8,
        projectId: project1.id,
        amount: 87500.0
      }
    }),
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 7,
        projectId: project2.id,
        amount: 75000.0
      }
    }),
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 8,
        projectId: project2.id,
        amount: 150000.0
      }
    }),
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 6,
        projectId: project3.id,
        amount: 180000.0
      }
    }),
    prisma.monthlyBilling.create({
      data: {
        year: 2024,
        month: 9,
        projectId: project4.id,
        amount: 125000.0
      }
    })
  ])

  console.log('📅 Created monthly billing summaries')

  // Create Employee Project Assignments
  const projectAssignments = await Promise.all([
    // Project 1 assignments
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[1].id, // Maria (Carpenter Foreman)
        projectId: project1.id,
        role: 'SUPERVISOR'
      }
    }),
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[0].id, // John (Laborer)
        projectId: project1.id,
        role: 'WORKER'
      }
    }),
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[2].id, // Robert (Electrician)
        projectId: project1.id,
        role: 'WORKER'
      }
    }),

    // Project 2 assignments
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[3].id, // Sarah (Plumber Superintendent)
        projectId: project2.id,
        role: 'MANAGER'
      }
    }),
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[7].id, // Lisa (Carpenter)
        projectId: project2.id,
        role: 'WORKER'
      }
    }),
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[6].id, // David (Laborer Apprentice)
        projectId: project2.id,
        role: 'WORKER'
      }
    }),

    // Project 3 assignments
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[4].id, // Michael (Heavy Equipment Operator)
        projectId: project3.id,
        role: 'WORKER'
      }
    }),
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[5].id, // Jennifer (Concrete Finisher Foreman)
        projectId: project3.id,
        role: 'SUPERVISOR'
      }
    }),

    // Project 4 assignments
    prisma.employeeProjectAssignment.create({
      data: {
        employeeId: employees[9].id, // Amanda (Plumber Apprentice)
        projectId: project4.id,
        role: 'WORKER'
      }
    })
  ])

  console.log('👥 Created project assignments')

  // Create Material Orders for each project
  const materialOrdersData = [
    // Project 1 orders
    {
      projectId: project1.id,
      description: 'Concrete Mix - 50 cubic yards',
      status: OrderStatus.DELIVERED_TO_SITE,
      submittedAt: new Date('2024-06-01'),
      approvedAt: new Date('2024-06-03'),
      orderedAt: new Date('2024-06-05'),
      officeETA: new Date('2024-06-10'),
      siteETA: new Date('2024-06-12')
    },
    {
      projectId: project1.id,
      description: 'Steel Beams - Grade A',
      status: OrderStatus.DELIVERED_TO_OFFICE,
      submittedAt: new Date('2024-07-01'),
      approvedAt: new Date('2024-07-04'),
      orderedAt: new Date('2024-07-06'),
      officeETA: new Date('2024-07-11'),
      siteETA: new Date('2024-07-15')
    },
    {
      projectId: project1.id,
      description: 'Electrical Wiring & Fixtures',
      status: OrderStatus.SCHEDULED,
      submittedAt: new Date('2024-08-01'),
      approvedAt: new Date('2024-08-03'),
      orderedAt: new Date('2024-08-05'),
      officeETA: new Date('2024-08-12'),
      siteETA: new Date('2024-08-15')
    },
    // Project 2 orders
    {
      projectId: project2.id,
      description: 'Lumber Package - Pine & Oak',
      status: OrderStatus.ORDERED,
      submittedAt: new Date('2024-07-15'),
      approvedAt: new Date('2024-07-18'),
      orderedAt: new Date('2024-07-20'),
      officeETA: new Date('2024-07-25'),
      siteETA: new Date('2024-07-28')
    },
    {
      projectId: project2.id,
      description: 'Roofing Materials - Shingles',
      status: OrderStatus.APPROVED,
      submittedAt: new Date('2024-08-10'),
      approvedAt: new Date('2024-08-12'),
      orderedAt: null,
      officeETA: new Date('2024-08-20'),
      siteETA: new Date('2024-08-25')
    },
    {
      projectId: project2.id,
      description: 'Insulation Materials',
      status: OrderStatus.SUBMITTED,
      submittedAt: new Date('2024-08-15'),
      approvedAt: null,
      orderedAt: null,
      officeETA: new Date('2024-08-30'),
      siteETA: new Date('2024-09-05')
    },
    // Project 3 orders
    {
      projectId: project3.id,
      description: 'Bridge Support Cables',
      status: OrderStatus.DELIVERED_TO_SITE,
      submittedAt: new Date('2024-07-01'),
      approvedAt: new Date('2024-07-05'),
      orderedAt: new Date('2024-07-08'),
      officeETA: new Date('2024-07-20'),
      siteETA: new Date('2024-07-25')
    },
    {
      projectId: project3.id,
      description: 'Reinforcement Steel Bars',
      status: OrderStatus.DELIVERED_TO_OFFICE,
      submittedAt: new Date('2024-08-05'),
      approvedAt: new Date('2024-08-08'),
      orderedAt: new Date('2024-08-10'),
      officeETA: new Date('2024-08-18'),
      siteETA: new Date('2024-08-22')
    },
    // Project 4 orders
    {
      projectId: project4.id,
      description: 'HVAC System Components',
      status: OrderStatus.ORDERED,
      submittedAt: new Date('2024-08-20'),
      approvedAt: new Date('2024-08-22'),
      orderedAt: new Date('2024-08-25'),
      officeETA: new Date('2024-09-05'),
      siteETA: new Date('2024-09-10')
    },
    {
      projectId: project4.id,
      description: 'Glass Panels & Windows',
      status: OrderStatus.SUBMITTED,
      submittedAt: new Date('2024-08-25'),
      approvedAt: null,
      orderedAt: null,
      officeETA: new Date('2024-09-15'),
      siteETA: new Date('2024-09-20')
    }
  ]

  const materialOrders = await Promise.all(
    materialOrdersData.map(orderData =>
      prisma.materialOrder.create({ data: orderData })
    )
  )

  console.log('📦 Created material orders')

  // Create Deliveries for orders that have been delivered or are scheduled
  const deliveriesData = []
  const users = [projectManager1, projectManager2]
  const drivers = [driver1, driver2, driver3]

  materialOrders.forEach((order, index) => {
    if (
      order.status === OrderStatus.DELIVERED_TO_SITE ||
      order.status === OrderStatus.DELIVERED_TO_OFFICE ||
      order.status === OrderStatus.SCHEDULED
    ) {
      deliveriesData.push({
        materialOrderId: order.id,
        requestedById: users[index % users.length].id,
        driverId: drivers[index % drivers.length].id,
        vehicleId: vehicles[index % vehicles.length].id,
        scheduledDate: order.officeETA ?? new Date()
      })
    }
  })

  await Promise.all(
    deliveriesData.map(deliveryData =>
      prisma.delivery.create({ data: deliveryData })
    )
  )

  console.log('🚛 Created deliveries')

  // Add some additional projects for variety
  const additionalProjects = await Promise.all([
    prisma.project.create({
      data: {
        jobNumber: 'JOB-005',
        name: 'School Renovation Project',
        client: 'City School District',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2025-06-30'),
        contract: {
          create: {
            bondingDeadline: new Date('2024-12-01'),
            insuranceDeadline: new Date('2024-12-15'),
            licenseDeadline: new Date('2025-01-01'),
            payrollDeadline: new Date('2025-02-01'),
            materialsDeadline: new Date('2025-03-01')
          }
        },
        bonding: { create: { deadline: new Date('2024-12-01') } },
        insurance: { create: { deadline: new Date('2024-12-15') } },
        license: { create: { deadline: new Date('2025-01-01') } }
      }
    }),
    prisma.project.create({
      data: {
        jobNumber: 'JOB-006',
        name: 'Hospital Emergency Wing',
        client: 'General Hospital Corp',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        contract: {
          create: {
            bondingDeadline: new Date('2025-02-01'),
            insuranceDeadline: new Date('2025-02-15'),
            licenseDeadline: new Date('2025-03-01'),
            payrollDeadline: new Date('2025-04-01'),
            materialsDeadline: new Date('2025-05-01')
          }
        },
        bonding: { create: { deadline: new Date('2025-02-01') } },
        insurance: { create: { deadline: new Date('2025-02-15') } },
        license: { create: { deadline: new Date('2025-03-01') } }
      }
    })
  ])

  console.log('🏥 Created additional projects')

  // Add more material orders for the new projects
  const additionalOrders = await Promise.all([
    prisma.materialOrder.create({
      data: {
        projectId: additionalProjects[0].id,
        description: 'Classroom Furniture Sets',
        status: OrderStatus.SUBMITTED,
        submittedAt: new Date('2024-08-28'),
        approvedAt: null,
        orderedAt: null,
        officeETA: new Date('2024-09-15'),
        siteETA: new Date('2024-09-20')
      }
    }),
    prisma.materialOrder.create({
      data: {
        projectId: additionalProjects[1].id,
        description: 'Medical Equipment Infrastructure',
        status: OrderStatus.APPROVED,
        submittedAt: new Date('2024-08-30'),
        approvedAt: new Date('2024-09-02'),
        orderedAt: null,
        officeETA: new Date('2024-09-25'),
        siteETA: new Date('2024-09-30')
      }
    })
  ])

  console.log('📋 Created additional material orders')

  // Create Daily Time Entries
  const timeEntries = await Promise.all([
    // Week 1 entries for Project 1
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[0].id, // John
        projectId: project1.id,
        workDate: new Date('2024-08-05'),
        hoursWorked: 8.0,
        overtimeHours: 0,
        notes: 'Site preparation work'
      }
    }),
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[0].id, // John
        projectId: project1.id,
        workDate: new Date('2024-08-06'),
        hoursWorked: 8.5,
        overtimeHours: 0.5,
        notes: 'Concrete foundation prep'
      }
    }),
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[1].id, // Maria
        projectId: project1.id,
        workDate: new Date('2024-08-05'),
        hoursWorked: 9.0,
        overtimeHours: 1.0,
        notes: 'Supervising framing work'
      }
    }),
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[2].id, // Robert
        projectId: project1.id,
        workDate: new Date('2024-08-05'),
        hoursWorked: 8.0,
        overtimeHours: 0,
        notes: 'Electrical rough-in'
      }
    }),

    // Project 2 time entries
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[7].id, // Lisa
        projectId: project2.id,
        workDate: new Date('2024-08-05'),
        hoursWorked: 8.0,
        overtimeHours: 0,
        notes: 'Residential framing'
      }
    }),
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[6].id, // David
        projectId: project2.id,
        workDate: new Date('2024-08-05'),
        hoursWorked: 7.5,
        overtimeHours: 0,
        notes: 'Learning foundation work'
      }
    }),

    // Project 3 time entries
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[4].id, // Michael
        projectId: project3.id,
        workDate: new Date('2024-08-05'),
        hoursWorked: 10.0,
        overtimeHours: 2.0,
        notes: 'Bridge demolition with excavator'
      }
    }),
    prisma.dailyTimeEntry.create({
      data: {
        employeeId: employees[5].id, // Jennifer
        projectId: project3.id,
        workDate: new Date('2024-08-06'),
        hoursWorked: 8.0,
        overtimeHours: 0,
        notes: 'Concrete pour preparation'
      }
    })
  ])

  // Create Weekly Timecards
  const weeklyTimecards = await Promise.all([
    prisma.weeklyTimecard.create({
      data: {
        employeeId: employees[0].id, // John
        projectId: project1.id,
        weekStart: new Date('2024-08-05'),
        totalHours: 42.5,
        notes: 'Good progress on foundation work'
      }
    }),
    prisma.weeklyTimecard.create({
      data: {
        employeeId: employees[1].id, // Maria
        projectId: project1.id,
        weekStart: new Date('2024-08-05'),
        totalHours: 45.0,
        notes: 'Supervising multiple crews'
      }
    }),
    prisma.weeklyTimecard.create({
      data: {
        employeeId: employees[7].id, // Lisa
        projectId: project2.id,
        weekStart: new Date('2024-08-05'),
        totalHours: 40.0,
        notes: 'Steady progress on residential units'
      }
    }),
    prisma.weeklyTimecard.create({
      data: {
        employeeId: employees[4].id, // Michael
        projectId: project3.id,
        weekStart: new Date('2024-08-05'),
        totalHours: 48.0,
        notes: 'Heavy equipment operations'
      }
    })
  ])

  // Create Employee Classification History
  const classHistory = await Promise.all([
    prisma.employeeClassHistory.create({
      data: {
        employeeId: employees[0].id, // John
        classificationId: classifications[0].id, // Started as Laborer
        startDate: new Date('2023-01-15'),
        reason: 'Initial hire'
      }
    }),
    prisma.employeeClassHistory.create({
      data: {
        employeeId: employees[1].id, // Maria
        classificationId: classifications[0].id, // Started as Laborer
        startDate: new Date('2022-06-01'),
        endDate: new Date('2023-01-01'),
        reason: 'Initial hire'
      }
    }),
    prisma.employeeClassHistory.create({
      data: {
        employeeId: employees[1].id, // Maria
        classificationId: classifications[1].id, // Promoted to Carpenter
        startDate: new Date('2023-01-01'),
        reason: 'Promotion based on performance'
      }
    }),
    prisma.employeeClassHistory.create({
      data: {
        employeeId: employees[8].id, // James (terminated)
        classificationId: classifications[2].id, // Electrician
        startDate: new Date('2021-08-30'),
        endDate: new Date('2024-06-15'),
        reason: 'Employment period'
      }
    })
  ])

  // Create Payroll Records
  const payrollRecords = await Promise.all([
    prisma.payroll.create({
      data: {
        projectId: project1.id,
        employeeId: employees[0].id, // John
        amount: 3200.0,
        weekStart: new Date('2024-08-05'),
        weekEnd: new Date('2024-08-11')
      }
    }),
    prisma.payroll.create({
      data: {
        projectId: project1.id,
        employeeId: employees[1].id, // Maria
        amount: 4500.0,
        weekStart: new Date('2024-08-05'),
        weekEnd: new Date('2024-08-11')
      }
    }),
    prisma.payroll.create({
      data: {
        projectId: project2.id,
        employeeId: employees[7].id, // Lisa
        amount: 3800.0,
        weekStart: new Date('2024-08-05'),
        weekEnd: new Date('2024-08-11')
      }
    }),
    prisma.payroll.create({
      data: {
        projectId: project3.id,
        employeeId: employees[4].id, // Michael
        amount: 4200.0,
        weekStart: new Date('2024-08-05'),
        weekEnd: new Date('2024-08-11')
      }
    })
  ])

  console.log('⏰ Created time entries, timecards, and payroll records')

  console.log('✅ Seed completed successfully!')
  console.log(`
📊 Summary:
- Users: 8 (Tom Wilson-PM, Laura Martinez-PM, Carlos Rodriguez-Estimator, Susan Clark-Billing, 3 Drivers, Admin)
- Estimate Status References: 5 (Draft, Submitted, Accepted, Rejected, Revised)
- Employee Classifications: 6 (Laborer, Carpenter, Electrician, Plumber, Heavy Equipment Operator, Concrete Finisher)
- Employee Levels: 4 (Apprentice, Journeyman, Foreman, Superintendent)
- Employees: 10 (9 active, 1 terminated)
- Project Assignments: 9 across 4 projects
- Vehicles: 5
- Projects: 6
- Estimates: 11 (various statuses across all projects)
- Billing Records: 10 (quarterly and monthly invoices)
- Monthly Billing Summaries: 7
- Material Orders: ${materialOrders.length + additionalOrders.length}
- Deliveries: ${deliveriesData.length}
- Daily Time Entries: 8
- Weekly Timecards: 4
- Classification History Records: 4
- Payroll Records: 4
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
