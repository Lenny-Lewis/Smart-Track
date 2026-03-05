import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { TrendingUp, BookOpen, AlertCircle, Target, Award, Clock } from 'lucide-react';
import { students, generateGPAHistory, generateAttendanceHistory, featureImportance } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function StudentDashboard() {
  // For demo, use first student data
  const student = students[0];
  const gpaHistory = generateGPAHistory(student.gpa);
  const attendanceHistory = generateAttendanceHistory();

  const riskData = [
    {
      name: 'Risk Score',
      value: student.riskScore,
      fill: student.riskLevel === 'High' ? '#ef4444' : student.riskLevel === 'Medium' ? '#f59e0b' : '#22c55e',
    },
  ];

  const recommendations = [
    {
      title: 'Improve Attendance',
      description: 'Your attendance is below the 75% threshold. Try to attend all classes to improve your standing.',
      priority: 'high',
    },
    {
      title: 'Meet with Academic Advisor',
      description: 'Schedule a meeting with Dr. Lisa Anderson to discuss study strategies.',
      priority: 'high',
    },
    {
      title: 'Tutoring Available',
      description: 'Free tutoring sessions are available for CS301 (Algorithms) every Tuesday and Thursday.',
      priority: 'medium',
    },
    {
      title: 'Study Group',
      description: 'Join the CS study group that meets in the library on Wednesdays at 3 PM.',
      priority: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name}!</h1>
        <p className="text-gray-600">Here's your academic progress overview</p>
      </div>

      {/* Alert for at-risk students */}
      {student.riskLevel === 'High' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Academic Alert</AlertTitle>
          <AlertDescription>
            Your academic performance requires attention. Please review the recommendations below and contact your advisor.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.gpa.toFixed(2)}</div>
            <Progress value={(student.gpa / 4.0) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.attendanceRate}%</div>
            <Progress 
              value={student.attendanceRate} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {student.attendanceRate < 75 ? 'Below threshold' : 'Good standing'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge 
              variant={student.riskLevel === 'High' ? 'destructive' : student.riskLevel === 'Medium' ? 'default' : 'secondary'}
              className="text-sm"
            >
              {student.riskLevel}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">Score: {student.riskScore}/100</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPA Trend */}
        <Card>
          <CardHeader>
            <CardTitle>GPA Progression</CardTitle>
            <CardDescription>Your GPA trend over the last 4 semesters</CardDescription>
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

        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment Analysis</CardTitle>
            <CardDescription>AI-powered prediction of academic risk factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  data={riskData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise
                    dataKey="value"
                  />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                    {student.riskScore}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Contributing Factors:</h4>
              {featureImportance.slice(0, 3).map((factor) => (
                <div key={factor.feature}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{factor.feature}</span>
                    <span className="text-muted-foreground">{(factor.importance * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={factor.importance * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Actions to improve your academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                    <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Current Courses</CardTitle>
          <CardDescription>Your enrolled courses for this semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.enrolledCourses.map((courseCode) => (
              <div key={courseCode} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{courseCode}</h4>
                  <BookOpen className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Click to view course details and grades</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
