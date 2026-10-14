import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export const metadata = {
  title: 'Dashboard: Media',
};

export default function DashboardPage() {
  redirect(paths.dashboard.documents);
}
