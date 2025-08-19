import DashboardHeader from "@/components/dashboard/dashboard-header"
import EstimatesList from "@/components/estimates/estimates-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function EstimatesPage() {
  // Demo mode - no authentication required
  const demoUser = {
    id: "demo-user",
    email: "demo@construction.com",
    user_metadata: { first_name: "John", last_name: "Constructor" },
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={demoUser} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Estimates</h1>
            <p className="text-muted-foreground mt-2">Manage project cost estimates and proposals</p>
          </div>
          <Link href="/estimates/new">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Estimate</span>
            </Button>
          </Link>
        </div>

        <EstimatesList />
      </main>
    </div>
  )
}
