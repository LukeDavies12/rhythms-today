"use server"

import { sql } from "@/db/db";
import { CreateDayGoalDTO, CreateDayGoalSchema, DayGoal } from "@/types/dayGoal";
import { revalidateTag } from "next/cache";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function createDayGoal(data: CreateDayGoalDTO): Promise<void> {
  const parsed = CreateDayGoalSchema.parse(data);

  await sql`
    SELECT * FROM sp_create_day_goal(
      ${parsed.dayGoalPersonKey}::uuid,
      ${parsed.dayGoalDate},
      ${parsed.dayGoalText},
      ${parsed.dayGoalSort},
      ${parsed.dayGoalKeywords.length > 0 ? parsed.dayGoalKeywords : null}
    );
  `;

  // Revalidate the cache tags
  const dateStr = parsed.dayGoalDate.toISOString().split('T')[0];
  revalidateTag(`day-goals-${parsed.dayGoalPersonKey}-${dateStr}`);
  revalidateTag(`day-goals-${parsed.dayGoalPersonKey}`);
}

// Cached version for today's goals specifically
export async function getTodaysGoals(personKey: string): Promise<DayGoal[]> {
  'use cache';
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Tag the cache with both specific date and general person tags
  cacheTag(`day-goals-${personKey}-${todayStr}`, `day-goals-${personKey}`);
  
  const dayGoals = await sql`
    SELECT * FROM day_goal 
    WHERE day_goal_person_key = ${personKey}::uuid 
    AND day_goal_date = ${todayStr}::date
    ORDER BY day_goal_sort ASC, day_goal_created_at ASC;
  ` as DayGoal[];

  return dayGoals;
}