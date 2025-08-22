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

export async function updateBonding(id: number, data: {
  projectId?: number
  amount?: number
  deadline?: Date
  provider?: string
}) {
  try {
    const bonding = await bondingDb.update(id, data)
    if (bonding?.projectId) {
      revalidatePath(`/projects/${bonding.projectId}`)
    }
    return { success: true, data: bonding }
  } catch (error) {
    console.error('Error updating bonding:', error)
    return { success: false, error: 'Failed to update bonding' }
  }
}

export async function deleteBonding(id: number) {
  try {
    const bonding = await bondingDb.findById(id)
    await bondingDb.delete(id)
    if (bonding?.projectId) {
      revalidatePath(`/projects/${bonding.projectId}`)
    }
    return { success: true }
  } catch (error) {
    console.error('Error deleting bonding:', error)
    return { success: false, error: 'Failed to delete bonding' }
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

export async function updateInsurance(id: number, data: {
  projectId?: number
  provider?: string
  policyNumber?: string
  coverage?: string
  startDate?: Date
  endDate?: Date
}) {
  try {
    const insurance = await insuranceDb.update(id, data)
    if (insurance?.projectId) {
      revalidatePath(`/projects/${insurance.projectId}`)
    }
    return { success: true, data: insurance }
  } catch (error) {
    console.error('Error updating insurance:', error)
    return { success: false, error: 'Failed to update insurance' }
  }
}

export async function deleteInsurance(id: number) {
  try {
    const insurance = await insuranceDb.findById(id)
    await insuranceDb.delete(id)
    if (insurance?.projectId) {
      revalidatePath(`/projects/${insurance.projectId}`)
    }
    return { success: true }
  } catch (error) {
    console.error('Error deleting insurance:', error)
    return { success: false, error: 'Failed to delete insurance' }
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

export async function updateLicense(id: number, data: {
  projectId?: number
  type?: string
  number?: string
  issuedBy?: string
  validFrom?: Date
  validTo?: Date
}) {
  try {
    const license = await licenseDb.update(id, data)
    if (license?.projectId) {
      revalidatePath(`/projects/${license.projectId}`)
    }
    return { success: true, data: license }
  } catch (error) {
    console.error('Error updating license:', error)
    return { success: false, error: 'Failed to update license' }
  }
}

export async function deleteLicense(id: number) {
  try {
    const license = await licenseDb.findById(id)
    await licenseDb.delete(id)
    if (license?.projectId) {
      revalidatePath(`/projects/${license.projectId}`)
    }
    return { success: true }
  } catch (error) {
    console.error('Error deleting license:', error)
    return { success: false, error: 'Failed to delete license' }
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

export async function updateDocument(id: number, data: {
  projectId?: number
  name?: string
  url?: string
  uploadedAt?: Date
}) {
  try {
    const document = await documentDb.update(id, data)
    if (document?.projectId) {
      revalidatePath(`/projects/${document.projectId}`)
    }
    return { success: true, data: document }
  } catch (error) {
    console.error('Error updating document:', error)
    return { success: false, error: 'Failed to update document' }
  }
}

export async function deleteDocument(id: number) {
  try {
    const document = await documentDb.findById(id)
    await documentDb.delete(id)
    if (document?.projectId) {
      revalidatePath(`/projects/${document.projectId}`)
    }
    return { success: true }
  } catch (error) {
    console.error('Error deleting document:', error)
    return { success: false, error: 'Failed to delete document' }
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

// Material Order Actions - Updated to work with new form fields
export async function createMaterialOrder(data: {
  projectId?: number
  requestId?: number
  supplier?: string
  description?: string
  quantity?: number
  unitPrice?: number
  totalAmount?: number
  status?: 'PENDING' | 'ORDERED' | 'IN_TRANSIT' | 'DELIVERED'
  submittedAt?: Date
  approvedAt?: Date
  orderedAt?: Date
  expectedDelivery?: Date
  notes?: string
}) {
  try {
    let requestId = data.requestId
    let supplier = data.supplier || 'TBD'
    
    // If no requestId provided, create a material request first
    if (!requestId && data.projectId && data.description) {
      // Create a material request first
      const materialRequest = await materialRequestDb.create({
        projectId: data.projectId,
        material: data.description,
        quantity: data.quantity || 1, // Use provided quantity or default to 1
        requestedBy: 1, // Default user ID - you may want to get this from session
        status: 'PENDING'
      })
      requestId = materialRequest.id
    }
    
    if (!requestId) {
      throw new Error('RequestId is required')
    }
    
    // Create the material order with all the proper fields
    const order = await materialOrderDb.create({
      requestId,
      supplier,
      description: data.description,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      totalAmount: data.totalAmount,
      status: data.status || 'PENDING',
      submittedAt: data.submittedAt,
      approvedAt: data.approvedAt,
      orderedAt: data.orderedAt,
      expectedDelivery: data.expectedDelivery,
      notes: data.notes
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

export async function updateMaterialOrder(id: number, data: {
  requestId?: number
  supplier?: string
  description?: string
  quantity?: number
  unitPrice?: number
  totalAmount?: number
  status?: 'PENDING' | 'ORDERED' | 'IN_TRANSIT' | 'DELIVERED'
  submittedAt?: Date
  approvedAt?: Date
  orderedAt?: Date
  expectedDelivery?: Date
  notes?: string
}) {
  try {
    const order = await materialOrderDb.update(id, data)
    // Get project ID for revalidation
    if (order?.requestId) {
      const materialRequest = await materialRequestDb.findById(order.requestId)
      if (materialRequest?.projectId) {
        revalidatePath(`/projects/${materialRequest.projectId}`)
      }
    }
    return { success: true, data: order }
  } catch (error) {
    console.error('Error updating material order:', error)
    return { success: false, error: 'Failed to update material order' }
  }
}

export async function deleteMaterialOrder(id: number) {
  try {
    const order = await materialOrderDb.findById(id)
    await materialOrderDb.delete(id)
    // Get project ID for revalidation
    if (order?.requestId) {
      const materialRequest = await materialRequestDb.findById(order.requestId)
      if (materialRequest?.projectId) {
        revalidatePath(`/projects/${materialRequest.projectId}`)
      }
    }
    return { success: true }
  } catch (error) {
    console.error('Error deleting material order:', error)
    return { success: false, error: 'Failed to delete material order' }
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
