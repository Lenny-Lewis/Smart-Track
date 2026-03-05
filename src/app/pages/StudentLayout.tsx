import { Outlet } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function StudentLayout() {
  return (
    <DashboardLayout role="student">
      <Outlet />
    </DashboardLayout>
  );
}
