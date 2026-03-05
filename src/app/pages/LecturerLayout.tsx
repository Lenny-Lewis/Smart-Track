import { Outlet } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function LecturerLayout() {
  return (
    <DashboardLayout role="lecturer">
      <Outlet />
    </DashboardLayout>
  );
}
