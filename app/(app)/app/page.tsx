import { getCurrentPerson } from '@/actions/auth';

export default async function AppPage() {
  const user = await getCurrentPerson();

  if (!user) {
    return null;
  }

  const displayName = user.person_username || user.person_email;

  return (
    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
      Hello, <span className="font-medium text-neutral-900 dark:text-neutral-100">{displayName}</span>!
    </p>
  );
}