import { notFound } from 'next/navigation'
import {
  projectDb,
  bondingDb,
  insuranceDb,
  licenseDb,
  documentDb
} from '@/lib/db'
import { requireAuthOrRedirect } from '@/lib/cookies'
import ProjectDetailClient from './ProjectDetailClient'

export default async function ProjectDetailPage ({
  params
}: {
  params: { id: string }
}) {
  await requireAuthOrRedirect()

  const project = await projectDb.findById(Number(params.id))
  if (!project) return notFound()

  const bondings = await bondingDb.findAll()
  const insurances = await insuranceDb.findAll()
  const licenses = await licenseDb.findAll()
  const documents = await documentDb.findAll()

  return (
    <ProjectDetailClient
      project={project}
      bondings={bondings}
      insurances={insurances}
      licenses={licenses}
      documents={documents}
    />
  )
}
