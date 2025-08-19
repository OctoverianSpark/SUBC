// Demo storage utility for construction management system
// Replaces database operations with local storage for demo purposes

export interface DemoUser {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
}

export interface Project {
  id: string
  name: string
  location: string
  status: "active" | "planning" | "completed" | "on-hold"
  budget: number
  team_size: number
  start_date: string
  end_date: string
  completion: number
  client: string
  description?: string
}

export interface Estimate {
  id: string
  projectName: string
  estimateNumber: string
  totalAmount: number
  status: "APPROVED" | "PENDING" | "DRAFT" | "REJECTED"
  createdDate: string
  validUntil: string
  client: string
  category: string
  lineItems: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
}

export interface Contract {
  id: string
  contractNumber: string
  projectName: string
  client: string
  value: number
  status: "ACTIVE" | "PENDING_SIGNATURE" | "UNDER_REVIEW" | "COMPLETED" | "CANCELLED"
  signedDate: string | null
  startDate: string
  endDate: string
  progress: number
  type: string
}

export interface Subcontractor {
  id: string
  name: string
  company: string
  email: string
  phone: string
  specialties: string[]
  status: "active" | "inactive" | "pending"
  licenseNumber: string
  insuranceExpiry: string
  rating: number
}

export interface Material {
  id: string
  name: string
  category: string
  supplier: string
  unitPrice: number
  unit: string
  inStock: number
  reorderLevel: number
  lastOrdered: string
}

export interface PurchaseOrder {
  id: string
  orderNumber: string
  supplier: string
  items: Array<{
    materialId: string
    materialName: string
    quantity: number
    unitPrice: number
    total: number
  }>
  totalAmount: number
  status: "pending" | "approved" | "delivered" | "cancelled"
  orderDate: string
  expectedDelivery: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  client: string
  projectName: string
  amount: number
  status: "draft" | "sent" | "paid" | "overdue"
  issueDate: string
  dueDate: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
}

export interface Employee {
  id: string
  name: string
  position: string
  hourlyRate: number
  hoursWorked: number
  overtimeHours: number
  status: "active" | "inactive"
}

export interface ActivityLog {
  id: string
  type: "project" | "estimate" | "contract" | "material" | "payment"
  title: string
  description: string
  timestamp: string
  user: string
  status: "success" | "warning" | "info"
}

