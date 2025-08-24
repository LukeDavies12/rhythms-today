import { getCurrentPerson } from '@/actions/auth';
import { getTodaysGoals } from '@/actions/dayGoals';
import { getKeywordMappings } from '@/actions/keywordMappings';
import TodaysGoals from '@/components/sections/today-goals/list-today-goals';
import { KeywordMapping } from '@/types/keywordMappings';
import { Suspense } from 'react';

export default async function AppPage() {
  const user = await getCurrentPerson();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="lg:h-[calc(100vh-5.5rem)]">
          <Suspense fallback={<TodaysGoalsSkeleton />}>
            <TodaysGoalsSection personKey={user.person_key} />
          </Suspense>
        </div>
        <div className="space-y-6 lg:h-[calc(100vh-12rem)]">
          <div className="lg:h-1/2">
            <Suspense fallback={<NotesLoading />}>
              <TodaysNotesSection personKey={user.person_key} />
            </Suspense>
          </div>
          <div className="lg:h-1/2">
            <Suspense fallback={<QueueLoading />}>
              <UnmarkedGoalsSection personKey={user.person_key} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate server components for each section to enable individual cache revalidation
async function TodaysGoalsSection({ personKey }: { personKey: string }) {
  const user = await getCurrentPerson();
  const todaysGoals = await getTodaysGoals(personKey);

  let keywordMappings: KeywordMapping[];
  if (user?.person_using_tagging && user?.person_is_paying) {
    keywordMappings = await getKeywordMappings(personKey);
  } else {
    keywordMappings = [];
  }

  return (
    <TodaysGoals
      goals={todaysGoals}
      personKey={personKey}
      keywordMappings={keywordMappings}
      isPaying={user?.person_is_paying || false}
      usingTagging={user?.person_using_tagging || false}
    />
  );
}

async function TodaysNotesSection({ personKey }: { personKey: string }) {
  // This will be implemented next
  return (
    <div className="h-full bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Today's Notes
      </h2>
      <div className="h-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        <p>Notes section coming soon...</p>
      </div>
    </div>
  );
}

async function UnmarkedGoalsSection({ personKey }: { personKey: string }) {
  // This will get past unmarked goals
  return (
    <div className="h-full bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Unmarked Goals
      </h2>
      <div className="h-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        <p>No unmarked goals from the past</p>
      </div>
    </div>
  );
}

// Loading skeletons
function TodaysGoalsSkeleton() {
  return (
    <div className="h-full bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesLoading() {
  return (
    <div className="h-full bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg"></div>
      </div>
    </div>
  );
}

function QueueLoading() {
  return (
    <div className="h-full bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}