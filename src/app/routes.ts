import { createBrowserRouter } from 'react-router';
import { LoginPage } from './components/auth/LoginPage';
import { AdminLayout } from './pages/AdminLayout';
import { LecturerLayout } from './pages/LecturerLayout';
import { AdvisorLayout } from './pages/AdvisorLayout';
import { StudentLayout } from './pages/StudentLayout';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { LecturerDashboard } from './components/dashboards/LecturerDashboard';
import { AdvisorDashboard } from './components/dashboards/AdvisorDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { UserManagement } from './components/modules/UserManagement';
import { MLModels } from './components/modules/MLModels';
import { CoursesModule } from './components/modules/CoursesModule';
import { AlertsModule } from './components/modules/AlertsModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { SystemArchitecture } from './components/modules/SystemArchitecture';
import { StudentDirectory } from './components/modules/StudentDirectory';
import { AttendanceTracking } from './components/modules/AttendanceTracking';
import { GradeManagement } from './components/modules/GradeManagement';
import { NotificationCenter } from './components/modules/NotificationCenter';
import { StudentComparison } from './components/modules/StudentComparison';
import { FeeManagement } from './components/modules/FeeManagement';
import { IndustrialAttachmentTracking } from './components/modules/IndustrialAttachmentTracking';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginPage,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'users', Component: UserManagement },
      { path: 'students', Component: StudentDirectory },
      { path: 'courses', Component: CoursesModule },
      { path: 'fees', Component: FeeManagement },
      { path: 'attachment', Component: IndustrialAttachmentTracking },
      { path: 'alerts', Component: AlertsModule },
      { path: 'ml-models', Component: MLModels },
      { path: 'analytics', Component: AnalyticsModule },
      { path: 'comparison', Component: StudentComparison },
      { path: 'reports', Component: ReportsModule },
      { path: 'settings', Component: SystemArchitecture },
    ],
  },
  {
    path: '/lecturer',
    Component: LecturerLayout,
    children: [
      { index: true, Component: LecturerDashboard },
      { path: 'courses', Component: CoursesModule },
      { path: 'students', Component: StudentDirectory },
      { path: 'grades', Component: GradeManagement },
      { path: 'attendance', Component: AttendanceTracking },
      { path: 'analytics', Component: AnalyticsModule },
      { path: 'reports', Component: ReportsModule },
    ],
  },
  {
    path: '/advisor',
    Component: AdvisorLayout,
    children: [
      { index: true, Component: AdvisorDashboard },
      { path: 'students', Component: StudentDirectory },
      { path: 'alerts', Component: AlertsModule },
      { path: 'comparison', Component: StudentComparison },
      { path: 'analytics', Component: AnalyticsModule },
    ],
  },
  {
    path: '/student',
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: 'notifications', Component: NotificationCenter },
    ],
  },
]);