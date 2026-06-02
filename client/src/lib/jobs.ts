export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const jobs: Job[] = [
  {
    id: "senior-admission-counsellor",
    title: "Senior Admission Counsellor",
    location: "Namakkal, Tamil Nadu",
    type: "Full-time",
    description: "Lead student counseling sessions, guide through application processes, and maintain university partnerships.",
    requirements: [
      "5+ years experience in education consultancy",
      "Strong knowledge of UK/Canada/Australia systems",
      "Excellent communication skills"
    ]
  },
  {
    id: "student-admission-counsellor",
    title: "Student Admission Counsellor",
    location: "Namakkal, Tamil Nadu",
    type: "Full-time",
    description: "Conduct student counseling, assist with documentation, and support visa applications.",
    requirements: [
      "2+ years experience",
      "Good knowledge of overseas education",
      "Fluent in English"
    ]
  },
  {
    id: "marketing-executive",
    title: "Marketing Executive",
    location: "Namakkal, Tamil Nadu",
    type: "Full-time",
    description: "Manage digital marketing campaigns, content creation, and student lead generation.",
    requirements: [
      "Experience in digital marketing",
      "Content writing skills",
      "Social media expertise"
    ]
  },
  {
    id: "ielts-trainer",
    title: "IELTS Trainer",
    location: "Namakkal, Tamil Nadu",
    type: "Full-time/Part-time",
    description: "Teach IELTS preparation, conduct mock tests, and provide individual coaching.",
    requirements: [
      "IELTS 8+ band score",
      "Teaching experience",
      "Communication skills"
    ]
  }
];

export const LINKEDIN_JOBS_URL = "https://www.linkedin.com/company/nawins-overseas-education-private-ltd/jobs/";