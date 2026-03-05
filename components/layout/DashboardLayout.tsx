import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentUser, logout } from '../../utils/auth';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Brain,
  FileText,
  UserCircle,
  Bell,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { Badge } from '../ui/badge';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'lecturer' | 'advisor' | 'student';
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems: Record<string, NavItem[]> = {
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: Users, label: 'User Management', path: '/admin/users' },
      { icon: Users, label: 'Student Directory', path: '/admin/students' },
      { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
      { icon: DollarSign, label: 'Fee Management', path: '/admin/fees' },
      { icon: Briefcase, label: 'Industrial Attachment', path: '/admin/attachment' },
      { icon: AlertTriangle, label: 'Alerts', path: '/admin/alerts', badge: 12 },
      { icon: Brain, label: 'ML Models', path: '/admin/ml-models' },
      { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
      { icon: BarChart3, label: 'Student Comparison', path: '/admin/comparison' },
      { icon: FileText, label: 'Reports', path: '/admin/reports' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
    lecturer: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/lecturer' },
      { icon: BookOpen, label: 'My Courses', path: '/lecturer/courses' },
      { icon: Users, label: 'Students', path: '/lecturer/students' },
      { icon: FileText, label: 'Grade Management', path: '/lecturer/grades' },
      { icon: Users, label: 'Attendance', path: '/lecturer/attendance' },
      { icon: BarChart3, label: 'Analytics', path: '/lecturer/analytics' },
      { icon: FileText, label: 'Reports', path: '/lecturer/reports' },
    ],
    advisor: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/advisor' },
      { icon: Users, label: 'My Students', path: '/advisor/students' },
      { icon: AlertTriangle, label: 'Alerts', path: '/advisor/alerts', badge: 8 },
      { icon: BarChart3, label: 'Student Comparison', path: '/advisor/comparison' },
      { icon: BarChart3, label: 'Analytics', path: '/advisor/analytics' },
    ],
    student: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
      { icon: BookOpen, label: 'My Courses', path: '/student/courses' },
      { icon: BarChart3, label: 'Progress', path: '/student/progress' },
      { icon: Bell, label: 'Notifications', path: '/student/notifications', badge: 3 },
    ],
  };

  const currentNavItems = navItems[role] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Smart Track</h1>
                <p className="text-xs text-gray-500">
                  {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      {user?.role.toUpperCase()}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16">
            <nav className="p-4 space-y-1">
              {currentNavItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}