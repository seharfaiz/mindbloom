export type ActField = { key: string; label: string; type: "text" | "textarea" | "number"; placeholder?: string };

export type ActWorksheetDef = {
  type: string;
  title: string;
  description: string;
  fields: ActField[];
};

export const ACT_WORKSHEETS: ActWorksheetDef[] = [
  {
    type: "VALUES_CLARIFICATION",
    title: "Values clarification",
    description: "Acceptance & Commitment Therapy starts with knowing what matters — not goals, but directions.",
    fields: [
      { key: "domain", label: "Life domain", type: "text", placeholder: "e.g. Family, Career, Health, Community" },
      { key: "value", label: "What quality do you want to bring to this domain?", type: "textarea", placeholder: "e.g. Being present, honest, generous" },
      { key: "currentAlignment", label: "How aligned is your life with this value right now (0-10)?", type: "number" },
      { key: "smallStep", label: "One small step that would move you toward it this week", type: "text" },
    ],
  },
  {
    type: "COGNITIVE_DEFUSION",
    title: "Cognitive defusion",
    description: "Practice noticing a thought as just a thought, rather than a fact you must obey.",
    fields: [
      { key: "thought", label: "The sticky thought", type: "textarea", placeholder: "e.g. \"I always mess things up\"" },
      { key: "defusionTechnique", label: "Defusion technique used", type: "text", placeholder: "e.g. \"I'm having the thought that…\", singing it, thanking your mind" },
      { key: "distanceAfter", label: "How much power does the thought hold now (0-10)?", type: "number" },
      { key: "notes", label: "What did you notice?", type: "textarea" },
    ],
  },
  {
    type: "ACCEPTANCE_WILLINGNESS",
    title: "Acceptance & willingness",
    description: "Make room for a difficult feeling instead of fighting it, so it stops running the show.",
    fields: [
      { key: "feeling", label: "The feeling you're making room for", type: "text" },
      { key: "bodyLocation", label: "Where do you notice it in your body?", type: "text" },
      { key: "willingnessRating", label: "Willingness to let it be there, without fighting it (0-10)", type: "number" },
      { key: "committedNextStep", label: "What can you still do, even with this feeling present?", type: "textarea" },
    ],
  },
  {
    type: "COMMITTED_ACTION",
    title: "Committed action plan",
    description: "Turn a value into a concrete, values-aligned action — even if discomfort shows up.",
    fields: [
      { key: "relatedValue", label: "Value this action serves", type: "text" },
      { key: "action", label: "Specific action", type: "text" },
      { key: "when", label: "When will you do it?", type: "text" },
      { key: "barriers", label: "Likely internal barriers (thoughts/feelings)", type: "textarea" },
      { key: "willingnessPlan", label: "How will you make room for those barriers if they show up?", type: "textarea" },
    ],
  },
];
