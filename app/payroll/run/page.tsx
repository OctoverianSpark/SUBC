import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Play, FileText, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function RunPayrollPage() {
  // Mock employee data
  const employees = [
    {
      id: 1,
      name: "John Smith",
      position: "Site Supervisor",
      hours: 40,
      rate: 35.0,
      overtime: 5,
      overtime_rate: 52.5,
      gross_pay: 1662.5,
      selected: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Electrician",
      hours: 40,
      rate: 42.0,
      overtime: 8,
      overtime_rate: 63.0,
      gross_pay: 2184.0,
      selected: true,
    },
    {
      id: 3,
      name: "Mike Wilson",
      position: "Carpenter",
      hours: 38,
      rate: 28.0,
      overtime: 0,
      overtime_rate: 42.0,
      gross_pay: 1064.0,
      selected: true,
    },
  ]

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/payroll">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Payroll
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Run Payroll</h1>
          <p className="text-slate-600 mt-1">Process payroll for the current period</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Period</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="period-start">Period Start</Label>
                <Input id="period-start" type="date" defaultValue="2024-02-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period-end">Period End</Label>
                <Input id="period-end" type="date" defaultValue="2024-02-29" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay-date">Pay Date</Label>
                <Input id="pay-date" type="date" defaultValue="2024-03-05" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Employee Hours & Pay</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Import Hours
                </Button>
                <Button variant="outline" size="sm">
                  Select All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-600 border-b pb-2">
                <div className="col-span-1">Select</div>
                <div className="col-span-2">Employee</div>
                <div className="col-span-2">Position</div>
                <div className="col-span-1">Hours</div>
                <div className="col-span-1">Rate</div>
                <div className="col-span-1">OT Hours</div>
                <div className="col-span-1">OT Rate</div>
                <div className="col-span-2">Gross Pay</div>
                <div className="col-span-1">Status</div>
              </div>

              {employees.map((employee) => (
                <div key={employee.id} className="grid grid-cols-12 gap-4 items-center py-2 border-b">
                  <div className="col-span-1">
                    <Checkbox defaultChecked={employee.selected} />
                  </div>
                  <div className="col-span-2">
                    <div className="font-medium">{employee.name}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-slate-600">{employee.position}</div>
                  </div>
                  <div className="col-span-1">
                    <Input type="number" defaultValue={employee.hours} className="h-8" />
                  </div>
                  <div className="col-span-1">
                    <div className="text-sm">${employee.rate}</div>
                  </div>
                  <div className="col-span-1">
                    <Input type="number" defaultValue={employee.overtime} className="h-8" />
                  </div>
                  <div className="col-span-1">
                    <div className="text-sm">${employee.overtime_rate}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-semibold">${employee.gross_pay.toLocaleString()}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Ready
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Review all hours before processing</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">Total Gross Pay</div>
                  <div className="text-2xl font-bold">$4,910.50</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payroll Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-slate-600">Employees</div>
                <div className="text-xl font-bold">3</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Total Hours</div>
                <div className="text-xl font-bold">118</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Overtime Hours</div>
                <div className="text-xl font-bold">13</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Gross Pay</div>
                <div className="text-xl font-bold">$4,910.50</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/payroll">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button variant="outline">Save Draft</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Play className="h-4 w-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>
    </div>
  )
}
