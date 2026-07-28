export type ResearchStudy = {
  number: string;
  slug?: string;
  status: "Working paper" | "Study in development" | "Research direction";
  tone: "live" | "progress" | "direction";
  title: string;
  shortTitle: string;
  summary: string;
  authors?: string[];
  year?: string;
  tags: string[];
};

export const researchStudies: ResearchStudy[] = [
  {
    number: "01",
    slug: "ai-exposure-risk-preferences",
    status: "Working paper",
    tone: "live",
    title: "How AI Exposure Alters Risk Preferences and Advisory Behavior",
    shortTitle: "AI exposure, risk preferences, and advice",
    summary:
      "A randomized experiment separating changes in decision capacity from changes in underlying risk preferences.",
    authors: ["Elena Asparouhova", "Arman Goudarzi", "Nathan Seegert"],
    year: "2026",
    tags: ["Portfolio choice", "AI advice", "Risk preferences"],
  },
  {
    number: "02",
    status: "Study in development",
    tone: "progress",
    title: "AI-Assisted Trading in Experimental Markets",
    shortTitle: "AI-assisted trading in experimental markets",
    summary:
      "Studying how intelligent support affects trading behavior, price discovery, and welfare in controlled financial markets.",
    tags: ["Market design", "Trading", "Price discovery"],
  },
  {
    number: "03",
    status: "Research direction",
    tone: "direction",
    title: "Designing Accountable Financial AI",
    shortTitle: "Designing accountable financial AI",
    summary:
      "Identifying interface and calibration choices that improve financial decisions while preserving human agency.",
    tags: ["Interface design", "Calibration", "Human agency"],
  },
];

export const featuredStudy = researchStudies[0];

export function studyHref(study: ResearchStudy) {
  return study.slug ? `/research/${study.slug}` : undefined;
}
