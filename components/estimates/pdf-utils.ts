import jsPDF from 'jspdf'
import { Estimate } from './estimates-list'

export function downloadEstimatePDF(
  estimate: Estimate,
  projectName: string,
  estimatorName: string
) {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Estimate', 14, 20)
  doc.setFontSize(12)
  doc.text(`Project: ${projectName}`, 14, 35)
  doc.text(`Estimator: ${estimatorName}`, 14, 43)
  doc.text(`Amount: $${estimate.amount}`, 14, 51)
  doc.text(`Status: ${estimate.status}`, 14, 59)
  doc.text(`Created: ${new Date(estimate.createdAt).toLocaleDateString()}`, 14, 67)
  doc.save(`estimate-${estimate.id}.pdf`)
}
