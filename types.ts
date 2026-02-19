export interface Project {
  id: number;
  title: string;
  category: 'Web' | 'Mobile' | 'Design' | 'AI';
  image: string;
  description: string;
  technologies: string[];
}

export interface SkillNode {
  id: string;
  group: number;
}

export interface SkillLink {
  source: string;
  target: string;
  value: number;
}

export interface SkillData {
  nodes: SkillNode[];
  links: SkillLink[];
}