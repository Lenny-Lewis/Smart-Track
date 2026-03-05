import { Outlet } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function AdvisorLayout() {
  return (
    <DashboardLayout role="advisor">
      <Outlet />
    </DashboardLayout>
  );
}
