import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardComplete from '@/components/DashboardComplete';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <DashboardComplete />;
}

