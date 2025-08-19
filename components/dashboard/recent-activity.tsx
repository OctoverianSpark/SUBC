import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Users, Package, DollarSign } from "lucide-react"

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "estimate",
      title: "New estimate created for Downtown Office Building",
      time: "2 hours ago",
      icon: FileText,
      status: "pending",
    },
    {
      id: 2,
      type: "contract",
      title: "Contract signed for Residential Complex Phase 2",
      time: "4 hours ago",
      icon: Users,
      status: "completed",
    },
    {
      id: 3,
      type: "materials",
      title: "Steel delivery scheduled for Highway Bridge Project",
      time: "6 hours ago",
      icon: Package,
      status: "in-progress",
    },
    {
      id: 4,
      type: "invoice",
      title: "Invoice #INV-2024-001 sent to Metro Construction",
      time: "1 day ago",
      icon: DollarSign,
      status: "sent",
    },
    {
      id: 5,
      type: "project",
      title: "Shopping Mall Renovation project started",
      time: "2 days ago",
      icon: Clock,
      status: "active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "sent":
        return "bg-purple-100 text-purple-800"
      case "active":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
