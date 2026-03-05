import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { students, interventions, alerts } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function AdvisorDashboard() {
  const myStudents = students.slice(0, 6);
  const atRiskCount = myStudents.filter(s => s.riskLevel === 'High' || s.riskLevel === 'Medium').length;
  const activeInterventions = interventions.filter(i => i.status !== 'Completed');
  const newAlerts = alerts.filter(a => a.status === 'New');

  const interventionTrendData = [
    { month: 'Sep', created: 5, completed: 3 },
    { month: 'Oct', created: 8, completed: 6 },
    { month: 'Nov', created: 12, completed: 7 },
    { month: 'Dec', created: 10, completed: 9 },
    { month: 'Jan', created: 15, completed: 11 },
    { month: 'Feb', created: 13, completed: 8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Academic Advisor Dashboard</h1>
        <p className="text-gray-600">Student support and intervention management</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myStudents.length}</div>
            <p className="text-xs text-muted-foreground">Under advisement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{atRiskCount}</div>
            <p className="text-xs text-muted-foreground">Need intervention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Interventions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInterventions.length}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{newAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Unread notifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Intervention Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Intervention Activity Trends</CardTitle>
          <CardDescription>Created vs. completed interventions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={interventionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="created" stroke="#3b82f6" name="Created" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#22c55e" name="Completed" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs for Alerts and Interventions */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="students">My Students</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Student Alerts</CardTitle>
              <CardDescription>Critical notifications requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Alert Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.studentName}</TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>
                        <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
                      <TableCell>{new Date(alert.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={alert.status === 'New' ? 'default' : 'outline'}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions">
          <Card>
            <CardHeader>
              <CardTitle>Intervention Tracking</CardTitle>
              <CardDescription>Manage and track student support interventions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interventions.map((intervention) => (
                    <TableRow key={intervention.id}>
                      <TableCell className="font-medium">{intervention.studentName}</TableCell>
                      <TableCell>{intervention.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{intervention.description}</TableCell>
                      <TableCell>{intervention.assignedTo}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            intervention.status === 'Completed' ? 'default' : 
                            intervention.status === 'In Progress' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {intervention.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {intervention.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(intervention.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Update</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>My Advisees</CardTitle>
              <CardDescription>Students under your academic advisement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.studentId}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>Year {student.year}</TableCell>
                      <TableCell>{student.gpa.toFixed(2)}</TableCell>
                      <TableCell>{student.attendanceRate}%</TableCell>
                      <TableCell>
                        <Badge variant={student.riskLevel === 'High' ? 'destructive' : student.riskLevel === 'Medium' ? 'default' : 'secondary'}>
                          {student.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
