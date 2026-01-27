import dayjs from "dayjs";
import { readFileSync } from "node:fs";

const readJson = (relativePath) =>
  JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf-8"));

export const meta = readJson("./meta.json");
export const links = readJson("./links.json");
export const portfolio = readJson("./portfolio.json");
export const activities = readJson("./activities.json");
const resumeEducations = readJson("./resume-edu.json");
const resumeExperiences = readJson("./resume-exp.json");

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
