import { projectDb, userDb } from '@/lib/db'

export async function getProjectsAndUsers() {
  const [projects, users] = await Promise.all([
    projectDb.findAll(),
    userDb.findAll()
  ])
  return {
    projects: projects.map((p: any) => ({ id: p.id, name: p.name })),
    users: users.map((u: any) => ({ id: u.id, name: u.name }))
  }
}
