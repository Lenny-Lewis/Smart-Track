import { Outlet } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function AdminLayout() {
  return (
    <DashboardLayout role="admin">
      <Outlet />
    </DashboardLayout>
  );
}
