import { z } from "zod";

export interface KeywordMapping {
  keyword_mapping_key: string;
  keyword_mapping_person_key: string;
  keyword_mapping_bucket: string;
  keyword_mapping_triggers: string[];
}

export const CreateKeywordMappingSchema = z.object({
  keywordMappingPersonKey: z.string().uuid(),
  keywordMappingBucket: z.string().min(1, "Bucket name is required"),
  keywordMappingTriggers: z.array(z.string()).min(1, "At least one trigger word is required"),
});

export type CreateKeywordMappingDTO = z.infer<typeof CreateKeywordMappingSchema>;