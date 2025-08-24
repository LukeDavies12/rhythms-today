import { getCurrentPerson } from '@/actions/auth';
import { Suspense } from 'react';

export default async function AppPage() {
  const user = await getCurrentPerson();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="md:hidden">
        <div className="p-1.5">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Today's Goals
          </h2>
          <Suspense fallback={<TodaysGoalsSkeleton />}>
            <TodaysGoalsSection personKey={user.person_key} />
          </Suspense>
        </div>

        <div className="p-1.5">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Today's Notes
          </h2>
          <Suspense fallback={<NotesLoading />}>
            <TodaysNotesSection personKey={user.person_key} />
          </Suspense>
        </div>

        <div className="p-1.5">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Queue
          </h2>
          <Suspense fallback={<QueueLoading />}>
            <UnmarkedGoalsSection personKey={user.person_key} />
          </Suspense>
        </div>

        <div className="p-1.5">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Data View
          </h2>
          <div className="text-neutral-500 dark:text-neutral-400">
            <p>Data view coming soon...</p>
          </div>
        </div>

        <div className="p-1.5">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Summary
          </h2>
          <div className="text-neutral-500 dark:text-neutral-400">
            <p>Summary coming soon...</p>
          </div>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:grid-rows-3 md:h-[calc(100vh-3rem)] md:overflow-hidden">
        <div className="md:row-span-2 md:overflow-y-auto p-3">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Today's Goals
          </h2>
          <Suspense fallback={<TodaysGoalsSkeleton />}>
            <TodaysGoalsSection personKey={user.person_key} />
          </Suspense>
        </div>

        <div className="md:overflow-y-auto p-3 border-l border-neutral-200 dark:border-neutral-800/50">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Today's Notes
          </h2>
          <Suspense fallback={<NotesLoading />}>
            <TodaysNotesSection personKey={user.person_key} />
          </Suspense>
        </div>

        <div className="md:overflow-y-auto p-3 border-l border-t border-neutral-200 dark:border-neutral-800/50">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Queue
          </h2>
          <Suspense fallback={<QueueLoading />}>
            <UnmarkedGoalsSection personKey={user.person_key} />
          </Suspense>
        </div>

        <div className="md:col-span-2 md:grid md:grid-cols-4 border-t border-neutral-200 dark:border-neutral-800/50">
          <div className="col-span-3 p-3 overflow-y-auto">
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Data View
            </h2>
            <div className="text-neutral-500 dark:text-neutral-400">
              <p>Data view coming soon...</p>
            </div>
          </div>

          <div className="col-span-1 p-3 overflow-y-auto border-l border-neutral-200 dark:border-neutral-800/50">
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Summary
            </h2>
            <div className="text-neutral-500 dark:text-neutral-400">
              <p>Summary coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Separate server components for each section to enable individual cache revalidation
async function TodaysGoalsSection({ personKey }: { personKey: string }) {
  return (
    <div>
      <p>Goals list placeholder</p>
    </div>
  );
}

async function TodaysNotesSection({ personKey }: { personKey: string }) {
  return (
    <div className="text-neutral-500 dark:text-neutral-400">
      <p>Notes section coming soon...</p>
    </div>
  );
}

async function UnmarkedGoalsSection({ personKey }: { personKey: string }) {
  return (
    <div className="text-neutral-500 dark:text-neutral-400">
      <p>No unmarked goals from the past</p>
    </div>
  );
}

// Loading skeletons
function TodaysGoalsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-neutral-100 dark:bg-neutral-800"></div>
        ))}
      </div>
    </div>
  );
}

function NotesLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-neutral-100 dark:bg-neutral-800"></div>
    </div>
  );
}

function QueueLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-12 bg-neutral-100 dark:bg-neutral-800"></div>
        ))}
      </div>
    </div>
  );
}