// Demo data initialization
const initializeDemoData = () => {
  if (typeof window === "undefined") return

  // Initialize demo user
  if (!localStorage.getItem("demo_user")) {
    const demoUser: DemoUser = {
      id: "demo-user-1",
      email: "demo@construction.com",
      firstName: "John",
      lastName: "Constructor",
      company: "Demo Construction Co.",
    }
    localStorage.setItem("demo_user", JSON.stringify(demoUser))
  }

  // Initialize demo projects
  if (!localStorage.getItem("demo_projects")) {
    const demoProjects: Project[] = [
      {
        id: "1",
        name: "Downtown Office Complex",
        location: "123 Main St, Downtown",
        status: "active",
        budget: 2500000,
        team_size: 15,
        start_date: "2024-01-15",
        end_date: "2024-12-15",
        completion: 45,
        client: "Metro Development Corp",
        description: "Modern 12-story office building with retail space",
      },
      {
        id: "2",
        name: "Residential Tower",
        location: "456 Oak Ave, Midtown",
        status: "planning",
        budget: 5000000,
        team_size: 25,
        start_date: "2024-03-01",
        end_date: "2025-08-30",
        completion: 15,
        client: "Skyline Properties",
        description: "30-story luxury residential tower",
      },
    ]
    localStorage.setItem("demo_projects", JSON.stringify(demoProjects))
  }

  // Initialize demo estimates
  if (!localStorage.getItem("demo_estimates")) {
    const demoEstimates: Estimate[] = [
      {
        id: "1",
        projectName: "Downtown Office Complex",
        estimateNumber: "EST-2024-001",
        totalAmount: 850000,
        status: "APPROVED",
        createdDate: "2024-01-15",
        validUntil: "2024-02-15",
        client: "Metro Development Corp",
        category: "Commercial",
        lineItems: [
          { id: "1", description: "Foundation Work", quantity: 1, unitPrice: 150000, total: 150000 },
          { id: "2", description: "Steel Framework", quantity: 1, unitPrice: 300000, total: 300000 },
          { id: "3", description: "Electrical Systems", quantity: 1, unitPrice: 200000, total: 200000 },
          { id: "4", description: "Plumbing Systems", quantity: 1, unitPrice: 100000, total: 100000 },
          { id: "5", description: "Finishing Work", quantity: 1, unitPrice: 100000, total: 100000 },
        ],
      },
    ]
    localStorage.setItem("demo_estimates", JSON.stringify(demoEstimates))
  }

  // Initialize demo contracts
  if (!localStorage.getItem("demo_contracts")) {
    const demoContracts: Contract[] = [
      {
        id: "1",
        contractNumber: "CON-2024-001",
        projectName: "Downtown Office Complex",
        client: "Metro Development Corp",
        value: 850000,
        status: "ACTIVE",
        signedDate: "2024-01-20",
        startDate: "2024-02-01",
        endDate: "2024-08-30",
        progress: 68,
        type: "Construction",
      },
    ]
    localStorage.setItem("demo_contracts", JSON.stringify(demoContracts))
  }

  // Initialize demo subcontractors
  if (!localStorage.getItem("demo_subcontractors")) {
    const demoSubcontractors: Subcontractor[] = [
      {
        id: "1",
        name: "Mike Johnson",
        company: "Johnson Electrical Services",
        email: "mike@johnsonelectric.com",
        phone: "(555) 123-4567",
        specialties: ["Electrical", "Low Voltage"],
        status: "active",
        licenseNumber: "EL-12345",
        insuranceExpiry: "2024-12-31",
        rating: 4.8,
      },
      {
        id: "2",
        name: "Sarah Williams",
        company: "Williams Plumbing Co.",
        email: "sarah@williamsplumbing.com",
        phone: "(555) 234-5678",
        specialties: ["Plumbing", "HVAC"],
        status: "active",
        licenseNumber: "PL-67890",
        insuranceExpiry: "2024-11-30",
        rating: 4.9,
      },
    ]
    localStorage.setItem("demo_subcontractors", JSON.stringify(demoSubcontractors))
  }

  // Initialize demo materials
  if (!localStorage.getItem("demo_materials")) {
    const demoMaterials: Material[] = [
      {
        id: "1",
        name: "Steel Rebar #4",
        category: "Steel",
        supplier: "Metro Steel Supply",
        unitPrice: 0.85,
        unit: "ft",
        inStock: 5000,
        reorderLevel: 1000,
        lastOrdered: "2024-01-15",
      },
      {
        id: "2",
        name: "Concrete Mix 3000 PSI",
        category: "Concrete",
        supplier: "City Concrete Co.",
        unitPrice: 120.0,
        unit: "yard",
        inStock: 50,
        reorderLevel: 20,
        lastOrdered: "2024-01-20",
      },
    ]
    localStorage.setItem("demo_materials", JSON.stringify(demoMaterials))
  }

  // Initialize demo purchase orders
  if (!localStorage.getItem("demo_purchase_orders")) {
    const demoPurchaseOrders: PurchaseOrder[] = [
      {
        id: "1",
        orderNumber: "PO-2024-001",
        supplier: "Metro Steel Supply",
        items: [
          {
            materialId: "1",
            materialName: "Steel Rebar #4",
            quantity: 2000,
            unitPrice: 0.85,
            total: 1700,
          },
        ],
        totalAmount: 1700,
        status: "approved",
        orderDate: "2024-01-25",
        expectedDelivery: "2024-02-01",
      },
    ]
    localStorage.setItem("demo_purchase_orders", JSON.stringify(demoPurchaseOrders))
  }

  // Initialize demo invoices
  if (!localStorage.getItem("demo_invoices")) {
    const demoInvoices: Invoice[] = [
      {
        id: "1",
        invoiceNumber: "INV-2024-001",
        client: "Metro Development Corp",
        projectName: "Downtown Office Complex",
        amount: 125000,
        status: "sent",
        issueDate: "2024-01-15",
        dueDate: "2024-02-15",
        items: [
          {
            description: "Foundation Work - Phase 1",
            quantity: 1,
            rate: 125000,
            amount: 125000,
          },
        ],
      },
    ]
    localStorage.setItem("demo_invoices", JSON.stringify(demoInvoices))
  }

  // Initialize demo employees
  if (!localStorage.getItem("demo_employees")) {
    const demoEmployees: Employee[] = [
      {
        id: "1",
        name: "Robert Smith",
        position: "Site Supervisor",
        hourlyRate: 35.0,
        hoursWorked: 40,
        overtimeHours: 5,
        status: "active",
      },
      {
        id: "2",
        name: "Maria Garcia",
        position: "Equipment Operator",
        hourlyRate: 28.0,
        hoursWorked: 40,
        overtimeHours: 0,
        status: "active",
      },
    ]
    localStorage.setItem("demo_employees", JSON.stringify(demoEmployees))
  }

  // Initialize demo activity log
  if (!localStorage.getItem("demo_activity")) {
    const demoActivity: ActivityLog[] = [
      {
        id: "1",
        type: "project",
        title: "Project Status Updated",
        description: "Downtown Office Complex progress updated to 45%",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: "John Constructor",
        status: "success",
      },
      {
        id: "2",
        type: "estimate",
        title: "New Estimate Created",
        description: "EST-2024-002 created for Residential Tower project",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        user: "John Constructor",
        status: "info",
      },
      {
        id: "3",
        type: "material",
        title: "Material Order Delivered",
        description: "Steel Rebar delivery completed for PO-2024-001",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        user: "System",
        status: "success",
      },
    ]
    localStorage.setItem("demo_activity", JSON.stringify(demoActivity))
  }
}

