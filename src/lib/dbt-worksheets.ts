export type DbtField = { key: string; label: string; type: "text" | "textarea" | "number"; placeholder?: string };

export type DbtWorksheetDef = {
  type: string;
  title: string;
  description: string;
  fields: DbtField[];
};

export const DBT_WORKSHEETS: DbtWorksheetDef[] = [
  {
    type: "DISTRESS_TOLERANCE",
    title: "Distress tolerance (TIPP)",
    description: "For moments of intense distress — fast, body-based skills to bring intensity down.",
    fields: [
      { key: "situation", label: "What's happening right now?", type: "textarea" },
      { key: "distressBefore", label: "Distress level before (0-10)", type: "number" },
      { key: "technique", label: "Technique used", type: "text", placeholder: "Temperature, Intense exercise, Paced breathing, Paired muscle relaxation" },
      { key: "distressAfter", label: "Distress level after (0-10)", type: "number" },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  {
    type: "EMOTION_REGULATION",
    title: "Emotion regulation (PLEASE + opposite action)",
    description: "Track the basics that keep emotions manageable, and practice acting opposite to an unhelpful urge.",
    fields: [
      { key: "physicalIllness", label: "PL — treating PhysicaL illness", type: "text" },
      { key: "eating", label: "E — Eating balanced meals", type: "text" },
      { key: "substances", label: "A — Avoiding mood-Altering substances", type: "text" },
      { key: "sleep", label: "S — Sleep", type: "text" },
      { key: "exercise", label: "E — Exercise", type: "text" },
      { key: "emotion", label: "Emotion & urge", type: "text", placeholder: "e.g. Anger, urge to snap at someone" },
      { key: "oppositeAction", label: "Opposite action you can take instead", type: "textarea" },
    ],
  },
  {
    type: "INTERPERSONAL_EFFECTIVENESS",
    title: "Interpersonal effectiveness (DEAR MAN)",
    description: "Script a difficult conversation so you can ask for what you need clearly and respectfully.",
    fields: [
      { key: "describe", label: "Describe the situation (facts only)", type: "textarea" },
      { key: "express", label: "Express how you feel about it", type: "textarea" },
      { key: "assert", label: "Assert what you want or need", type: "textarea" },
      { key: "reinforce", label: "Reinforce — what's the benefit for them?", type: "text" },
      { key: "notes", label: "Staying Mindful, Appearing confident, Negotiating — notes", type: "textarea" },
    ],
  },
  {
    type: "WISE_MIND",
    title: "Wise mind check-in",
    description: "A brief mindfulness pause to notice the balance between emotion mind and reasonable mind.",
    fields: [
      { key: "emotionMind", label: "What is your emotion mind saying?", type: "textarea" },
      { key: "reasonableMind", label: "What is your reasonable mind saying?", type: "textarea" },
      { key: "wiseMind", label: "What does your wise mind know, underneath both?", type: "textarea" },
    ],
  },
];
