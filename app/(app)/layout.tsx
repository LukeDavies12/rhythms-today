import { getCurrentPerson } from '@/actions/auth';
import AppNavbar from '@/components/sections/layout/app-navbar';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentPerson();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen pt-3">
      {children}
      <AppNavbar />
    </div>
  );
}
