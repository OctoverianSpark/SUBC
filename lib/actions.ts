'use server'
import {
  bondingDb,
  insuranceDb,
  licenseDb,
  documentDb,
  employeeDb,
  materialOrderDb,
  materialRequestDb
} from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { OrderStatus } from '@prisma/client'
// MOCK AUTH ACTIONS (no real authentication)

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }
  const email = formData.get("email")
  const password = formData.get("password")
  if (!email || !password) {
    return { error: "Email and password are required" }
  }
  // Always succeed for demo
  return { success: "Check your email to confirm your account (mock)." }
}

export async function signOut() {
  // No-op for demo
  return { success: "Signed out (mock)." }
}

export async function resendVerification(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }
  const email = formData.get("email")
  if (!email) {
    return { error: "Email is required" }
  }
  // Always succeed for demo
  return { success: "Verification email sent! (mock)" }
}


// Bonding Actions
export async function createBonding(data: {
  projectId: number
  amount: number
  deadline: Date
}) {
  try {
    const bonding = await bondingDb.create(data)
    revalidatePath(`/projects/${data.projectId}`)
    return { success: true, data: bonding }
  } catch (error) {
    console.error('Error creating bonding:', error)
    return { success: false, error: 'Failed to create bonding' }
  }
}

export async function getBondingsByProject(projectId: number) {
  try {
    const bondings = await bondingDb.findAll()
    return bondings.filter(b => b.projectId === projectId)
  } catch (error) {
    console.error('Error fetching bondings:', error)
    return []
  }
}

// Insurance Actions
export async function createInsurance(data: {
  projectId: number
  provider: string
  policyNumber: string
  coverage: string
  startDate: Date
  endDate: Date
}) {
  try {
    const insurance = await insuranceDb.create(data)
    revalidatePath(`/projects/${data.projectId}`)
    return { success: true, data: insurance }
  } catch (error) {
    console.error('Error creating insurance:', error)
    return { success: false, error: 'Failed to create insurance' }
  }
}

export async function getInsurancesByProject(projectId: number) {
  try {
    const insurances = await insuranceDb.findAll()
    return insurances.filter(i => i.projectId === projectId)
  } catch (error) {
    console.error('Error fetching insurances:', error)
    return []
  }
}

// License Actions
export async function createLicense(data: {
  projectId: number
  type: string
  number: string
  issuedBy: string
  validFrom: Date
  validTo: Date
}) {
  try {
    const license = await licenseDb.create(data)
    revalidatePath(`/projects/${data.projectId}`)
    return { success: true, data: license }
  } catch (error) {
    console.error('Error creating license:', error)
    return { success: false, error: 'Failed to create license' }
  }
}

export async function getLicensesByProject(projectId: number) {
  try {
    const licenses = await licenseDb.findAll()
    return licenses.filter(l => l.projectId === projectId)
  } catch (error) {
    console.error('Error fetching licenses:', error)
    return []
  }
}

// Document Actions
export async function createDocument(data: {
  projectId: number
  name: string
  url: string
  uploadedAt?: Date
}) {
  try {
    const document = await documentDb.create({
      ...data,
      uploadedAt: data.uploadedAt || new Date()
    })
    revalidatePath(`/projects/${data.projectId}`)
    return { success: true, data: document }
  } catch (error) {
    console.error('Error creating document:', error)
    return { success: false, error: 'Failed to create document' }
  }
}

export async function getDocumentsByProject(projectId: number) {
  try {
    const documents = await documentDb.findAll()
    return documents.filter(d => d.projectId === projectId)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return []
  }
}

// Material Request Actions
export async function createMaterialRequest(data: {
  projectId: number
  material: string
  quantity: number
  requestedBy: number
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
}) {
  try {
    const request = await materialRequestDb.create(data)
    revalidatePath(`/projects/${data.projectId}`)
    return { success: true, data: request }
  } catch (error) {
    console.error('Error creating material request:', error)
    return { success: false, error: 'Failed to create material request' }
  }
}

// Material Order Actions - Updated to work with frontend format
export async function createMaterialOrder(data: {
  projectId?: number
  requestId?: number
  supplier?: string
  description?: string
  status?: 'PENDING' | 'ORDERED' | 'IN_TRANSIT' | 'DELIVERED' | 'SUBMITTED' | 'APPROVED' | 'SCHEDULED' | 'DELIVERED_TO_OFFICE' | 'DELIVERED_TO_SITE'
  submittedAt?: Date
  approvedAt?: Date
  orderedAt?: Date
  officeETA?: Date
  siteETA?: Date
}) {
  try {
    let requestId = data.requestId
    let supplier = data.supplier || 'TBD'
    
    // If no requestId provided (old frontend format), create a material request first
    if (!requestId && data.projectId && data.description) {
      // Create a material request first
      const materialRequest = await materialRequestDb.create({
        projectId: data.projectId,
        material: data.description,
        quantity: 1, // Default quantity
        requestedBy: 1, // Default user ID - you may want to get this from session
        status: 'PENDING'
      })
      requestId = materialRequest.id
    }
    
    if (!requestId) {
      throw new Error('RequestId is required')
    }
    
    // Map old status values to new ones
    let mappedStatus = data.status
    if (data.status === 'SUBMITTED' || data.status === 'APPROVED' || data.status === 'SCHEDULED') {
      mappedStatus = 'PENDING'
    } else if (data.status === 'DELIVERED_TO_OFFICE' || data.status === 'DELIVERED_TO_SITE') {
      mappedStatus = 'DELIVERED'
    }
    
    const order = await materialOrderDb.create({
      requestId,
      supplier,
      status: mappedStatus || 'PENDING'
    })
    
    // Get the project ID from the material request for revalidation
    const materialRequest = await materialRequestDb.findById(requestId)
    if (materialRequest) {
      revalidatePath(`/projects/${materialRequest.projectId}`)
    } else if (data.projectId) {
      revalidatePath(`/projects/${data.projectId}`)
    }
    
    return { success: true, data: order }
  } catch (error) {
    console.error('Error creating material order:', error)
    return { success: false, error: 'Failed to create material order' }
  }
}

export async function getMaterialRequestsByProject(projectId: number) {
  try {
    return await materialRequestDb.findByProjectId(projectId)
  } catch (error) {
    console.error('Error fetching material requests:', error)
    return []
  }
}

export async function getMaterialOrdersByProject(projectId: number) {
  try {
    return await materialOrderDb.findByProjectId(projectId)
  } catch (error) {
    console.error('Error fetching material orders:', error)
    return []
  }
}
