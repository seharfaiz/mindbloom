export type AssessmentOption = { label: string; value: number };

export type AssessmentDef = {
  id: string;
  name: string;
  fullName: string;
  category: string;
  estimatedMinutes: number;
  description: string;
  instructions: string;
  options: AssessmentOption[];
  questions: string[];
  interpret: (total: number) => { severity: string; interpretation: string; suggestions: string[] };
  crisisItemIndex?: number; // index of item that should trigger a crisis-resources note if scored > 0
};

const freq4 = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export const PHQ9: AssessmentDef = {
  id: "PHQ9",
  name: "PHQ-9",
  fullName: "Patient Health Questionnaire-9",
  category: "Mood & Anxiety",
  estimatedMinutes: 3,
  description:
    "A 9-item screening tool for the frequency of depressive symptoms over the last two weeks.",
  instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
  options: freq4,
  questions: [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading or watching television",
    "Moving or speaking so slowly that other people could have noticed, or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way",
  ],
  crisisItemIndex: 8,
  interpret(total) {
    if (total <= 4)
      return {
        severity: "Minimal",
        interpretation: "Your responses suggest minimal depressive symptoms right now.",
        suggestions: [
          "Keep up habits that support your mood: sleep, movement, and connection.",
          "Check back in with this screening periodically to track how you're doing.",
        ],
      };
    if (total <= 9)
      return {
        severity: "Mild",
        interpretation: "Your responses suggest mild depressive symptoms.",
        suggestions: [
          "Try the CBT thought record to notice patterns in your thinking.",
          "Consider a daily mood check-in to track what helps.",
          "Behavioral activation — scheduling small, meaningful activities — can help lift mood.",
        ],
      };
    if (total <= 14)
      return {
        severity: "Moderate",
        interpretation: "Your responses suggest moderate depressive symptoms.",
        suggestions: [
          "Consider talking with a therapist or counselor about what you're experiencing.",
          "Use the Self-Care Planner to rebuild small routines across each life area.",
          "The CBT toolbox and Relaxation Center may offer some day-to-day relief.",
        ],
      };
    if (total <= 19)
      return {
        severity: "Moderately severe",
        interpretation: "Your responses suggest moderately severe depressive symptoms.",
        suggestions: [
          "We'd encourage connecting with a licensed mental health professional soon.",
          "Keep tracking your mood so you and a provider can see the full picture.",
        ],
      };
    return {
      severity: "Severe",
      interpretation: "Your responses suggest severe depressive symptoms.",
      suggestions: [
        "Please consider reaching out to a mental health professional as soon as you can.",
        "If you are in crisis or having thoughts of harming yourself, use the crisis resources shown below.",
      ],
    };
  },
};

export const GAD7: AssessmentDef = {
  id: "GAD7",
  name: "GAD-7",
  fullName: "Generalized Anxiety Disorder-7",
  category: "Mood & Anxiety",
  estimatedMinutes: 2,
  description: "A 7-item screening tool for the frequency of anxiety symptoms over the last two weeks.",
  instructions: "Over the last 2 weeks, how often have you been bothered by the following problems?",
  options: freq4,
  questions: [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it's hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen",
  ],
  interpret(total) {
    if (total <= 4)
      return {
        severity: "Minimal",
        interpretation: "Your responses suggest minimal anxiety symptoms right now.",
        suggestions: ["A regular breathing or grounding practice can help maintain this baseline."],
      };
    if (total <= 9)
      return {
        severity: "Mild",
        interpretation: "Your responses suggest mild anxiety symptoms.",
        suggestions: [
          "Try box breathing or the 4-7-8 technique in the Relaxation Center.",
          "The CBT thought record can help you examine anxious predictions.",
        ],
      };
    if (total <= 14)
      return {
        severity: "Moderate",
        interpretation: "Your responses suggest moderate anxiety symptoms.",
        suggestions: [
          "Consider speaking with a therapist, especially if worry is interfering with daily life.",
          "Grounding exercises and a consistent sleep routine can help regulate anxiety.",
        ],
      };
    return {
      severity: "Severe",
      interpretation: "Your responses suggest severe anxiety symptoms.",
      suggestions: [
        "We'd encourage connecting with a licensed mental health professional soon.",
        "Progressive muscle relaxation and paced breathing may offer short-term relief.",
      ],
    };
  },
};

export const PSS10: AssessmentDef = {
  id: "PSS10",
  name: "PSS-10",
  fullName: "Perceived Stress Scale",
  category: "Stress & Burnout",
  estimatedMinutes: 3,
  description: "Measures the degree to which situations in your life are appraised as stressful.",
  instructions: "In the last month, how often have you felt or thought this way?",
  options: [
    { label: "Never", value: 0 },
    { label: "Almost never", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Fairly often", value: 3 },
    { label: "Very often", value: 4 },
  ],
  questions: [
    "Been upset because of something that happened unexpectedly",
    "Felt unable to control the important things in your life",
    "Felt nervous and stressed",
    "Felt confident about your ability to handle personal problems (reverse scored)",
    "Felt that things were going your way (reverse scored)",
    "Found that you could not cope with all the things you had to do",
    "Been able to control irritations in your life (reverse scored)",
    "Felt that you were on top of things (reverse scored)",
    "Been angered because of things outside your control",
    "Felt difficulties were piling up so high you could not overcome them",
  ],
  interpret(total) {
    if (total <= 13)
      return {
        severity: "Low",
        interpretation: "Your perceived stress is low relative to typical norms.",
        suggestions: ["Keep leaning on the coping strategies that are already working for you."],
      };
    if (total <= 26)
      return {
        severity: "Moderate",
        interpretation: "Your perceived stress is in the moderate range.",
        suggestions: [
          "The Self-Care Planner can help you rebalance across life areas.",
          "Short daily breathing breaks can lower baseline stress over time.",
        ],
      };
    return {
      severity: "High",
      interpretation: "Your perceived stress is in the high range.",
      suggestions: [
        "Consider talking with a professional about workload and coping support.",
        "Prioritize sleep and one restorative activity daily, even briefly.",
      ],
    };
  },
};

export const ASSESSMENTS: Record<string, AssessmentDef> = {
  PHQ9,
  GAD7,
  PSS10,
};

export function scoreAssessment(id: string, answers: number[]) {
  const def = ASSESSMENTS[id];
  if (!def) throw new Error("Unknown assessment");
  let total: number;
  if (id === "PSS10") {
    const reverseIdx = [3, 4, 6, 7];
    total = answers.reduce((sum, v, i) => sum + (reverseIdx.includes(i) ? 4 - v : v), 0);
  } else {
    total = answers.reduce((a, b) => a + b, 0);
  }
  const result = def.interpret(total);
  return { total, ...result };
}
