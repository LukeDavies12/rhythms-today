import { z } from "zod";

export interface DayGoal {
  day_goal_key: string;
  day_goal_person_key: string;
  day_goal_date: Date;
  day_goal_text: string;
  day_goal_sort: number;
  day_goal_keywords: string[];
  day_goal_created_at: Date;
}

export const CreateDayGoalSchema = z.object({
  dayGoalPersonKey: z.string().uuid(),
  dayGoalDate: z.date(),
  dayGoalText: z.string().max(2000).min(1, "Goal text is required"),
  dayGoalSort: z.number().int().min(0),
  dayGoalKeywords: z.array(z.string()).optional().default([]),
});

export type CreateDayGoalDTO = z.infer<typeof CreateDayGoalSchema>;
