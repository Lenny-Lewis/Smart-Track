import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function ReportsModule() {
  const reports = [
    {
      id: '1',
      name: 'Student Risk Assessment Report',
      description: 'Comprehensive analysis of at-risk students with intervention recommendations',
      type: 'Risk Analysis',
      format: 'PDF',
      generatedDate: '2026-02-23',
      status: 'Ready',
    },
    {
      id: '2',
      name: 'Department Performance Summary',
      description: 'Comparative performance metrics across all departments',
      type: 'Performance',
      format: 'PDF',
      generatedDate: '2026-02-22',
      status: 'Ready',
    },
    {
      id: '3',
      name: 'Semester Enrollment Statistics',
      description: 'Course enrollment data and trends for Spring 2026',
      type: 'Enrollment',
      format: 'CSV',
      generatedDate: '2026-02-21',
      status: 'Ready',
    },
    {
      id: '4',
      name: 'Intervention Effectiveness Analysis',
      description: 'Success rates and outcomes of student interventions',
      type: 'Intervention',
      format: 'PDF',
      generatedDate: '2026-02-20',
      status: 'Ready',
    },
    {
      id: '5',
      name: 'ML Model Performance Report',
      description: 'Detailed metrics and comparison of prediction models',
      type: 'ML Analytics',
      format: 'PDF',
      generatedDate: '2026-02-19',
      status: 'Ready',
    },
    {
      id: '6',
      name: 'Attendance Tracking Report',
      description: 'Institution-wide attendance patterns and anomalies',
      type: 'Attendance',
      format: 'CSV',
      generatedDate: '2026-02-18',
      status: 'Ready',
    },
  ];

  const handleDownloadReport = (reportName: string) => {
    // Mock download functionality
    console.log(`Downloading report: ${reportName}`);
    alert(`Downloading: ${reportName}`);
  };

  const handleGenerateReport = () => {
    alert('Report generation initiated. You will be notified when complete.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Exports</h1>
          <p className="text-gray-600">Generate, view, and download system reports</p>
        </div>
        <Button onClick={handleGenerateReport}>
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{reports.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">247</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Filter and search available reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="risk">Risk Analysis</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="enrollment">Enrollment</SelectItem>
                  <SelectItem value="intervention">Intervention</SelectItem>
                  <SelectItem value="ml">ML Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Recently generated reports ready for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-lg">{report.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge variant="secondary">{report.format}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(report.generatedDate).toLocaleDateString()}
                      </div>
                      <Badge variant="default" className="bg-green-600">
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => handleDownloadReport(report.name)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automated report generation schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Weekly Risk Assessment</p>
                  <p className="text-sm text-gray-500">Every Monday at 8:00 AM</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Monthly Performance Report</p>
                  <p className="text-sm text-gray-500">1st of each month</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Semester Analytics Summary</p>
                  <p className="text-sm text-gray-500">End of semester</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Quick export options for common data sets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export All Student Data (CSV)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Course Enrollment (Excel)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Attendance Records (CSV)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Grade Data (CSV)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Alert History (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
