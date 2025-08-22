// app/billing/[id]/export/simple/route.ts
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { billingDb } from '@/lib/db'
import { jsPDF } from 'jspdf'

function fmtMoney(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(n ?? 0)
}
function padInv(id: number) {
  return `INV-${String(id).padStart(5, '0')}`
}
function fmtDate(d?: Date | null) {
  return d ? new Intl.DateTimeFormat('en-US').format(d) : ''
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (!Number.isFinite(id)) return new NextResponse('Bad Request', { status: 400 })

  // Asegúrate de que findById incluya el project.name:
  // prisma.billing.findUnique({ include: { project: { select: { name: true } } } })
  const billing = await billingDb.findById(id)
  if (!billing) return new NextResponse('Not found', { status: 404 })

  const inv = padInv(billing.id)
  const project = billing.project?.name ?? '—'
  const issued = fmtDate(billing.issuedAt as any)
  const due = fmtDate(billing.dueDate as any)
  const status =
    billing.paid
      ? 'paid'
      : billing.dueDate && new Date(billing.dueDate) < new Date()
        ? 'overdue'
        : 'pending'
  const amount = fmtMoney(billing.amount)

  // jsPDF en Node (unidad: puntos, formato: Letter 612x792)
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })

  const draw = (text: string, x: number, y: number, size = 11, weight: 'normal' | 'bold' = 'normal') => {
    doc.setFont('helvetica', weight)
    doc.setFontSize(size)
    doc.text(String(text ?? ''), x, y)
  }

  // Márgenes
  const left = 72  // 1 inch
  let y = 72

  // Título
  draw('Simple Billing / Invoice', left, y, 18, 'bold')
  y += 28

  // Caja de datos (como una “tabla” simple)
  const colX = [left, left + 98, left + 260, left + 350]
  const rowH = 20

  const rows: [string, string, string, string][] = [
    ['Invoice #', inv, 'Project', project],
    ['Issued', issued, 'Due', due],
    ['Status', status, 'Total Amount', amount]
  ]

  // Marco de la caja
  const boxTop = y - 14
  const boxHeight = rowH * rows.length + 16
  const boxWidth = 468
  doc.setLineWidth(0.5)
  doc.rect(left - 6, boxTop, boxWidth, boxHeight)

  rows.forEach((r, i) => {
    const yy = y + i * rowH
    draw(r[0] + ':', colX[0], yy)
    draw(r[1], colX[1], yy, 11, 'bold')
    draw(r[2] + ':', colX[2], yy)
    draw(r[3], colX[3], yy, 11, 'bold')

    // líneas horizontales internas (opcional)
    if (i < rows.length - 1) {
      doc.line(left - 6, yy + 6, left - 6 + boxWidth, yy + 6)
    }
  })

  y += rowH * rows.length + 32

  // Notas
  draw('Notes / Terms:', left, y)
  y += 16
  // líneas para escribir (simples líneas)
  doc.setLineWidth(0.25)
  for (let i = 0; i < 3; i++) {
    doc.line(left, y, left + 460, y)
    y += 18
  }

  // Respuesta HTTP
  const pdfArrayBuffer = doc.output('arraybuffer')
  return new NextResponse(Buffer.from(pdfArrayBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Simple_${inv}.pdf"`
    }
  })
}
