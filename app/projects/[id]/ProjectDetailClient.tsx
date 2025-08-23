'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import {
  createBonding,
  createInsurance,
  createLicense,
  createDocument,
  createMaterialOrder,
  updateBonding,
  updateInsurance,
  updateLicense,
  updateDocument,
  updateMaterialOrder,
  deleteBonding,
  deleteInsurance,
  deleteLicense,
  deleteDocument,
  deleteMaterialOrder
} from '@/lib/actions'

// Modal Component
function Modal ({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center p-6 border-b'>
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            <X className='h-6 w-6' />
          </button>
        </div>
        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}

// Bonding Form Component
function BondingForm ({ projectId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    provider: '',
    amount: '',
    deadline: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.provider || !formData.amount || !formData.deadline) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const result = await createBonding({
        projectId,
        amount: parseFloat(formData.amount),
        deadline: new Date(formData.deadline),
        provider: formData.provider
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        console.log(result)

        alert(result.error || 'Error creating bonding. Please try again.')
      }
    } catch (error) {
      console.error('Error creating bonding:', error)
      alert('Error creating bonding. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Provider
        </label>
        <input
          type='text'
          name='provider'
          value={formData.provider}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Amount ($)
        </label>
        <input
          type='number'
          name='amount'
          value={formData.amount}
          onChange={handleChange}
          min='0'
          step='0.01'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Deadline
          </label>
          <input
            type='date'
            name='deadline'
            value={formData.deadline}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Adding...' : 'Add Bonding'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Insurance Form Component
function InsuranceForm ({ projectId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    provider: '',
    policyNumber: '',
    coverage: '',
    startDate: '',
    endDate: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (
      !formData.provider ||
      !formData.policyNumber ||
      !formData.coverage ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const result = await createInsurance({
        projectId,
        provider: formData.provider,
        policyNumber: formData.policyNumber,
        coverage: formData.coverage,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error creating insurance. Please try again.')
      }
    } catch (error) {
      console.error('Error creating insurance:', error)
      alert('Error creating insurance. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Provider
        </label>
        <input
          type='text'
          name='provider'
          value={formData.provider}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Policy Number
        </label>
        <input
          type='text'
          name='policyNumber'
          value={formData.policyNumber}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Coverage Description
        </label>
        <input
          type='text'
          name='coverage'
          value={formData.coverage}
          onChange={handleChange}
          placeholder='e.g., General Liability, Workers Comp'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Start Date
          </label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            End Date
          </label>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Adding...' : 'Add Insurance'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// License Form Component
function LicenseForm ({ projectId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: '',
    number: '',
    issuedBy: '',
    validFrom: '',
    validTo: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (
      !formData.type ||
      !formData.number ||
      !formData.issuedBy ||
      !formData.validFrom ||
      !formData.validTo
    ) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const result = await createLicense({
        projectId,
        type: formData.type,
        number: formData.number,
        issuedBy: formData.issuedBy,
        validFrom: new Date(formData.validFrom),
        validTo: new Date(formData.validTo)
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error creating license. Please try again.')
      }
    } catch (error) {
      console.error('Error creating license:', error)
      alert('Error creating license. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          License Type
        </label>
        <input
          type='text'
          name='type'
          value={formData.type}
          onChange={handleChange}
          placeholder='e.g., Building Permit, Electrical License'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          License Number
        </label>
        <input
          type='text'
          name='number'
          value={formData.number}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Issued By
        </label>
        <input
          type='text'
          name='issuedBy'
          value={formData.issuedBy}
          onChange={handleChange}
          placeholder='e.g., City Building Department'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Valid From
          </label>
          <input
            type='date'
            name='validFrom'
            value={formData.validFrom}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Valid To
          </label>
          <input
            type='date'
            name='validTo'
            value={formData.validTo}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Adding...' : 'Add License'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Material Order Form Component
function MaterialOrderForm ({ projectId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    supplier: '',
    description: '',
    quantity: '',
    unitPrice: '',
    totalAmount: '',
    status: 'PENDING',
    submittedAt: '',
    approvedAt: '',
    orderedAt: '',
    expectedDelivery: '',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.description || !formData.supplier) {
      alert('Please fill in the description and supplier.')
      return
    }

    setIsLoading(true)

    try {
      const result = await createMaterialOrder({
        projectId,
        supplier: formData.supplier,
        description: formData.description,
        quantity: formData.quantity ? parseFloat(formData.quantity) : undefined,
        unitPrice: formData.unitPrice
          ? parseFloat(formData.unitPrice)
          : undefined,
        totalAmount: formData.totalAmount
          ? parseFloat(formData.totalAmount)
          : undefined,
        status: formData.status,
        submittedAt: formData.submittedAt
          ? new Date(formData.submittedAt)
          : undefined,
        approvedAt: formData.approvedAt
          ? new Date(formData.approvedAt)
          : undefined,
        orderedAt: formData.orderedAt
          ? new Date(formData.orderedAt)
          : undefined,
        expectedDelivery: formData.expectedDelivery
          ? new Date(formData.expectedDelivery)
          : undefined,
        notes: formData.notes || undefined
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(
          result.error || 'Error creating material order. Please try again.'
        )
      }
    } catch (error) {
      console.error('Error creating material order:', error)
      alert('Error creating material order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Supplier *
        </label>
        <input
          type='text'
          name='supplier'
          value={formData.supplier}
          onChange={handleChange}
          placeholder='e.g., ABC Supply Co.'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Description *
        </label>
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='e.g., 2x4 lumber, drywall sheets'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Quantity
          </label>
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            min='0'
            step='0.01'
            placeholder='100'
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Unit Price ($)
          </label>
          <input
            type='number'
            name='unitPrice'
            value={formData.unitPrice}
            onChange={handleChange}
            min='0'
            step='0.01'
            placeholder='25.50'
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Total Amount ($)
          </label>
          <input
            type='number'
            name='totalAmount'
            value={
              formData.totalAmount ||
              Number(formData.unitPrice) * Number(formData.quantity) ||
              0
            }
            onChange={handleChange}
            min='0'
            step='0.01'
            placeholder='2550.00'
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Status
        </label>
        <select
          name='status'
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        >
          <option value='PENDING'>Pending</option>
          <option value='ORDERED'>Ordered</option>
          <option value='IN_TRANSIT'>In Transit</option>
          <option value='DELIVERED'>Delivered</option>
        </select>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Submitted At
          </label>
          <input
            type='date'
            name='submittedAt'
            value={formData.submittedAt}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Approved At
          </label>
          <input
            type='date'
            name='approvedAt'
            value={formData.approvedAt}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Ordered At
          </label>
          <input
            type='date'
            name='orderedAt'
            value={formData.orderedAt}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Expected Delivery
          </label>
          <input
            type='date'
            name='expectedDelivery'
            value={formData.expectedDelivery}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Notes
        </label>
        <textarea
          name='notes'
          value={formData.notes}
          onChange={handleChange}
          placeholder='Additional notes or special instructions...'
          rows='3'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Adding...' : 'Add Material Order'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Document Preview Modal Component
function DocumentPreviewModal ({ doc, onClose }) {
  if (!doc) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden relative'>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b'>
          <h3 className='text-lg font-semibold text-gray-900 truncate'>
            {doc.name}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            <X className='h-6 w-6' />
          </button>
        </div>

        {/* Content */}
        <div className='flex justify-center items-center bg-gray-100'>
          <iframe
            src={doc.url}
            title={doc.name}
            className='w-full h-[75vh] border-0'
          />
        </div>
      </div>
    </div>
  )
}
// Edit Bonding Form Component
function EditBondingForm ({ bonding, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    provider: bonding.provider || '',
    amount: bonding.amount?.toString() || '',
    deadline: bonding.deadline
      ? new Date(bonding.deadline).toISOString().split('T')[0]
      : ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.provider || !formData.amount || !formData.deadline) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const result = await updateBonding(bonding.id, {
        provider: formData.provider,
        amount: parseFloat(formData.amount),
        deadline: new Date(formData.deadline)
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error updating bonding. Please try again.')
      }
    } catch (error) {
      console.error('Error updating bonding:', error)
      alert('Error updating bonding. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Provider
        </label>
        <input
          type='text'
          name='provider'
          value={formData.provider}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Amount ($)
        </label>
        <input
          type='number'
          name='amount'
          value={formData.amount}
          onChange={handleChange}
          min='0'
          step='0.01'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Deadline
        </label>
        <input
          type='date'
          name='deadline'
          value={formData.deadline}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Updating...' : 'Update Bonding'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Edit Insurance Form Component
function EditInsuranceForm ({ insurance, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    provider: insurance.provider || '',
    policyNumber: insurance.policyNumber || '',
    coverage: insurance.coverage || '',
    startDate: insurance.startDate
      ? new Date(insurance.startDate).toISOString().split('T')[0]
      : '',
    endDate: insurance.endDate
      ? new Date(insurance.endDate).toISOString().split('T')[0]
      : ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (
      !formData.provider ||
      !formData.policyNumber ||
      !formData.coverage ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const result = await updateInsurance(insurance.id, {
        provider: formData.provider,
        policyNumber: formData.policyNumber,
        coverage: formData.coverage,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error updating insurance. Please try again.')
      }
    } catch (error) {
      console.error('Error updating insurance:', error)
      alert('Error updating insurance. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Provider
        </label>
        <input
          type='text'
          name='provider'
          value={formData.provider}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Policy Number
        </label>
        <input
          type='text'
          name='policyNumber'
          value={formData.policyNumber}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Coverage Description
        </label>
        <input
          type='text'
          name='coverage'
          value={formData.coverage}
          onChange={handleChange}
          placeholder='e.g., General Liability, Workers Comp'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Start Date
          </label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            End Date
          </label>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Updating...' : 'Update Insurance'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Edit License Form Component
function EditLicenseForm ({ license, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: license.type || '',
    number: license.number || '',
    issuedBy: license.issuedBy || '',
    validFrom: license.validFrom
      ? new Date(license.validFrom).toISOString().split('T')[0]
      : '',
    validTo: license.validTo
      ? new Date(license.validTo).toISOString().split('T')[0]
      : ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (
      !formData.type ||
      !formData.number ||
      !formData.issuedBy ||
      !formData.validFrom ||
      !formData.validTo
    ) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const result = await updateLicense(license.id, {
        type: formData.type,
        number: formData.number,
        issuedBy: formData.issuedBy,
        validFrom: new Date(formData.validFrom),
        validTo: new Date(formData.validTo)
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error updating license. Please try again.')
      }
    } catch (error) {
      console.error('Error updating license:', error)
      alert('Error updating license. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          License Type
        </label>
        <input
          type='text'
          name='type'
          value={formData.type}
          onChange={handleChange}
          placeholder='e.g., Building Permit, Electrical License'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          License Number
        </label>
        <input
          type='text'
          name='number'
          value={formData.number}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Issued By
        </label>
        <input
          type='text'
          name='issuedBy'
          value={formData.issuedBy}
          onChange={handleChange}
          placeholder='e.g., City Building Department'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Valid From
          </label>
          <input
            type='date'
            name='validFrom'
            value={formData.validFrom}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Valid To
          </label>
          <input
            type='date'
            name='validTo'
            value={formData.validTo}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Updating...' : 'Update License'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Edit Material Order Form Component
function EditMaterialOrderForm ({ materialOrder, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    supplier: materialOrder.supplier || '',
    description: materialOrder.description || '',
    quantity: materialOrder.quantity?.toString() || '',
    unitPrice: materialOrder.unitPrice?.toString() || '',
    totalAmount: materialOrder.totalAmount?.toString() || '',
    status: materialOrder.status || 'PENDING',
    submittedAt: materialOrder.submittedAt
      ? new Date(materialOrder.submittedAt).toISOString().split('T')[0]
      : '',
    approvedAt: materialOrder.approvedAt
      ? new Date(materialOrder.approvedAt).toISOString().split('T')[0]
      : '',
    orderedAt: materialOrder.orderedAt
      ? new Date(materialOrder.orderedAt).toISOString().split('T')[0]
      : '',
    expectedDelivery: materialOrder.expectedDelivery
      ? new Date(materialOrder.expectedDelivery).toISOString().split('T')[0]
      : '',
    notes: materialOrder.notes || ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.description || !formData.supplier) {
      alert('Please fill in the description and supplier.')
      return
    }

    setIsLoading(true)

    try {
      const result = await updateMaterialOrder(materialOrder.id, {
        supplier: formData.supplier,
        description: formData.description,
        quantity: formData.quantity ? parseFloat(formData.quantity) : undefined,
        unitPrice: formData.unitPrice
          ? parseFloat(formData.unitPrice)
          : undefined,
        totalAmount: formData.totalAmount
          ? parseFloat(formData.totalAmount)
          : undefined,
        status: formData.status,
        submittedAt: formData.submittedAt
          ? new Date(formData.submittedAt)
          : undefined,
        approvedAt: formData.approvedAt
          ? new Date(formData.approvedAt)
          : undefined,
        orderedAt: formData.orderedAt
          ? new Date(formData.orderedAt)
          : undefined,
        expectedDelivery: formData.expectedDelivery
          ? new Date(formData.expectedDelivery)
          : undefined,
        notes: formData.notes || undefined
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(
          result.error || 'Error updating material order. Please try again.'
        )
      }
    } catch (error) {
      console.error('Error updating material order:', error)
      alert('Error updating material order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Supplier *
        </label>
        <input
          type='text'
          name='supplier'
          value={formData.supplier}
          onChange={handleChange}
          placeholder='e.g., ABC Supply Co.'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Description *
        </label>
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='e.g., 2x4 lumber, drywall sheets'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Quantity
          </label>
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            min='0'
            step='0.01'
            placeholder='100'
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Unit Price ($)
          </label>
          <input
            type='number'
            name='unitPrice'
            value={formData.unitPrice}
            onChange={handleChange}
            min='0'
            step='0.01'
            placeholder='25.50'
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Total Amount ($)
          </label>
          <input
            type='number'
            name='totalAmount'
            value={
              formData.totalAmount ||
              Number(formData.unitPrice) * Number(formData.quantity) ||
              0
            }
            onChange={handleChange}
            min='0'
            step='0.01'
            placeholder='2550.00'
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Status
        </label>
        <select
          name='status'
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        >
          <option value='PENDING'>Pending</option>
          <option value='ORDERED'>Ordered</option>
          <option value='IN_TRANSIT'>In Transit</option>
          <option value='DELIVERED'>Delivered</option>
        </select>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Submitted At
          </label>
          <input
            type='date'
            name='submittedAt'
            value={formData.submittedAt}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Approved At
          </label>
          <input
            type='date'
            name='approvedAt'
            value={formData.approvedAt}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Ordered At
          </label>
          <input
            type='date'
            name='orderedAt'
            value={formData.orderedAt}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Expected Delivery
          </label>
          <input
            type='date'
            name='expectedDelivery'
            value={formData.expectedDelivery}
            onChange={handleChange}
            disabled={isLoading}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Notes
        </label>
        <textarea
          name='notes'
          value={formData.notes}
          onChange={handleChange}
          placeholder='Additional notes or special instructions...'
          rows='3'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Updating...' : 'Update Material Order'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Edit Document Form Component
function EditDocumentForm ({ document, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: document.name || '',
    url: document.url || '',
    file: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.name) {
      alert('Please provide a document name.')
      return
    }

    if (!formData.file && !formData.url) {
      alert('Please either upload a file or provide a URL.')
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, you'd upload the file first and get a URL
      const documentUrl = formData.file
        ? `uploads/${formData.file.name}`
        : formData.url

      const result = await updateDocument(document.id, {
        name: formData.name,
        url: documentUrl
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error updating document. Please try again.')
      }
    } catch (error) {
      console.error('Error updating document:', error)
      alert('Error updating document. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        file: e.target.files[0]
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Document Name
        </label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Upload New File (optional)
        </label>
        <input
          type='file'
          onChange={handleChange}
          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
        <p className='text-sm text-gray-500 mt-1'>
          Leave empty to keep current file, or update the URL below
        </p>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Document URL
        </label>
        <input
          type='url'
          name='url'
          value={formData.url}
          onChange={handleChange}
          placeholder='https://example.com/document.pdf'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Updating...' : 'Update Document'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Document Form Component
function DocumentForm ({ projectId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    file: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.name) {
      alert('Please provide a document name.')
      return
    }

    if (!formData.file && !formData.url) {
      alert('Please either upload a file or provide a URL.')
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, you'd upload the file first and get a URL
      const documentUrl = formData.file
        ? `uploads/${formData.file.name}`
        : formData.url

      const result = await createDocument({
        projectId,
        name: formData.name,
        url: documentUrl,
        uploadedAt: new Date()
      })

      if (result.success) {
        onSubmit(result.data)
      } else {
        alert(result.error || 'Error creating document. Please try again.')
      }
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Error creating document. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        file: e.target.files[0]
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Document Name
        </label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Upload File
        </label>
        <input
          type='file'
          onChange={handleChange}
          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
        <p className='text-sm text-gray-500 mt-1'>
          Or provide a URL below if the document is hosted elsewhere
        </p>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Document URL (optional)
        </label>
        <input
          type='url'
          name='url'
          value={formData.url}
          onChange={handleChange}
          placeholder='https://example.com/document.pdf'
          disabled={isLoading}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
        />
      </div>

      <div className='flex gap-2 pt-4'>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          {isLoading ? 'Adding...' : 'Add Document'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Main Project Detail Client Component
export default function ProjectDetailClient ({
  project,
  bondings,
  insurances,
  licenses,
  documents,
  materialOrders
}) {
  const [projectBondings, setProjectBondings] = useState(
    bondings.filter(b => b.projectId === project.id)
  )
  const [projectInsurances, setProjectInsurances] = useState(
    insurances.filter(i => i.projectId === project.id)
  )
  const [projectLicenses, setProjectLicenses] = useState(
    licenses.filter(l => l.projectId === project.id)
  )
  const [projectDocuments, setProjectDocuments] = useState(
    documents.filter(d => d.projectId === project.id)
  )
  const [projectMaterialOrders, setProjectMaterialOrders] = useState(
    materialOrders // materialOrders are already filtered by projectId in the server
  )

  const [activeModal, setActiveModal] = useState(null)
  const [previewDoc, setPreviewDoc] = useState(null) // 👉 aquí el estado
  // Handle form submissions
  const handleBondingSubmit = bondingData => {
    setProjectBondings(prev => [...prev, bondingData])
    setActiveModal(null)
  }

  const handleInsuranceSubmit = insuranceData => {
    setProjectInsurances(prev => [...prev, insuranceData])
    setActiveModal(null)
  }

  const handleLicenseSubmit = licenseData => {
    setProjectLicenses(prev => [...prev, licenseData])
    setActiveModal(null)
  }

  const handleDocumentSubmit = documentData => {
    setProjectDocuments(prev => [...prev, documentData])
    setActiveModal(null)
  }

  const handleMaterialOrderSubmit = orderData => {
    setProjectMaterialOrders(prev => [...prev, orderData])
    setActiveModal(null)
  }

  // Handle edit submissions
  const handleBondingEdit = bondingData => {
    setProjectBondings(prev =>
      prev.map(b => (b.id === bondingData.id ? bondingData : b))
    )
    setActiveModal(null)
  }

  const handleInsuranceEdit = insuranceData => {
    setProjectInsurances(prev =>
      prev.map(i => (i.id === insuranceData.id ? insuranceData : i))
    )
    setActiveModal(null)
  }

  const handleLicenseEdit = licenseData => {
    setProjectLicenses(prev =>
      prev.map(l => (l.id === licenseData.id ? licenseData : l))
    )
    setActiveModal(null)
  }

  const handleDocumentEdit = documentData => {
    setProjectDocuments(prev =>
      prev.map(d => (d.id === documentData.id ? documentData : d))
    )
    setActiveModal(null)
  }

  const handleMaterialOrderEdit = orderData => {
    setProjectMaterialOrders(prev =>
      prev.map(o => (o.id === orderData.id ? orderData : o))
    )
    setActiveModal(null)
  }

  // Helper functions to find items by ID
  const findBondingById = id => projectBondings.find(b => b.id === id)
  const findInsuranceById = id => projectInsurances.find(i => i.id === id)
  const findLicenseById = id => projectLicenses.find(l => l.id === id)
  const findDocumentById = id => projectDocuments.find(d => d.id === id)
  const findMaterialOrderById = id =>
    projectMaterialOrders.find(o => o.id === id)

  const handleModalClose = () => {
    setActiveModal(null)
  }

  // Handle delete operations
  const handleDelete = async (type, id) => {
    const confirmMessage = `Are you sure you want to delete this ${type}? This action cannot be undone.`
    if (!confirm(confirmMessage)) {
      return
    }

    try {
      // Call appropriate delete action based on type
      let result
      switch (type) {
        case 'bonding':
          result = await deleteBonding(id)
          if (result.success) {
            setProjectBondings(prev => prev.filter(b => b.id !== id))
          }
          break
        case 'insurance':
          result = await deleteInsurance(id)
          if (result.success) {
            setProjectInsurances(prev => prev.filter(i => i.id !== id))
          }
          break
        case 'license':
          result = await deleteLicense(id)
          if (result.success) {
            setProjectLicenses(prev => prev.filter(l => l.id !== id))
          }
          break
        case 'materialOrder':
          result = await deleteMaterialOrder(id)
          if (result.success) {
            setProjectMaterialOrders(prev => prev.filter(o => o.id !== id))
          }
          break
        case 'document':
          result = await deleteDocument(id)
          if (result.success) {
            setProjectDocuments(prev => prev.filter(d => d.id !== id))
          }
          break
        default:
          throw new Error(`Unknown delete type: ${type}`)
      }

      if (!result.success) {
        alert(result.error || `Error deleting ${type}. Please try again.`)
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
      alert(`Error deleting ${type}. Please try again.`)
    }
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Project: {project.name}
          </h1>
          <div className='text-sm text-gray-600'>
            Job Number: {project.jobNumber} | Status: {project.status}
          </div>
        </div>

        <div className='space-y-8'>
          {/* Bondings Section */}
          <section className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Bondings</h2>
              <button
                onClick={() => setActiveModal('bonding')}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors'
              >
                Add Bonding
              </button>
            </div>
            {projectBondings.length > 0 ? (
              <div className='space-y-3'>
                {projectBondings.map(b => (
                  <div
                    key={b.id}
                    className='border-l-4 border-blue-400 pl-4 py-3 bg-blue-50 rounded-r-md'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className='font-medium text-gray-900'>
                          {b.provider}
                        </div>
                        <div className='text-sm text-gray-700'>
                          Amount: ${b.amount?.toLocaleString()}
                        </div>
                        <div className='text-sm text-gray-500'>
                          Deadline: {formatDate(b.deadline)}
                        </div>
                      </div>
                      <div className='flex gap-2 ml-4'>
                        <button
                          onClick={() => setActiveModal(`editBonding-${b.id}`)}
                          className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('bonding', b.id)}
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No bondings added yet.</p>
            )}
          </section>

          {/* Insurances Section */}
          <section className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Insurances</h2>
              <button
                onClick={() => setActiveModal('insurance')}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors'
              >
                Add Insurance
              </button>
            </div>
            {projectInsurances.length > 0 ? (
              <div className='space-y-3'>
                {projectInsurances.map(i => (
                  <div
                    key={i.id}
                    className='border-l-4 border-green-400 pl-4 py-3 bg-green-50 rounded-r-md'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className='font-medium text-gray-900'>
                          {i.provider}
                        </div>
                        <div className='text-sm text-gray-700'>
                          Policy: {i.policyNumber} | Coverage: {i.coverage}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {formatDate(i.startDate)} - {formatDate(i.endDate)}
                        </div>
                      </div>
                      <div className='flex gap-2 ml-4'>
                        <button
                          onClick={() =>
                            setActiveModal(`editInsurance-${i.id}`)
                          }
                          className='text-green-600 hover:text-green-800 text-sm font-medium'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('insurance', i.id)}
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No insurances added yet.</p>
            )}
          </section>

          {/* Licenses Section */}
          <section className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Licenses</h2>
              <button
                onClick={() => setActiveModal('license')}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors'
              >
                Add License
              </button>
            </div>
            {projectLicenses.length > 0 ? (
              <div className='space-y-3'>
                {projectLicenses.map(l => (
                  <div
                    key={l.id}
                    className='border-l-4 border-purple-400 pl-4 py-3 bg-purple-50 rounded-r-md'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className='font-medium text-gray-900'>
                          {l.type}
                        </div>
                        <div className='text-sm text-gray-700'>
                          #{l.number} | Issued by: {l.issuedBy}
                        </div>
                        <div className='text-sm text-gray-500'>
                          Valid: {formatDate(l.validFrom)} -{' '}
                          {formatDate(l.validTo)}
                        </div>
                      </div>
                      <div className='flex gap-2 ml-4'>
                        <button
                          onClick={() => setActiveModal(`editLicense-${l.id}`)}
                          className='text-purple-600 hover:text-purple-800 text-sm font-medium'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('license', l.id)}
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No licenses added yet.</p>
            )}
          </section>

          {/* Material Orders Section */}
          <section className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Material Orders</h2>
              <button
                onClick={() => setActiveModal('materialOrder')}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors'
              >
                Add Material Order
              </button>
            </div>
            {projectMaterialOrders.length > 0 ? (
              <div className='space-y-3'>
                {projectMaterialOrders.map(o => (
                  <div
                    key={o.id}
                    className='border-l-4 border-red-400 pl-4 py-3 bg-red-50 rounded-r-md'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className='font-medium text-gray-900'>
                          {/* Display material from MaterialRequest or description from MaterialOrder */}
                          {o.materialRequest?.material ||
                            o.description ||
                            'Material Order'}
                        </div>
                        <div className='text-sm text-gray-700'>
                          Supplier: {o.supplier} | Status: {o.status}
                          {o.quantity && o.unitPrice && (
                            <span>
                              {' '}
                              | Qty: {o.quantity} @ ${o.unitPrice}
                            </span>
                          )}
                          {o.totalAmount && (
                            <span>
                              {' '}
                              | Total: ${o.totalAmount.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className='text-sm text-gray-500'>
                          <span>Ordered: {formatDate(o.orderDate)} </span>
                          {o.expectedDelivery && (
                            <span>
                              {' '}
                              | Expected: {formatDate(o.expectedDelivery)}
                            </span>
                          )}
                          {o.materialRequest && (
                            <div className='mt-1 text-xs'>
                              Requested by:{' '}
                              {o.materialRequest.requester?.name || 'User'} on{' '}
                              {formatDate(o.materialRequest.requestedAt)}
                              {o.materialRequest.quantity && (
                                <span>
                                  {' '}
                                  | Requested Qty: {o.materialRequest.quantity}
                                </span>
                              )}
                            </div>
                          )}
                          {o.notes && (
                            <div className='mt-1 text-xs italic'>
                              Notes: {o.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='flex gap-2 ml-4'>
                        <button
                          onClick={() =>
                            setActiveModal(`editMaterialOrder-${o.id}`)
                          }
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('materialOrder', o.id)}
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No material orders added yet.</p>
            )}
          </section>

          {/* Documents Section */}
          <section className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Documents</h2>
              <button
                onClick={() => setActiveModal('document')}
                className='bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors'
              >
                Add Document
              </button>
            </div>
            {projectDocuments.length > 0 ? (
              <div className='space-y-3'>
                {projectDocuments.map(d => (
                  <div
                    key={d.id}
                    className='border-l-4 border-orange-400 pl-4 py-3 bg-orange-50 rounded-r-md'
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className='font-medium text-gray-900'>
                          {d.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          Uploaded: {formatDate(d.uploadedAt)}
                        </div>
                        {d.url && (
                          <button
                            onClick={() => setPreviewDoc(d)}
                            className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors mt-2'
                          >
                            View Document
                          </button>
                        )}
                      </div>
                      <div className='flex gap-2 ml-4'>
                        <button
                          onClick={() => setActiveModal(`editDocument-${d.id}`)}
                          className='text-orange-600 hover:text-orange-800 text-sm font-medium'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('document', d.id)}
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No documents added yet.</p>
            )}
          </section>
        </div>

        {/* Modals */}
        <Modal
          isOpen={activeModal === 'bonding'}
          onClose={handleModalClose}
          title='Add New Bonding'
        >
          <BondingForm
            projectId={project.id}
            onSubmit={handleBondingSubmit}
            onCancel={handleModalClose}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'insurance'}
          onClose={handleModalClose}
          title='Add New Insurance'
        >
          <InsuranceForm
            projectId={project.id}
            onSubmit={handleInsuranceSubmit}
            onCancel={handleModalClose}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'license'}
          onClose={handleModalClose}
          title='Add New License'
        >
          <LicenseForm
            projectId={project.id}
            onSubmit={handleLicenseSubmit}
            onCancel={handleModalClose}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'materialOrder'}
          onClose={handleModalClose}
          title='Add New Material Order'
        >
          <MaterialOrderForm
            projectId={project.id}
            onSubmit={handleMaterialOrderSubmit}
            onCancel={handleModalClose}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'document'}
          onClose={handleModalClose}
          title='Add New Document'
        >
          <DocumentForm
            projectId={project.id}
            onSubmit={handleDocumentSubmit}
            onCancel={handleModalClose}
          />
        </Modal>
        {/* Edit Modals */}
        {projectBondings.map(bonding => (
          <Modal
            key={`edit-bonding-${bonding.id}`}
            isOpen={activeModal === `editBonding-${bonding.id}`}
            onClose={handleModalClose}
            title='Edit Bonding'
          >
            <EditBondingForm
              bonding={bonding}
              onSubmit={handleBondingEdit}
              onCancel={handleModalClose}
            />
          </Modal>
        ))}

        {projectInsurances.map(insurance => (
          <Modal
            key={`edit-insurance-${insurance.id}`}
            isOpen={activeModal === `editInsurance-${insurance.id}`}
            onClose={handleModalClose}
            title='Edit Insurance'
          >
            <EditInsuranceForm
              insurance={insurance}
              onSubmit={handleInsuranceEdit}
              onCancel={handleModalClose}
            />
          </Modal>
        ))}

        {projectLicenses.map(license => (
          <Modal
            key={`edit-license-${license.id}`}
            isOpen={activeModal === `editLicense-${license.id}`}
            onClose={handleModalClose}
            title='Edit License'
          >
            <EditLicenseForm
              license={license}
              onSubmit={handleLicenseEdit}
              onCancel={handleModalClose}
            />
          </Modal>
        ))}

        {projectMaterialOrders.map(order => (
          <Modal
            key={`edit-order-${order.id}`}
            isOpen={activeModal === `editMaterialOrder-${order.id}`}
            onClose={handleModalClose}
            title='Edit Material Order'
          >
            <EditMaterialOrderForm
              materialOrder={order}
              onSubmit={handleMaterialOrderEdit}
              onCancel={handleModalClose}
            />
          </Modal>
        ))}

        {projectDocuments.map(document => (
          <Modal
            key={`edit-document-${document.id}`}
            isOpen={activeModal === `editDocument-${document.id}`}
            onClose={handleModalClose}
            title='Edit Document'
          >
            <EditDocumentForm
              document={document}
              onSubmit={handleDocumentEdit}
              onCancel={handleModalClose}
            />
          </Modal>
        ))}

        <DocumentPreviewModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      </main>
    </div>
  )
}
