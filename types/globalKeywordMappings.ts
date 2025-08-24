export const GLOBAL_KEYWORD_MAPPINGS = [
  {
    bucket: "fitness",
    triggers: ["workout", "gym", "exercise", "run", "walk", "yoga", "stretch", "cardio", "lift", "weights"]
  },
  {
    bucket: "work",
    triggers: ["meeting", "project", "email", "call", "presentation", "deadline", "task", "report", "client"]
  },
  {
    bucket: "family",
    triggers: ["mom", "dad", "kids", "children", "spouse", "family", "dinner", "call home", "wife", "husband"]
  },
  {
    bucket: "creative",
    triggers: ["write", "draw", "paint", "music", "photo", "design", "create", "art", "craft", "journal"]
  },
  {
    bucket: "social",
    triggers: ["friend", "coffee", "lunch", "party", "event", "network", "community", "volunteer"]
  },
  {
    bucket: "faith",
    triggers: ["bible", "pray", "god", "christ", "jesus", "church"]
  }
] as const;

export type GlobalKeywordMapping = {
  bucket: string;
  triggers: string[];
};