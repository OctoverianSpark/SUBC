import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Users, Package, DollarSign, ClipboardCheck } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      title: "New Project",
      description: "Start a new construction project",
      icon: Plus,
      href: "/projects/new",
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      title: "Create Estimate",
      description: "Generate project estimate",
      icon: FileText,
      href: "/estimates/new",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Add Subcontractor",
      description: "Register new subcontractor",
      icon: Users,
      href: "/subcontractors/new",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Order Materials",
      description: "Create purchase order",
      icon: Package,
      href: "/materials/orders/new",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Create Invoice",
      description: "Generate client invoice",
      icon: DollarSign,
      href: "/billing/invoices/new",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Run Payroll",
      description: "Process employee payroll",
      icon: ClipboardCheck,
      href: "/payroll/run",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow bg-transparent"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
