export const SKILL_CATEGORIES = {
  Frontend: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express', 'REST API'],
  Database: ['MongoDB', 'SQL'],
  'Tools & DevOps': ['Git', 'GitHub', 'Docker', 'AWS'],
  'Core CS': ['C++', 'DSA']
}

export const SKILL_LIST = Object.values(SKILL_CATEGORIES).flat()

export const SECTION_KEYWORDS = {
  contact: ['email', 'phone', 'linkedin', 'contact', '@'],
  skills: ['skills', 'technical skills', 'technologies', 'tech stack'],
  education: ['education', 'academic', 'qualification', 'degree', 'university', 'college', 'b.tech', 'bachelor', 'master'],
  projects: ['project', 'projects'],
  experience: ['experience', 'work history', 'employment', 'internship'],
  certifications: ['certification', 'certificate', 'certified', 'course']
}

export const REQUIRED_SECTIONS = [
  { key: 'contact', label: 'Contact Information' },
  { key: 'skills', label: 'Skills' },
  { key: 'education', label: 'Education' },
  { key: 'projects', label: 'Projects' },
  { key: 'experience', label: 'Experience' },
  { key: 'certifications', label: 'Certifications' }
]

export const ACTION_VERBS = [
  'achieved',
  'built',
  'created',
  'designed',
  'developed',
  'engineered',
  'implemented',
  'improved',
  'launched',
  'led',
  'managed',
  'optimized',
  'reduced',
  'resolved',
  'shipped',
  'automated',
  'architected',
  'streamlined'
]

export const WEAK_WORDS = [
  'responsible for',
  'worked on',
  'helped with',
  'duties included',
  'tasked with'
]

export const SCORE_WEIGHTS = {
  skills: 25,
  contact: 10,
  skillsSection: 5,
  education: 10,
  projects: 15,
  experience: 20,
  certifications: 5,
  length: 10
}

export const SCORE_CATEGORIES = [
  { min: 85, label: 'Excellent', color: 'var(--color-success)' },
  { min: 70, label: 'Good', color: 'var(--color-primary)' },
  { min: 50, label: 'Average', color: 'var(--color-warning)' },
  { min: 0, label: 'Needs Improvement', color: 'var(--color-danger)' }
]

export const MAX_FILE_SIZE_MB = 5
export const MIN_RECOMMENDED_WORDS = 150
export const HISTORY_STORAGE_KEY = 'resume_analyzer_history'
export const THEME_STORAGE_KEY = 'resume_analyzer_theme'
export const MAX_HISTORY_ENTRIES = 8

export const DEVELOPER_NAME = 'Ranjit Dhapate'
export const DEVELOPER_EMAIL = 'dhapateranjit98@gmail.com'
export const DIGITAL_HEROES_URL = 'https://digitalheroesco.com'
