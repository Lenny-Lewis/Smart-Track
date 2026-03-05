import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, GraduationCap } from 'lucide-react';
import { departmentStats, riskTrendData, students } from '../../data/mockData';

export function AnalyticsModule() {
  const retentionData = [
    { semester: 'Fall 2024', rate: 89 },
    { semester: 'Spring 2025', rate: 91 },
    { semester: 'Summer 2025', rate: 87 },
    { semester: 'Fall 2025', rate: 92 },
    { semester: 'Spring 2026', rate: 90 },
  ];

  const gpaDistribution = [
    { range: '3.5-4.0', count: 45, color: '#22c55e' },
    { range: '3.0-3.5', count: 68, color: '#3b82f6' },
    { range: '2.5-3.0', count: 52, color: '#f59e0b' },
    { range: '2.0-2.5', count: 28, color: '#ef4444' },
    { range: 'Below 2.0', count: 12, color: '#991b1b' },
  ];

  const performanceByYear = [
    { year: 'Year 1', avgGPA: 3.2, avgAttendance: 88 },
    { year: 'Year 2', avgGPA: 3.1, avgAttendance: 85 },
    { year: 'Year 3', avgGPA: 2.9, avgAttendance: 80 },
    { year: 'Year 4', avgGPA: 3.4, avgAttendance: 92 },
  ];

  const predictedOutcomes = [
    { category: 'On Track to Graduate', value: 72, color: '#22c55e' },
    { category: 'At Risk - Recoverable', value: 18, color: '#f59e0b' },
    { category: 'High Risk - Intervention Needed', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Advanced Analytics</h1>
        <p className="text-gray-600">Comprehensive data analysis and predictive insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-green-600">↑ 2% from last semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dropout Risk</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5%</div>
            <p className="text-xs text-red-600">↑ 1.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Time</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 years</div>
            <p className="text-xs text-muted-foreground">For bachelor's degree</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intervention Success</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-green-600">↑ 5% improvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Retention Rate Trends</CardTitle>
            <CardDescription>Student retention over the past 5 semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GPA Distribution</CardTitle>
            <CardDescription>Current student GPA breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gpaDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {gpaDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance by Academic Year</CardTitle>
            <CardDescription>GPA and attendance comparison across year levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceByYear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 4]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="avgGPA" fill="#3b82f6" name="Average GPA" />
                <Bar yAxisId="right" dataKey="avgAttendance" fill="#22c55e" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predicted Student Outcomes</CardTitle>
            <CardDescription>ML-based predictions for current cohort</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={predictedOutcomes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {predictedOutcomes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {predictedOutcomes.map((outcome) => (
                <div key={outcome.category} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: outcome.color }} />
                    <span className="text-sm">{outcome.category}</span>
                  </div>
                  <span className="font-semibold">{outcome.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Comparison Analytics</CardTitle>
          <CardDescription>Cross-departmental performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageGPA" fill="#3b82f6" name="Average GPA" />
              <Bar dataKey="retentionRate" fill="#22c55e" name="Retention Rate %" />
              <Bar dataKey="atRisk" fill="#ef4444" name="At-Risk Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Level Progression</CardTitle>
          <CardDescription>Monthly tracking of student risk categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} name="High Risk" />
              <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} name="Medium Risk" />
              <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} name="Low Risk" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
