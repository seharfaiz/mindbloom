export type CbtField = { key: string; label: string; type: "text" | "textarea" | "number"; placeholder?: string };

export type CbtWorksheetDef = {
  type: string;
  title: string;
  description: string;
  fields: CbtField[];
};

export const CBT_WORKSHEETS: CbtWorksheetDef[] = [
  {
    type: "THOUGHT_RECORD",
    title: "Thought record",
    description: "Catch an automatic thought, question it, and find a more balanced view.",
    fields: [
      { key: "situation", label: "Situation", type: "textarea", placeholder: "What happened, where, and with whom?" },
      { key: "automaticThought", label: "Automatic thought", type: "textarea", placeholder: "What went through your mind?" },
      { key: "emotion", label: "Emotion & intensity (0-100)", type: "text", placeholder: "e.g. Anxious, 70" },
      { key: "distortion", label: "Cognitive distortion (if any)", type: "text", placeholder: "e.g. Catastrophizing, mind reading" },
      { key: "evidenceFor", label: "Evidence for the thought", type: "textarea" },
      { key: "evidenceAgainst", label: "Evidence against the thought", type: "textarea" },
      { key: "balancedThought", label: "More balanced thought", type: "textarea" },
      { key: "outcome", label: "Emotion now (0-100)", type: "text" },
    ],
  },
  {
    type: "BEHAVIORAL_ACTIVATION",
    title: "Behavioral activation",
    description: "Schedule a small, meaningful activity to counter withdrawal and low mood.",
    fields: [
      { key: "activity", label: "Activity", type: "text", placeholder: "What will you do?" },
      { key: "when", label: "When", type: "text", placeholder: "Day & time" },
      { key: "anticipatedMood", label: "Anticipated mood before (0-10)", type: "number" },
      { key: "actualMood", label: "Mood after (0-10, fill in later)", type: "number" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  {
    type: "PROBLEM_SOLVING",
    title: "Problem solving",
    description: "Break a problem into steps you can actually take.",
    fields: [
      { key: "problem", label: "Problem, stated specifically", type: "textarea" },
      { key: "options", label: "Possible solutions", type: "textarea" },
      { key: "prosCons", label: "Pros & cons of top options", type: "textarea" },
      { key: "chosen", label: "Chosen approach", type: "textarea" },
      { key: "firstStep", label: "First concrete step", type: "text" },
    ],
  },
  {
    type: "EXPOSURE_HIERARCHY",
    title: "Exposure hierarchy",
    description: "List feared situations from least to most distressing, to approach gradually.",
    fields: [
      { key: "goal", label: "Overall goal", type: "text" },
      { key: "step1", label: "Step 1 (easiest, SUDS 0-100)", type: "text" },
      { key: "step2", label: "Step 2", type: "text" },
      { key: "step3", label: "Step 3", type: "text" },
      { key: "step4", label: "Step 4 (hardest)", type: "text" },
    ],
  },
  {
    type: "SELF_COMPASSION",
    title: "Self-compassion break",
    description: "A short practice for moments of struggle, based on Kristin Neff's framework.",
    fields: [
      { key: "situation", label: "What's hard right now?", type: "textarea" },
      { key: "mindfulness", label: "Mindfulness: name what you're feeling", type: "text" },
      { key: "commonHumanity", label: "Common humanity: how are others connected to this struggle?", type: "textarea" },
      { key: "kindness", label: "What would you say to a friend in this situation?", type: "textarea" },
    ],
  },
  {
    type: "CORE_BELIEFS",
    title: "Core beliefs worksheet",
    description: "Identify and gently test a deep-seated belief about yourself, others, or the world.",
    fields: [
      { key: "belief", label: "Core belief", type: "text", placeholder: "e.g. \"I'm not good enough\"" },
      { key: "origin", label: "Where might this belief come from?", type: "textarea" },
      { key: "evidenceAgainst", label: "Evidence that challenges this belief", type: "textarea" },
      { key: "alternative", label: "A more balanced belief", type: "textarea" },
    ],
  },
  {
    type: "GOAL_SETTING",
    title: "Goal setting",
    description: "Turn an intention into a specific, achievable goal.",
    fields: [
      { key: "goal", label: "Goal", type: "text" },
      { key: "why", label: "Why this matters to you", type: "textarea" },
      { key: "steps", label: "Steps to get there", type: "textarea" },
      { key: "obstacles", label: "Likely obstacles", type: "textarea" },
      { key: "targetDate", label: "Target date", type: "text" },
    ],
  },
];
