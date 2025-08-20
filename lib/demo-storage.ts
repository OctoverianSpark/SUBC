// Demo storage utility for construction management system
// Replaces database operations with local storage for demo purposes

// Tipos adaptados al schema de Prisma
export type Role = 'ADMIN' | 'USER'
export type ProjectStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD'
export type EstimateStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'AWARDED' | 'REJECTED'

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: Role
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: number
  jobNumber: string
  name: string
  managerId?: number
  startDate?: string
  endDate?: string
  status: ProjectStatus
}

export interface Task {
  id: number
  name: string
  assignedToId?: number
  dueDate?: string
  projectId: number
}

export interface Estimate {
  id: number
  projectId: number
  estimatorId?: number
  amount: number
  createdAt: string
  status: EstimateStatus
}

export interface Billing {
  id: number
  projectId: number
  dueDate?: string
  amount: number
  issuedAt: string
  paid: boolean
}

export interface Employee {
  id: number
  firstName: string
  lastName: string
  address?: string
  city?: string
}

export interface Classification {
  id: number
  name: string
  craftCode: string
  payRate: number
  effectiveDate: string
}

export interface EmployeeClassification {
  id: number
  employeeId: number
  classificationId: number
  startDate: string
  endDate?: string
}

export interface DailyTimeEntry {
  id: number
  employeeId: number
  projectId: number
  workDate: string
  hoursWorked: number
  overtimeHours?: number
}

export interface WeeklyTimecard {
  id: number
  employeeId: number
  projectId: number
  weekStartDate: string
  notes?: string
}

// Este archivo ha sido deprecado. Toda la lógica de datos ahora usa Prisma y la base de datos real.
