import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Calendar, Clock, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { students, courses } from '../../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
}

export function AttendanceTracking() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const course = courses.find(c => c.id === selectedCourse);
  const enrolledStudents = students.filter(s => 
    s.enrolledCourses.includes(course?.code || '')
  );

  const todayRecords = attendanceRecords.filter(r => 
    r.courseId === selectedCourse && r.date === selectedDate
  );

  const handleMarkAttendance = (studentId: string, status: AttendanceRecord['status']) => {
    const existing = todayRecords.find(r => r.studentId === studentId);
    
    if (existing) {
      setAttendanceRecords(prev => 
        prev.map(r => r.id === existing.id ? { ...r, status } : r)
      );
    } else {
      const student = students.find(s => s.id === studentId);
      const newRecord: AttendanceRecord = {
        id: `ATT-${Date.now()}-${studentId}`,
        studentId,
        studentName: student?.name || '',
        courseId: selectedCourse,
        date: selectedDate,
        status,
      };
      setAttendanceRecords(prev => [...prev, newRecord]);
    }
  };

  const getStudentAttendanceRate = (studentId: string) => {
    const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
    if (studentRecords.length === 0) return 100;
    const presentCount = studentRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
    return Math.round((presentCount / studentRecords.length) * 100);
  };

  const getAttendanceStats = () => {
    const total = todayRecords.length;
    const present = todayRecords.filter(r => r.status === 'Present').length;
    const absent = todayRecords.filter(r => r.status === 'Absent').length;
    const late = todayRecords.filter(r => r.status === 'Late').length;
    const excused = todayRecords.filter(r => r.status === 'Excused').length;
    
    return { total, present, absent, late, excused };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Attendance Tracking</h1>
        <p className="text-gray-600">Record and monitor student attendance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{enrolledStudents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-600">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-600">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-600">Excused</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stats.excused}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mark" className="w-full">
        <TabsList>
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="mark">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Record attendance for today's class session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Course and Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <Label>Select Course</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Student List */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrolledStudents.map((student) => {
                        const record = todayRecords.find(r => r.studentId === student.id);
                        const rate = getStudentAttendanceRate(student.id);
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      rate >= 75 ? 'bg-green-500' : rate >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${rate}%` }}
                                  />
                                </div>
                                <span className="text-sm">{rate}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {record ? (
                                <Badge 
                                  variant={
                                    record.status === 'Present' ? 'default' :
                                    record.status === 'Late' ? 'secondary' :
                                    record.status === 'Excused' ? 'outline' :
                                    'destructive'
                                  }
                                >
                                  {record.status === 'Present' && <CheckCircle className="w-3 h-3 mr-1" />}
                                  {record.status === 'Absent' && <XCircle className="w-3 h-3 mr-1" />}
                                  {record.status === 'Late' && <Clock className="w-3 h-3 mr-1" />}
                                  {record.status}
                                </Badge>
                              ) : (
                                <Badge variant="outline">Not Marked</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant={record?.status === 'Present' ? 'default' : 'outline'}
                                  onClick={() => handleMarkAttendance(student.id, 'Present')}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant={record?.status === 'Absent' ? 'destructive' : 'outline'}
                                  onClick={() => handleMarkAttendance(student.id, 'Absent')}
                                >
                                  <XCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant={record?.status === 'Late' ? 'secondary' : 'outline'}
                                  onClick={() => handleMarkAttendance(student.id, 'Late')}
                                >
                                  <Clock className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant={record?.status === 'Excused' ? 'default' : 'outline'}
                                  onClick={() => handleMarkAttendance(student.id, 'Excused')}
                                >
                                  <AlertCircle className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>View past attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.slice(0, 20).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{courses.find(c => c.id === record.courseId)?.code}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            record.status === 'Present' ? 'default' :
                            record.status === 'Late' ? 'secondary' :
                            record.status === 'Excused' ? 'outline' :
                            'destructive'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {record.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {attendanceRecords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                        No attendance records yet. Start marking attendance to see history.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Low Attendance Alert</CardTitle>
                <CardDescription>Students with attendance below 75%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {enrolledStudents
                    .filter(s => getStudentAttendanceRate(s.id) < 75)
                    .map(student => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                        </div>
                        <Badge variant="destructive">
                          {getStudentAttendanceRate(student.id)}%
                        </Badge>
                      </div>
                    ))}
                  {enrolledStudents.filter(s => getStudentAttendanceRate(s.id) < 75).length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No students with low attendance
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Download attendance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Export Today's Attendance (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Export Weekly Report (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Export Monthly Report (Excel)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Export Semester Summary (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
