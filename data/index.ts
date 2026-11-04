import dayjs from "dayjs";
import metaData from "./meta.json";
import linkData from "./links.json";
import portfolioData from "./portfolio.json";
import activityData from "./activities.json";
import resumeEducations from "./resume-edu.json";
import resumeExperiences from "./resume-exp.json";

export interface PortfolioItem {
  title: string;
  url: string;
  description?: string;
  descriptionHtml?: string;
  badges: { alt: string; src: string }[];
}

export const meta = metaData;
export const links = linkData;
export const portfolio: {
  works: PortfolioItem[];
  components: PortfolioItem[];
} = portfolioData;
export const activities = activityData;

const experienceYears = dayjs().diff("2012-04-01", "year");

export const me = {
  name: "郡山 隼人",
  nameEn: "KORIYAMA Hayato",
  handle: "nekobato",
  company: "猫鳩柔工業",
  timezone: "Asia/Tokyo",
  role: "Web Frontend Engineer",
  email: "nekobato@gmail.com",
  website: "https://nekobato.net",
  github: "https://github.com/nekobato",
  twitter: "https://twitter.com/nekobato",
  linkedin: "https://www.linkedin.com/in/nekobato",
  summary: `I am a web frontend engineer with ${experienceYears}+ years of experience.`,
};

export const resume = {
  experiences: resumeExperiences,
  educations: resumeEducations,
};