// Storage operations
export const demoStorage = {
  // Initialize demo data
  init: initializeDemoData,

  // User operations
  getUser: (): DemoUser | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("demo_user")
    return user ? JSON.parse(user) : null
  },


  // Project operations
  getProjects: (): Project[] => {
    if (typeof window === "undefined") return []
    const projects = localStorage.getItem("demo_projects")
    return projects ? JSON.parse(projects) : []
  },

  addProject: (project: Omit<Project, "id">): Project => {
    const projects = demoStorage.getProjects()
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    }
    projects.push(newProject)
    localStorage.setItem("demo_projects", JSON.stringify(projects))
    return newProject
  },

  updateProject: (id: string, updates: Partial<Project>): Project | null => {
    const projects = demoStorage.getProjects()
    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return null

    projects[index] = { ...projects[index], ...updates }
    localStorage.setItem("demo_projects", JSON.stringify(projects))
    return projects[index]
  },

  deleteProject: (id: string): boolean => {
    const projects = demoStorage.getProjects()
    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return false
    projects.splice(index, 1)
    localStorage.setItem("demo_projects", JSON.stringify(projects))
    return true
  },


  // Estimate operations
  getEstimates: (): Estimate[] => {
    if (typeof window === "undefined") return []
    const estimates = localStorage.getItem("demo_estimates")
    return estimates ? JSON.parse(estimates) : []
  },

  addEstimate: (estimate: Omit<Estimate, "id">): Estimate => {
    const estimates = demoStorage.getEstimates()
    const newEstimate: Estimate = {
      ...estimate,
      id: Date.now().toString(),
    }
    estimates.push(newEstimate)
    localStorage.setItem("demo_estimates", JSON.stringify(estimates))
    return newEstimate
  },

  updateEstimate: (id: string, updates: Partial<Estimate>): Estimate | null => {
    const estimates = demoStorage.getEstimates()
    const index = estimates.findIndex((e) => e.id === id)
    if (index === -1) return null
    estimates[index] = { ...estimates[index], ...updates }
    localStorage.setItem("demo_estimates", JSON.stringify(estimates))
    return estimates[index]
  },

  deleteEstimate: (id: string): boolean => {
    const estimates = demoStorage.getEstimates()
    const index = estimates.findIndex((e) => e.id === id)
    if (index === -1) return false
    estimates.splice(index, 1)
    localStorage.setItem("demo_estimates", JSON.stringify(estimates))
    return true
  },


  // Contract operations
  getContracts: (): Contract[] => {
    if (typeof window === "undefined") return []
    const contracts = localStorage.getItem("demo_contracts")
    return contracts ? JSON.parse(contracts) : []
  },

  addContract: (contract: Omit<Contract, "id">): Contract => {
    const contracts = demoStorage.getContracts()
    const newContract: Contract = {
      ...contract,
      id: Date.now().toString(),
    }
    contracts.push(newContract)
    localStorage.setItem("demo_contracts", JSON.stringify(contracts))
    return newContract
  },

  updateContract: (id: string, updates: Partial<Contract>): Contract | null => {
    const contracts = demoStorage.getContracts()
    const index = contracts.findIndex((c) => c.id === id)
    if (index === -1) return null
    contracts[index] = { ...contracts[index], ...updates }
    localStorage.setItem("demo_contracts", JSON.stringify(contracts))
    return contracts[index]
  },

  deleteContract: (id: string): boolean => {
    const contracts = demoStorage.getContracts()
    const index = contracts.findIndex((c) => c.id === id)
    if (index === -1) return false
    contracts.splice(index, 1)
    localStorage.setItem("demo_contracts", JSON.stringify(contracts))
    return true
  },


  // Subcontractor operations
  getSubcontractors: (): Subcontractor[] => {
    if (typeof window === "undefined") return []
    const subcontractors = localStorage.getItem("demo_subcontractors")
    return subcontractors ? JSON.parse(subcontractors) : []
  },

  addSubcontractor: (subcontractor: Omit<Subcontractor, "id">): Subcontractor => {
    const subcontractors = demoStorage.getSubcontractors()
    const newSubcontractor: Subcontractor = {
      ...subcontractor,
      id: Date.now().toString(),
    }
    subcontractors.push(newSubcontractor)
    localStorage.setItem("demo_subcontractors", JSON.stringify(subcontractors))
    return newSubcontractor
  },

  updateSubcontractor: (id: string, updates: Partial<Subcontractor>): Subcontractor | null => {
    const subcontractors = demoStorage.getSubcontractors()
    const index = subcontractors.findIndex((s) => s.id === id)
    if (index === -1) return null
    subcontractors[index] = { ...subcontractors[index], ...updates }
    localStorage.setItem("demo_subcontractors", JSON.stringify(subcontractors))
    return subcontractors[index]
  },

  deleteSubcontractor: (id: string): boolean => {
    const subcontractors = demoStorage.getSubcontractors()
    const index = subcontractors.findIndex((s) => s.id === id)
    if (index === -1) return false
    subcontractors.splice(index, 1)
    localStorage.setItem("demo_subcontractors", JSON.stringify(subcontractors))
    return true
  },


  // Material operations
  getMaterials: (): Material[] => {
    if (typeof window === "undefined") return []
    const materials = localStorage.getItem("demo_materials")
    return materials ? JSON.parse(materials) : []
  },

  updateMaterial: (id: string, updates: Partial<Material>): Material | null => {
    const materials = demoStorage.getMaterials()
    const index = materials.findIndex((m) => m.id === id)
    if (index === -1) return null
    materials[index] = { ...materials[index], ...updates }
    localStorage.setItem("demo_materials", JSON.stringify(materials))
    return materials[index]
  },

  deleteMaterial: (id: string): boolean => {
    const materials = demoStorage.getMaterials()
    const index = materials.findIndex((m) => m.id === id)
    if (index === -1) return false
    materials.splice(index, 1)
    localStorage.setItem("demo_materials", JSON.stringify(materials))
    return true
  },


  // Purchase order operations
  getPurchaseOrders: (): PurchaseOrder[] => {
    if (typeof window === "undefined") return []
    const orders = localStorage.getItem("demo_purchase_orders")
    return orders ? JSON.parse(orders) : []
  },

  addPurchaseOrder: (order: Omit<PurchaseOrder, "id">): PurchaseOrder => {
    const orders = demoStorage.getPurchaseOrders()
    const newOrder: PurchaseOrder = {
      ...order,
      id: Date.now().toString(),
    }
    orders.push(newOrder)
    localStorage.setItem("demo_purchase_orders", JSON.stringify(orders))
    return newOrder
  },

  updatePurchaseOrder: (id: string, updates: Partial<PurchaseOrder>): PurchaseOrder | null => {
    const orders = demoStorage.getPurchaseOrders()
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return null
    orders[index] = { ...orders[index], ...updates }
    localStorage.setItem("demo_purchase_orders", JSON.stringify(orders))
    return orders[index]
  },

  deletePurchaseOrder: (id: string): boolean => {
    const orders = demoStorage.getPurchaseOrders()
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return false
    orders.splice(index, 1)
    localStorage.setItem("demo_purchase_orders", JSON.stringify(orders))
    return true
  },


  // Invoice operations
  getInvoices: (): Invoice[] => {
    if (typeof window === "undefined") return []
    const invoices = localStorage.getItem("demo_invoices")
    return invoices ? JSON.parse(invoices) : []
  },

  addInvoice: (invoice: Omit<Invoice, "id">): Invoice => {
    const invoices = demoStorage.getInvoices()
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
    }
    invoices.push(newInvoice)
    localStorage.setItem("demo_invoices", JSON.stringify(invoices))
    return newInvoice
  },

  updateInvoice: (id: string, updates: Partial<Invoice>): Invoice | null => {
    const invoices = demoStorage.getInvoices()
    const index = invoices.findIndex((i) => i.id === id)
    if (index === -1) return null
    invoices[index] = { ...invoices[index], ...updates }
    localStorage.setItem("demo_invoices", JSON.stringify(invoices))
    return invoices[index]
  },

  deleteInvoice: (id: string): boolean => {
    const invoices = demoStorage.getInvoices()
    const index = invoices.findIndex((i) => i.id === id)
    if (index === -1) return false
    invoices.splice(index, 1)
    localStorage.setItem("demo_invoices", JSON.stringify(invoices))
    return true
  },


  // Employee operations
  getEmployees: (): Employee[] => {
    if (typeof window === "undefined") return []
    const employees = localStorage.getItem("demo_employees")
    return employees ? JSON.parse(employees) : []
  },

  updateEmployee: (id: string, updates: Partial<Employee>): Employee | null => {
    const employees = demoStorage.getEmployees()
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) return null
    employees[index] = { ...employees[index], ...updates }
    localStorage.setItem("demo_employees", JSON.stringify(employees))
    return employees[index]
  },

  deleteEmployee: (id: string): boolean => {
    const employees = demoStorage.getEmployees()
    const index = employees.findIndex((e) => e.id === id)
    if (index === -1) return false
    employees.splice(index, 1)
    localStorage.setItem("demo_employees", JSON.stringify(employees))
    return true
  },


  // Activity log operations
  getActivity: (): ActivityLog[] => {
    if (typeof window === "undefined") return []
    const activity = localStorage.getItem("demo_activity")
    return activity ? JSON.parse(activity) : []
  },

  addActivity: (activity: Omit<ActivityLog, "id">): ActivityLog => {
    const activities = demoStorage.getActivity()
    const newActivity: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
    }
    activities.unshift(newActivity) // Add to beginning for recent activity
    // Keep only last 50 activities
    if (activities.length > 50) {
      activities.splice(50)
    }
    localStorage.setItem("demo_activity", JSON.stringify(activities))
    return newActivity
  },

  updateActivity: (id: string, updates: Partial<ActivityLog>): ActivityLog | null => {
    const activities = demoStorage.getActivity()
    const index = activities.findIndex((a) => a.id === id)
    if (index === -1) return null
    activities[index] = { ...activities[index], ...updates }
    localStorage.setItem("demo_activity", JSON.stringify(activities))
    return activities[index]
  },

  deleteActivity: (id: string): boolean => {
    const activities = demoStorage.getActivity()
    const index = activities.findIndex((a) => a.id === id)
    if (index === -1) return false
    activities.splice(index, 1)
    localStorage.setItem("demo_activity", JSON.stringify(activities))
    return true
  },

  // Mock form submission functions
  mockSubmit: {
    project: async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
      const project = demoStorage.addProject(data)
      demoStorage.addActivity({
        type: "project",
        title: "New Project Created",
        description: `${data.name} project has been created`,
        timestamp: new Date().toISOString(),
        user: "John Constructor",
        status: "success",
      })
      return { success: true, data: project }
    },

    estimate: async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const estimate = demoStorage.addEstimate(data)
      demoStorage.addActivity({
        type: "estimate",
        title: "New Estimate Created",
        description: `${data.estimateNumber} created for ${data.projectName}`,
        timestamp: new Date().toISOString(),
        user: "John Constructor",
        status: "info",
      })
      return { success: true, data: estimate }
    },

    subcontractor: async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const subcontractor = demoStorage.addSubcontractor(data)
      demoStorage.addActivity({
        type: "project",
        title: "New Subcontractor Added",
        description: `${data.company} has been registered`,
        timestamp: new Date().toISOString(),
        user: "John Constructor",
        status: "success",
      })
      return { success: true, data: subcontractor }
    },

    purchaseOrder: async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const order = demoStorage.addPurchaseOrder(data)
      demoStorage.addActivity({
        type: "material",
        title: "Purchase Order Created",
        description: `${data.orderNumber} created for ${data.supplier}`,
        timestamp: new Date().toISOString(),
        user: "John Constructor",
        status: "info",
      })
      return { success: true, data: order }
    },

    invoice: async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const invoice = demoStorage.addInvoice(data)
      demoStorage.addActivity({
        type: "payment",
        title: "Invoice Created",
        description: `${data.invoiceNumber} created for ${data.client}`,
        timestamp: new Date().toISOString(),
        user: "John Constructor",
        status: "info",
      })
      return { success: true, data: invoice }
    },
  },

  // Clear all demo data
  clearAll: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("demo_user")
    localStorage.removeItem("demo_projects")
    localStorage.removeItem("demo_estimates")
    localStorage.removeItem("demo_contracts")
    localStorage.removeItem("demo_subcontractors")
    localStorage.removeItem("demo_materials")
    localStorage.removeItem("demo_purchase_orders")
    localStorage.removeItem("demo_invoices")
    localStorage.removeItem("demo_activity")
  },
}

// Initialize demo data on import
if (typeof window !== "undefined") {
  initializeDemoData()
}
