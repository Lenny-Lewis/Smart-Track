import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { students, courses, generateGPAHistory, generateAttendanceHistory } from '../../data/mockData';
import { Search, Filter, Download, AlertTriangle, TrendingUp, TrendingDown, Mail, Phone, MapPin } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function StudentDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter;
    return matchesSearch && matchesDepartment && matchesRisk;
  });

  const departments = Array.from(new Set(students.map(s => s.department)));

  const student = selectedStudent ? students.find(s => s.id === selectedStudent) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Directory</h1>
        <p className="text-gray-600">Search, filter, and view detailed student profiles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-red-600">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {students.filter(s => s.riskLevel === 'High').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-orange-600">Medium Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {students.filter(s => s.riskLevel === 'Medium').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-green-600">Low Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {students.filter(s => s.riskLevel === 'Low').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find students by name, ID, or apply filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedStudent && student ? (
        <StudentProfile student={student} onClose={() => setSelectedStudent(null)} />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student List</CardTitle>
                <CardDescription>
                  Showing {filteredStudents.length} of {students.length} students
                </CardDescription>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
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
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>Year {student.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.gpa.toFixed(2)}
                        {student.gpa < 2.5 ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={student.attendanceRate} className="w-20" />
                        <span className="text-sm">{student.attendanceRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          student.riskLevel === 'High' ? 'destructive' : 
                          student.riskLevel === 'Medium' ? 'default' : 
                          'secondary'
                        }
                      >
                        {student.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.riskScore}/100</Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedStudent(student.id)}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StudentProfile({ student, onClose }: { student: any, onClose: () => void }) {
  const gpaHistory = generateGPAHistory(student.gpa);
  const attendanceHistory = generateAttendanceHistory();

  const studentCourses = courses.filter(c => student.enrolledCourses.includes(c.code));

  const mockGrades = studentCourses.map((course, idx) => ({
    course: course.code,
    name: course.name,
    grade: student.gpa + (Math.random() - 0.5) * 0.5,
    credits: course.credits,
    letter: ['A', 'B+', 'B', 'C+', 'C'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {student.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-gray-600">{student.studentId}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{student.department}</Badge>
                  <Badge variant="outline">Year {student.year}</Badge>
                  <Badge 
                    variant={
                      student.riskLevel === 'High' ? 'destructive' : 
                      student.riskLevel === 'Medium' ? 'default' : 
                      'secondary'
                    }
                  >
                    {student.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>Close Profile</Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>+1 (555) {Math.floor(Math.random() * 900 + 100)}-{Math.floor(Math.random() * 9000 + 1000)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Campus Residence Hall {Math.floor(Math.random() * 5 + 1)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Academic Standing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Current GPA</span>
                <span className="font-bold">{student.gpa.toFixed(2)}/4.0</span>
              </div>
              <Progress value={(student.gpa / 4.0) * 100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Attendance Rate</span>
                <span className="font-bold">{student.attendanceRate}%</span>
              </div>
              <Progress value={student.attendanceRate} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Risk Score</span>
                <span className="font-bold">{student.riskScore}/100</span>
              </div>
              <Progress value={student.riskScore} className="bg-red-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Academic Advisor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                LA
              </div>
              <div>
                <p className="font-semibold">Dr. Lisa Anderson</p>
                <p className="text-sm text-gray-600">Academic Advisor</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              Schedule Meeting
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GPA Trend</CardTitle>
                <CardDescription>Semester-by-semester progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={gpaHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[0, 4.0]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>Monthly attendance percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={attendanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Current Enrollment</CardTitle>
              <CardDescription>Spring 2026 semester courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Letter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGrades.map((grade) => (
                    <TableRow key={grade.course}>
                      <TableCell className="font-medium">{grade.course}</TableCell>
                      <TableCell>{grade.name}</TableCell>
                      <TableCell>{grade.credits}</TableCell>
                      <TableCell>{grade.grade.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={grade.grade >= 3.0 ? 'default' : 'destructive'}>
                          {grade.letter}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Active Alerts
              </CardTitle>
              <CardDescription>Recent system-generated alerts for this student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.riskLevel === 'High' && (
                  <>
                    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-red-900">GPA Below Threshold</p>
                          <p className="text-sm text-red-700 mt-1">
                            Current GPA ({student.gpa.toFixed(2)}) is below the 2.5 minimum threshold
                          </p>
                          <p className="text-xs text-red-600 mt-2">Generated: Feb 20, 2026</p>
                        </div>
                        <Badge variant="destructive">High</Badge>
                      </div>
                    </div>
                    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-red-900">Low Attendance</p>
                          <p className="text-sm text-red-700 mt-1">
                            Attendance rate ({student.attendanceRate}%) is below 75% requirement
                          </p>
                          <p className="text-xs text-red-600 mt-2">Generated: Feb 21, 2026</p>
                        </div>
                        <Badge variant="destructive">High</Badge>
                      </div>
                    </div>
                  </>
                )}
                {student.riskLevel === 'Medium' && (
                  <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-orange-900">Performance Monitoring</p>
                        <p className="text-sm text-orange-700 mt-1">
                          Student requires additional monitoring and support
                        </p>
                        <p className="text-xs text-orange-600 mt-2">Generated: Feb 18, 2026</p>
                      </div>
                      <Badge variant="default">Medium</Badge>
                    </div>
                  </div>
                )}
                {student.riskLevel === 'Low' && (
                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-green-900">Good Academic Standing</p>
                        <p className="text-sm text-green-700 mt-1">
                          Student is performing well with no current alerts
                        </p>
                      </div>
                      <Badge variant="secondary">Low</Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions">
          <Card>
            <CardHeader>
              <CardTitle>Intervention History</CardTitle>
              <CardDescription>Support activities and outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.riskLevel === 'High' && (
                  <>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">Academic Advising Session</p>
                          <Badge variant="secondary" className="mt-1">In Progress</Badge>
                        </div>
                        <span className="text-sm text-gray-500">Feb 20, 2026</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        One-on-one meeting scheduled to discuss study strategies and time management
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Assigned to: Dr. Lisa Anderson</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">Peer Tutoring Program</p>
                          <Badge variant="outline" className="mt-1">Pending</Badge>
                        </div>
                        <span className="text-sm text-gray-500">Feb 21, 2026</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Assigned peer tutor for {student.enrolledCourses[0]} course
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Assigned to: Tutoring Center</p>
                    </div>
                  </>
                )}
                {student.riskLevel !== 'High' && (
                  <p className="text-center text-gray-500 py-8">No interventions required at this time</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
