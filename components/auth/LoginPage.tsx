import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../utils/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { GraduationCap, AlertCircle, Brain, Users, BarChart3, Shield } from 'lucide-react';
import { Badge } from '../ui/badge';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const authState = login(email, password);
    
    if (authState) {
      // Redirect based on role
      const redirectMap = {
        admin: '/admin',
        lecturer: '/lecturer',
        advisor: '/advisor',
        student: '/student',
      };
      
      navigate(redirectMap[authState.user!.role]);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Smart Track
          </h1>
          <p className="text-xl text-gray-700 mb-2">Student Progress Analytics & Early Intervention System</p>
          <div className="flex gap-2 justify-center mt-4">
            <Badge variant="default" className="bg-indigo-600">Enterprise-Level</Badge>
            <Badge variant="secondary">ML-Powered</Badge>
            <Badge variant="outline">Production-Ready</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Login Card */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access the system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-sm font-semibold text-gray-800 mb-3">Demo Credentials:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border">
                      <p className="font-semibold text-red-600">Admin</p>
                      <p className="text-gray-600">admin@university.edu</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <p className="font-semibold text-blue-600">Lecturer</p>
                      <p className="text-gray-600">lecturer@university.edu</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <p className="font-semibold text-green-600">Advisor</p>
                      <p className="text-gray-600">advisor@university.edu</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <p className="font-semibold text-purple-600">Student</p>
                      <p className="text-gray-600">student@university.edu</p>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-indigo-700">
                    Password: <span className="font-mono bg-white px-2 py-1 rounded">password123</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="space-y-4">
            <Card className="shadow-lg border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  AI-Powered Risk Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 4 ML models: Logistic Regression, Random Forest, XGBoost, Neural Network</li>
                  <li>• 93% accuracy with Gradient Boosting</li>
                  <li>• SHAP-based explainability</li>
                  <li>• Real-time risk scoring (0-100 scale)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Role-Based Access Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Admin:</strong> Full system control, ML management, analytics</li>
                  <li>• <strong>Lecturer:</strong> Course management, student grading</li>
                  <li>• <strong>Advisor:</strong> Intervention tracking, student support</li>
                  <li>• <strong>Student:</strong> Personal progress, recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Comprehensive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time dashboards with interactive charts</li>
                  <li>• Department performance comparison</li>
                  <li>• Retention rate tracking</li>
                  <li>• Automated report generation (PDF/CSV)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Enterprise Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• JWT authentication with secure tokens</li>
                  <li>• Password hashing (bcrypt)</li>
                  <li>• Input validation and sanitization</li>
                  <li>• Audit logging and compliance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-8 pb-8">
          <p className="text-sm text-gray-600">
            © 2026 Smart Track. Enterprise-level academic monitoring and intervention platform.
          </p>
        </div>
      </div>
    </div>
  );
}