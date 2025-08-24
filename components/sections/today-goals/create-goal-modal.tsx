'use client';

import { useState, useMemo } from 'react';
import { BrandButton } from '@/components/ui/brand-button';
import { SecondaryButton } from '@/components/ui/secondary-button';
import FullScreenModal from '@/components/ui/full-screen-modal';
import TextInput from '@/components/ui/text-input';
import TextArea from '@/components/ui/textarea';
import { Datepicker } from '@/components/ui/datepicker';
import { Tag, X, Settings } from 'lucide-react';
import { KeywordMapping } from '@/types/keywordMappings';
import { createDayGoal } from '@/actions/dayGoals';
import { CreateDayGoalDTO } from '@/types/dayGoal';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  personKey: string;
  keywordMappings: KeywordMapping[];
  usingTagging: boolean;
  onSuccess?: () => void;
}

export default function CreateGoalModal({
  isOpen,
  onClose,
  personKey,
  keywordMappings,
  usingTagging,
  onSuccess
}: CreateGoalModalProps) {
  const [goalDate, setGoalDate] = useState<Date>(new Date());
  const [goalText, setGoalText] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [manualKeywords, setManualKeywords] = useState<string[]>([]);
  const [excludedAutoKeywords, setExcludedAutoKeywords] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const detectedKeywords = useMemo(() => {
    if (!goalText.trim() || !usingTagging) return [];
    
    const detected: string[] = [];
    const lowerGoalText = goalText.toLowerCase();
    
    keywordMappings.forEach(mapping => {
      const hasMatch = mapping.keyword_mapping_triggers.some(trigger => 
        lowerGoalText.includes(trigger.toLowerCase())
      );
      
      if (hasMatch && !detected.includes(mapping.keyword_mapping_bucket)) {
        detected.push(mapping.keyword_mapping_bucket);
      }
    });
    
    return detected;
  }, [goalText, keywordMappings, usingTagging]);

  const activeKeywords = detectedKeywords.filter(k => !excludedAutoKeywords.includes(k));
  const finalKeywords = [...new Set([...activeKeywords, ...manualKeywords])];

  const resetForm = () => {
    setGoalDate(new Date());
    setGoalText('');
    setManualKeywords([]);
    setKeywordInput('');
    setExcludedAutoKeywords([]);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const keyword = keywordInput.trim().toLowerCase();
      if (keyword && !finalKeywords.includes(keyword)) {
        setManualKeywords(prev => [...prev, keyword]);
        setKeywordInput('');
      }
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    if (detectedKeywords.includes(keywordToRemove)) {
      setExcludedAutoKeywords(prev => [...prev, keywordToRemove]);
    } else {
      setManualKeywords(prev => prev.filter(k => k !== keywordToRemove));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const data: CreateDayGoalDTO = {
        dayGoalPersonKey: personKey,
        dayGoalDate: goalDate,
        dayGoalText: goalText.trim(),
        dayGoalSort: 0,
        dayGoalKeywords: finalKeywords,
      };

      await createDayGoal(data);
      
      resetForm();
      onSuccess?.();
      onClose();
      
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: error.message || 'Something went wrong' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = goalText.trim().length > 0 && goalText.length <= 2000;

  return (
    <FullScreenModal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Add Goal"
    >
      <div className="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            <TextArea
              label="Goal"
              value={goalText}
              onChange={(e) => {
                setGoalText(e.target.value);
                if (errors.dayGoalText) setErrors(prev => ({ ...prev, dayGoalText: '' }));
              }}
              placeholder="What do you want to accomplish?"
              rows={4}
              maxLength={2000}
              showCharCount
              required
              autoFocus
              error={errors.dayGoalText}
            />

            <div className="space-y-4">
              <Datepicker
                label="Date"
                value={goalDate}
                onChange={(date) => setGoalDate(date || new Date())}
                className="w-full"
              />
              
              {usingTagging && keywordMappings.length > 0 && (
                <div className="space-y-3">
                  {finalKeywords.length > 0 ? (
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <div className="flex flex-wrap gap-1">
                        {finalKeywords.map((keyword) => {
                          const isDetected = detectedKeywords.includes(keyword);
                          return (
                            <span
                              key={keyword}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap
                                ${isDetected 
                                  ? 'bg-neutral-300 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-200' 
                                  : 'bg-neutral-800 dark:bg-neutral-200 text-neutral-100 dark:text-neutral-800'
                                }`}
                            >
                              {keyword}
                              <button
                                type="button"
                                onClick={() => handleRemoveKeyword(keyword)}
                                className="hover:text-red-500 transition-colors ml-1"
                              >
                                <X size={10} />
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-600 text-center">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Tags appear based on goal text
                      </p>
                    </div>
                  )}

                  <TextInput
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleAddKeyword}
                    placeholder="Add custom tag..."
                    className="text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {errors.general && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                {errors.general}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <BrandButton
              text={isLoading ? "Creating..." : "Create Goal"}
              type="submit"
              disabled={isLoading || !isFormValid}
            />
            
            <SecondaryButton 
              text="Cancel"
              onClick={handleClose}
              type="button"
            />
          </div>

        </form>
      </div>
    </FullScreenModal>
  );
}