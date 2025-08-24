"use server";

import { sql } from "@/db/db";
import { KeywordMapping } from "@/types/keywordMappings";
import { unstable_cacheTag as cacheTag } from "next/cache";

// Get keyword mappings for a person (cached)
export async function getKeywordMappings(personKey: string): Promise<KeywordMapping[]> {
  'use cache';
  
  cacheTag(`keyword-mappings-${personKey}`);
  
  const mappings = await sql`
    SELECT * FROM keyword_mapping 
    WHERE keyword_mapping_person_key = ${personKey}::uuid
    ORDER BY keyword_mapping_bucket ASC;
  ` as KeywordMapping[];

  return mappings;
}