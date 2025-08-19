import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, DollarSign, Users } from "lucide-react"

// Mock data - replace with actual data from your database
const mockProjects = [
  {
    id: "1",
    name: "Downtown Office Complex",
    status: "in_progress",
    location: "123 Main St, Downtown",
    budget: 2500000,
    completion: 65,
    startDate: "2024-01-15",
    endDate: "2024-08-30",
    teamSize: 12,
  },
  {
    id: "2",
    name: "Residential Tower Phase 2",
    status: "planning",
    location: "456 Oak Ave, Midtown",
    budget: 4200000,
    completion: 15,
    startDate: "2024-03-01",
    endDate: "2024-12-15",
    teamSize: 18,
  },
  {
    id: "3",
    name: "Highway Bridge Renovation",
    status: "in_progress",
    location: "Route 95 Overpass",
    budget: 1800000,
    completion: 85,
    startDate: "2023-09-01",
    endDate: "2024-04-30",
    teamSize: 8,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "planning":
      return "bg-blue-100 text-blue-800"
    case "in_progress":
      return "bg-emerald-100 text-emerald-800"
    case "on_hold":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "planning":
      return "Planning"
    case "in_progress":
      return "In Progress"
    case "on_hold":
      return "On Hold"
    case "completed":
      return "Completed"
    default:
      return "Unknown"
  }
}

export default function ProjectOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Active Projects</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockProjects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </div>
              <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-600">${(project.budget / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-600">{project.teamSize} workers</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-600">{new Date(project.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${project.completion}%` }}></div>
                </div>
                <span className="text-gray-600 text-xs">{project.completion}%</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
