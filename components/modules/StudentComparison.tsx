import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { students } from '../../data/mockData';
import { LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react';
import { Progress } from '../ui/progress';

export function StudentComparison() {
  const [student1Id, setStudent1Id] = useState(students[0].id);
  const [student2Id, setStudent2Id] = useState(students[1].id);

  const student1 = students.find(s => s.id === student1Id)!;
  const student2 = students.find(s => s.id === student2Id)!;

  const comparisonData = [
    {
      metric: 'GPA',
      [student1.name]: student1.gpa,
      [student2.name]: student2.gpa,
      max: 4.0,
    },
    {
      metric: 'Attendance',
      [student1.name]: student1.attendanceRate,
      [student2.name]: student2.attendanceRate,
      max: 100,
    },
    {
      metric: 'Risk Score',
      [student1.name]: 100 - student1.riskScore,
      [student2.name]: 100 - student2.riskScore,
      max: 100,
    },
    {
      metric: 'Courses',
      [student1.name]: student1.enrolledCourses.length,
      [student2.name]: student2.enrolledCourses.length,
      max: 6,
    },
  ];

  const radarData = [
    { subject: 'Academic Performance', [student1.name]: (student1.gpa / 4) * 100, [student2.name]: (student2.gpa / 4) * 100 },
    { subject: 'Attendance', [student1.name]: student1.attendanceRate, [student2.name]: student2.attendanceRate },
    { subject: 'Engagement', [student1.name]: Math.random() * 40 + 60, [student2.name]: Math.random() * 40 + 60 },
    { subject: 'Course Load', [student1.name]: (student1.enrolledCourses.length / 6) * 100, [student2.name]: (student2.enrolledCourses.length / 6) * 100 },
    { subject: 'Success Probability', [student1.name]: 100 - student1.riskScore, [student2.name]: 100 - student2.riskScore },
  ];

  const semesterComparison = [
    { semester: 'Fall 2024', [student1.name]: 3.0, [student2.name]: 3.5 },
    { semester: 'Spring 2025', [student1.name]: 2.8, [student2.name]: 3.6 },
    { semester: 'Fall 2025', [student1.name]: 2.5, [student2.name]: 3.7 },
    { semester: 'Spring 2026', [student1.name]: student1.gpa, [student2.name]: student2.gpa },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Users className="w-8 h-8" />
          Student Comparison Tool
        </h1>
        <p className="text-gray-600">Compare academic performance between two students</p>
      </div>

      {/* Student Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Students to Compare</CardTitle>
          <CardDescription>Choose two students for side-by-side analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Student 1</label>
              <Select value={student1Id} onValueChange={setStudent1Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.studentId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Student 2</label>
              <Select value={student2Id} onValueChange={setStudent2Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.studentId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudentCard student={student1} />
        <StudentCard student={student2} />
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
            <CardDescription>Multi-dimensional performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name={student1.name} dataKey={student1.name} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                <Radar name={student2.name} dataKey={student2.name} stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics Comparison</CardTitle>
            <CardDescription>Side-by-side metric analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={student1.name} fill="#3b82f6" />
                <Bar dataKey={student2.name} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* GPA Trend Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>GPA Trend Comparison</CardTitle>
          <CardDescription>Historical academic performance over semesters</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={semesterComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 4.0]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={student1.name} stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey={student2.name} stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
          <CardDescription>Comprehensive metric breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ComparisonRow label="Current GPA" value1={student1.gpa.toFixed(2)} value2={student2.gpa.toFixed(2)} max={4.0} />
            <ComparisonRow label="Attendance Rate" value1={`${student1.attendanceRate}%`} value2={`${student2.attendanceRate}%`} max={100} numVal1={student1.attendanceRate} numVal2={student2.attendanceRate} />
            <ComparisonRow label="Risk Level" value1={student1.riskLevel} value2={student2.riskLevel} badge />
            <ComparisonRow label="Risk Score" value1={student1.riskScore} value2={student2.riskScore} max={100} inverted />
            <ComparisonRow label="Enrolled Courses" value1={student1.enrolledCourses.length} value2={student2.enrolledCourses.length} max={6} />
            <ComparisonRow label="Department" value1={student1.department} value2={student2.department} text />
            <ComparisonRow label="Academic Year" value1={`Year ${student1.year}`} value2={`Year ${student2.year}`} text />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentCard({ student }: { student: any }) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{student.name}</CardTitle>
            <CardDescription className="mt-1">{student.studentId}</CardDescription>
          </div>
          <Badge variant={student.riskLevel === 'High' ? 'destructive' : student.riskLevel === 'Medium' ? 'default' : 'secondary'}>
            {student.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Department</span>
          <span className="font-medium">{student.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Year</span>
          <span className="font-medium">Year {student.year}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">GPA</span>
          <span className="font-bold text-lg">{student.gpa.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Attendance</span>
          <span className="font-bold">{student.attendanceRate}%</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ComparisonRow({ 
  label, 
  value1, 
  value2, 
  max, 
  badge, 
  text, 
  inverted,
  numVal1,
  numVal2,
}: { 
  label: string;
  value1: any;
  value2: any;
  max?: number;
  badge?: boolean;
  text?: boolean;
  inverted?: boolean;
  numVal1?: number;
  numVal2?: number;
}) {
  const num1 = numVal1 ?? (typeof value1 === 'number' ? value1 : parseFloat(value1));
  const num2 = numVal2 ?? (typeof value2 === 'number' ? value2 : parseFloat(value2));
  const better1 = inverted ? num1 < num2 : num1 > num2;
  const better2 = inverted ? num2 < num1 : num2 > num1;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{label}</span>
        {!text && !badge && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{value1}</span>
              {better1 && <TrendingUp className="w-4 h-4 text-green-500" />}
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{value2}</span>
              {better2 && <TrendingUp className="w-4 h-4 text-green-500" />}
            </div>
          </div>
        )}
        {text && (
          <div className="flex items-center gap-4">
            <span>{value1}</span>
            <span className="text-gray-400">vs</span>
            <span>{value2}</span>
          </div>
        )}
        {badge && (
          <div className="flex items-center gap-4">
            <Badge variant={value1 === 'High' ? 'destructive' : value1 === 'Medium' ? 'default' : 'secondary'}>
              {value1}
            </Badge>
            <span className="text-gray-400">vs</span>
            <Badge variant={value2 === 'High' ? 'destructive' : value2 === 'Medium' ? 'default' : 'secondary'}>
              {value2}
            </Badge>
          </div>
        )}
      </div>
      {max && !text && !badge && (
        <div className="grid grid-cols-2 gap-4">
          <Progress value={(num1 / max) * 100} />
          <Progress value={(num2 / max) * 100} />
        </div>
      )}
    </div>
  );
}
