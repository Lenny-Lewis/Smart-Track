import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Database, Lock, Brain, BarChart3, Bell, FileText, Users, Shield } from 'lucide-react';

export function SystemArchitecture() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Smart Track System Architecture</h1>
        <p className="text-xl text-gray-600">Student Progress Analytics & Early Intervention System</p>
        <div className="flex gap-2 justify-center mt-4">
          <Badge variant="default">Enterprise-Level</Badge>
          <Badge variant="secondary">Scalable</Badge>
          <Badge variant="outline">Production-Ready</Badge>
        </div>
      </div>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Complete web-based university analytics platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Smart Track is an enterprise-level web application designed to monitor student academic performance,
            predict at-risk students using machine learning, and enable early intervention to improve retention rates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Primary Goals</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Improve academic monitoring</li>
                <li>Reduce dropout rates</li>
                <li>Enable early intervention</li>
                <li>Provide real-time dashboards</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>ML-powered risk prediction</li>
                <li>Role-based access control</li>
                <li>Real-time analytics</li>
                <li>Automated alerts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Modern, scalable technologies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Frontend
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline">React 18</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">TypeScript</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Tailwind CSS v4</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">Recharts</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline">React Router v7</Badge>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                ML Algorithms
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Logistic Regression</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Random Forest</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Gradient Boosting</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Neural Network (MLP)</Badge>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="default">JWT Authentication</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="default">RBAC</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="default">Password Hashing</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="default">Input Validation</Badge>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <Card>
        <CardHeader>
          <CardTitle>System Modules</CardTitle>
          <CardDescription>7 Core functional modules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ModuleCard
            icon={Users}
            title="Module 1: User Management"
            features={[
              'User registration and authentication',
              'JWT-based login system',
              'Role assignment (Admin, Lecturer, Advisor, Student)',
              'Department and course management',
              'Audit logging'
            ]}
          />
          <ModuleCard
            icon={Database}
            title="Module 2: Academic Data Management"
            features={[
              'Student records management',
              'Course catalog',
              'Grade tracking',
              'Attendance monitoring',
              'Enrollment management',
              'Full CRUD operations'
            ]}
          />
          <ModuleCard
            icon={BarChart3}
            title="Module 3: Analytics Engine"
            features={[
              'Automatic GPA calculation',
              'Attendance percentage tracking',
              'Assessment trend analysis',
              'Anomaly detection',
              'Risk score generation (0-100 scale)'
            ]}
          />
          <ModuleCard
            icon={Brain}
            title="Module 4: ML Risk Prediction"
            features={[
              'Multiple ML models (Logistic Regression, Random Forest, XGBoost, MLP)',
              'Feature engineering pipeline',
              'Model evaluation metrics (Accuracy, Precision, Recall, F1, ROC-AUC)',
              'SHAP-based explainability',
              'Risk categorization (Low, Medium, High)'
            ]}
          />
          <ModuleCard
            icon={BarChart3}
            title="Module 5: Dashboards"
            features={[
              'Student Dashboard: GPA trends, attendance, personalized recommendations',
              'Lecturer Dashboard: Course performance, at-risk students',
              'Advisor Dashboard: Interventions, alerts',
              'Admin Dashboard: Institution-wide analytics, ML metrics'
            ]}
          />
          <ModuleCard
            icon={Bell}
            title="Module 6: Early Warning & Alerts"
            features={[
              'Automatic risk flagging',
              'Real-time notifications',
              'Email alert integration',
              'Intervention recommendations',
              'Follow-up tracking'
            ]}
          />
          <ModuleCard
            icon={FileText}
            title="Module 7: Reporting System"
            features={[
              'PDF report generation',
              'CSV data export',
              'Department analytics',
              'ML performance reports',
              'Scheduled reporting'
            ]}
          />
        </CardContent>
      </Card>

      {/* User Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Access Control</CardTitle>
          <CardDescription>4 distinct user roles with specific permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="destructive">ADMIN</Badge>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• ML model configuration</li>
                <li>• System-wide analytics</li>
                <li>• Report generation</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="default">LECTURER</Badge>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Course management</li>
                <li>• Student grades</li>
                <li>• Attendance tracking</li>
                <li>• At-risk student alerts</li>
                <li>• Course analytics</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">ADVISOR</Badge>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Advisee management</li>
                <li>• Intervention tracking</li>
                <li>• Alert monitoring</li>
                <li>• Student support</li>
                <li>• Progress analytics</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">STUDENT</Badge>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• View own GPA & grades</li>
                <li>• Track attendance</li>
                <li>• View risk assessment</li>
                <li>• Receive recommendations</li>
                <li>• Access notifications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ML Features */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Learning Features</CardTitle>
          <CardDescription>Advanced predictive analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Risk Indicators</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GPA below threshold (2.5)</li>
                <li>• Attendance below 75%</li>
                <li>• Sudden grade drops</li>
                <li>• Failed assessments</li>
                <li>• Course withdrawals</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Feature Importance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Attendance Rate (42%)</li>
                <li>• Previous GPA (28%)</li>
                <li>• Failed Assessments (15%)</li>
                <li>• Study Hours (8%)</li>
                <li>• Participation Score (7%)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Demo Access Credentials</CardTitle>
          <CardDescription className="text-blue-700">Use these credentials to explore different role perspectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border">
              <Badge variant="destructive" className="mb-2">Admin</Badge>
              <p className="text-sm font-mono">admin@university.edu</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <Badge variant="default" className="mb-2">Lecturer</Badge>
              <p className="text-sm font-mono">lecturer@university.edu</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <Badge variant="secondary" className="mb-2">Advisor</Badge>
              <p className="text-sm font-mono">advisor@university.edu</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <Badge variant="outline" className="mb-2">Student</Badge>
              <p className="text-sm font-mono">student@university.edu</p>
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-blue-700 font-semibold">
            Password for all accounts: <span className="font-mono">password123</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, features }: { icon: any, title: string, features: string[] }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start gap-3 mb-3">
        <Icon className="w-6 h-6 text-blue-600 mt-1" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <ul className="text-sm text-gray-600 space-y-1 ml-9">
        {features.map((feature, idx) => (
          <li key={idx}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}
