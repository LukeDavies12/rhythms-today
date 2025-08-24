'use client';

import { useState } from 'react';
import { DayGoal } from '@/types/dayGoal';
import CreateGoalModal from './create-goal-modal';
import { BrandButton } from '@/components/ui/brand-button';
import { Plus, GripVertical, Tag } from 'lucide-react';
import { GLOBAL_KEYWORD_MAPPINGS } from '@/types/globalKeywordMappings';
import { KeywordMapping } from '@/types/keywordMappings';

interface TodaysGoalsProps {
  goals: DayGoal[];
  personKey: string;
  keywordMappings: KeywordMapping[];
  isPaying: boolean;
  usingTagging: boolean;
}

export default function TodaysGoals({ goals, personKey, keywordMappings, isPaying }: TodaysGoalsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const today = new Date();
  const nextSortOrder = goals.length;

  const effectiveKeywordMappings = isPaying 
    ? keywordMappings 
    : GLOBAL_KEYWORD_MAPPINGS.map(global => ({
        keyword_mapping_key: `global-${global.bucket}`,
        keyword_mapping_person_key: personKey,
        keyword_mapping_bucket: global.bucket,
        keyword_mapping_triggers: global.triggers as unknown as string[]
      }));

  const handleCreateSuccess = () => {
    // Cache automatically revalidated via server action
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-900 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Today's Goals ({goals.length})
        </h2>
        <BrandButton
          text="Add Goal"
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {goals.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-neutral-400" />
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                No goals set for today yet
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Start by adding your first goal to focus on today
              </p>
            </div>
            <BrandButton
              text="Add Your First Goal"
              onClick={() => setIsCreateModalOpen(true)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <GoalItem 
                key={goal.day_goal_key} 
                goal={goal} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        personKey={personKey}
        keywordMappings={effectiveKeywordMappings}
        usingTagging={true}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}

interface GoalItemProps {
  goal: DayGoal;
  index: number;
}

function GoalItem({ goal, index }: GoalItemProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div 
      className={`
        group bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 
        rounded-lg p-4 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-600
        ${isDragging ? 'shadow-lg scale-[1.02] rotate-1' : ''}
      `}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500 mt-1">
          <span className="text-sm font-medium min-w-[1.5rem]">
            {index + 1}.
          </span>
          <GripVertical 
            size={16} 
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" 
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-neutral-900 dark:text-neutral-100 font-medium leading-relaxed break-words">
            {goal.day_goal_text}
          </p>
          
          {goal.day_goal_keywords && goal.day_goal_keywords.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Tag size={12} className="text-neutral-400 flex-shrink-0" />
              {goal.day_goal_keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Created {new Date(goal.day_goal_created_at).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </p>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
      </div>
    </div>
  );
}