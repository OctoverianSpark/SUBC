import { PrismaClient, Role, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert project manager
  const projectManager = await prisma.user.upsert({
    where: { email: 'pm@example.com' },
    update: {},
    create: {
      email: 'pm@example.com',
      password: 'password123',
      role: Role.PROJECT_MANAGER,
    },
  });

  // Upsert driver
  const driver = await prisma.user.upsert({
    where: { email: 'driver@example.com' },
    update: {},
    create: {
      email: 'driver@example.com',
      password: 'password123',
      role: Role.USER,
    },
  });

  // Upsert vehicle
  const vehicle = await prisma.vehicle.upsert({
    where: { plate: 'ABC123' },
    update: {},
    create: {
      plate: 'ABC123',
      model: 'Ford F-150',
      capacity: 1000,
    },
  });

  // Create project with related records
  const project = await prisma.project.create({
    data: {
      jobNumber: 'JOB-001',
      name: 'Sample Construction Project',
      client: 'Client Co',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      contract: {
        create: {
          bondingDeadline: new Date('2024-02-01'),
          insuranceDeadline: new Date('2024-02-15'),
          licenseDeadline: new Date('2024-03-01'),
          payrollDeadline: new Date('2024-04-01'),
          materialsDeadline: new Date('2024-05-01'),
        },
      },
      bonding: { create: { deadline: new Date('2024-02-01') } },
      insurance: { create: { deadline: new Date('2024-02-15') } },
      license: { create: { deadline: new Date('2024-03-01') } },
    },
  });

  // Material orders
  const materialOrders = await Promise.all([
    prisma.materialOrder.create({
      data: {
        projectId: project.id,
        description: 'Concrete',
        status: OrderStatus.SCHEDULED,
        submittedAt: new Date('2024-06-01'),
        approvedAt: new Date('2024-06-03'),
        orderedAt: new Date('2024-06-05'),
        officeETA: new Date('2024-06-10'),
        siteETA: new Date('2024-06-12'),
      },
    }),
    prisma.materialOrder.create({
      data: {
        projectId: project.id,
        description: 'Steel Beams',
        status: OrderStatus.DELIVERED_TO_SITE,
        submittedAt: new Date('2024-07-01'),
        approvedAt: new Date('2024-07-04'),
        orderedAt: new Date('2024-07-06'),
        officeETA: new Date('2024-07-11'),
        siteETA: new Date('2024-07-15'),
      },
    }),
  ]);

  // Deliveries for each material order
  await Promise.all(
    materialOrders.map((order) =>
      prisma.delivery.create({
        data: {
          materialOrderId: order.id,
          requestedById: projectManager.id,
          driverId: driver.id,
          vehicleId: vehicle.id,
          scheduledDate: order.officeETA ?? new Date(),
        },
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
