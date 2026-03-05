import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, AlertTriangle, TrendingUp, GraduationCap, Brain, Target } from 'lucide-react';
import { students, mlModels, departmentStats, riskTrendData } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function AdminDashboard() {
  const totalStudents = students.length;
  const highRiskCount = students.filter(s => s.riskLevel === 'High').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'Medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'Low').length;
  const avgGPA = (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2);
  const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length);

  const riskDistribution = [
    { name: 'Low Risk', value: lowRiskCount, color: '#22c55e' },
    { name: 'Medium Risk', value: mediumRiskCount, color: '#f59e0b' },
    { name: 'High Risk', value: highRiskCount, color: '#ef4444' },
  ];

  const bestModel = mlModels.reduce((best, current) => 
    current.accuracy > best.accuracy ? current : best
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of student performance and system analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highRiskCount + mediumRiskCount}</div>
            <p className="text-xs text-muted-foreground">
              {highRiskCount} high, {mediumRiskCount} medium
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGPA}</div>
            <p className="text-xs text-muted-foreground">Institution-wide</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Current student risk assessment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskDistribution.map((risk) => (
                <div key={risk.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                    <span className="text-sm">{risk.name}</span>
                  </div>
                  <span className="font-semibold">{risk.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trends Over Time</CardTitle>
            <CardDescription>Monthly progression of student risk levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="high" stroke="#ef4444" name="High Risk" strokeWidth={2} />
                <Line type="monotone" dataKey="medium" stroke="#f59e0b" name="Medium Risk" strokeWidth={2} />
                <Line type="monotone" dataKey="low" stroke="#22c55e" name="Low Risk" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Overview</CardTitle>
          <CardDescription>Comparative analysis across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalStudents" fill="#3b82f6" name="Total Students" />
              <Bar dataKey="atRisk" fill="#ef4444" name="At-Risk Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ML Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Machine Learning Model Performance
          </CardTitle>
          <CardDescription>Comparison of predictive models for risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mlModels.map((model) => (
              <div key={model.model} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{model.model}</h3>
                  {model.model === bestModel.model && (
                    <Badge variant="default" className="bg-green-600">
                      <Target className="w-3 h-3 mr-1" />
                      Best Model
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                    <p className="font-semibold">{(model.accuracy * 100).toFixed(1)}%</p>
                    <Progress value={model.accuracy * 100} className="mt-1" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Precision</p>
                    <p className="font-semibold">{(model.precision * 100).toFixed(1)}%</p>
                    <Progress value={model.precision * 100} className="mt-1" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Recall</p>
                    <p className="font-semibold">{(model.recall * 100).toFixed(1)}%</p>
                    <Progress value={model.recall * 100} className="mt-1" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">F1 Score</p>
                    <p className="font-semibold">{(model.f1Score * 100).toFixed(1)}%</p>
                    <Progress value={model.f1Score * 100} className="mt-1" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ROC-AUC</p>
                    <p className="font-semibold">{(model.rocAuc * 100).toFixed(1)}%</p>
                    <Progress value={model.rocAuc * 100} className="mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
