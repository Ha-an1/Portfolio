
export enum Channel {
  IDENTITY = 1,
  PROJECTS = 2,
  EXPERIENCE = 3,
  ABOUT = 4,
  CONTACT = 5
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  tasks: string[];
}

export interface Recommendation {
  author: string;
  role: string;
  text: string;
}
