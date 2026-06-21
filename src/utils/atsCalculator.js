import {
  SECTION_KEYWORDS,
  SCORE_CATEGORIES,
  SCORE_WEIGHTS,
  SKILL_LIST,
  ACTION_VERBS,
  WEAK_WORDS,
  MIN_RECOMMENDED_WORDS
} from './constants'

function containsAny(text, keywords) {
  const lowerText = text.toLowerCase()
  return keywords.some((keyword) => lowerText.includes(keyword))
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function detectSections(resumeText) {
  return {
    contact: containsAny(resumeText, SECTION_KEYWORDS.contact),
    skills: containsAny(resumeText, SECTION_KEYWORDS.skills),
    education: containsAny(resumeText, SECTION_KEYWORDS.education),
    projects: containsAny(resumeText, SECTION_KEYWORDS.projects),
    experience: containsAny(resumeText, SECTION_KEYWORDS.experience),
    certifications: containsAny(resumeText, SECTION_KEYWORDS.certifications)
  }
}

function scoreLength(wordCount) {
  if (wordCount >= 300 && wordCount <= 800) return SCORE_WEIGHTS.length
  if (wordCount >= 200 && wordCount < 300) return Math.round(SCORE_WEIGHTS.length * 0.66)
  if (wordCount > 800 && wordCount <= 1000) return Math.round(SCORE_WEIGHTS.length * 0.66)
  if (wordCount >= MIN_RECOMMENDED_WORDS && wordCount < 200) return Math.round(SCORE_WEIGHTS.length * 0.33)
  if (wordCount > 1000) return Math.round(SCORE_WEIGHTS.length * 0.33)
  return 0
}

export function calculateATSScore(resumeText, foundSkillsCount) {
  const wordCount = countWords(resumeText)
  const sections = detectSections(resumeText)

  const skillsScore = Math.round((foundSkillsCount / SKILL_LIST.length) * SCORE_WEIGHTS.skills)
  const lengthScore = scoreLength(wordCount)
  const contactScore = sections.contact ? SCORE_WEIGHTS.contact : 0
  const skillsSectionScore = sections.skills ? SCORE_WEIGHTS.skillsSection : 0
  const educationScore = sections.education ? SCORE_WEIGHTS.education : 0
  const projectsScore = sections.projects ? SCORE_WEIGHTS.projects : 0
  const experienceScore = sections.experience ? SCORE_WEIGHTS.experience : 0
  const certificationsScore = sections.certifications ? SCORE_WEIGHTS.certifications : 0

  const breakdown = {
    skills: skillsScore,
    contact: contactScore,
    skillsSection: skillsSectionScore,
    education: educationScore,
    projects: projectsScore,
    experience: experienceScore,
    certifications: certificationsScore,
    length: lengthScore
  }

  const totalScore = Object.values(breakdown).reduce((sum, value) => sum + value, 0)
  const matchedCategory = SCORE_CATEGORIES.find((item) => totalScore >= item.min)

  return {
    score: totalScore,
    category: matchedCategory.label,
    categoryColor: matchedCategory.color,
    breakdown,
    sections,
    wordCount
  }
}

export function getResumeStatistics(resumeText, foundSkills, missingSkills) {
  const wordCount = countWords(resumeText)
  const charCount = resumeText.length
  const skillMatchPercent = Math.round((foundSkills.length / (foundSkills.length + missingSkills.length)) * 100)

  return {
    wordCount,
    charCount,
    skillsFound: foundSkills.length,
    skillsMissing: missingSkills.length,
    skillMatchPercent
  }
}

export function analyzeResumeQuality(resumeText) {
  const lowerText = resumeText.toLowerCase()
  const wordCount = countWords(resumeText)

  const hasMeasurableAchievements = /\d+%|\d+\+|\$\d+|\d+ (years|months|users|clients|projects)/i.test(resumeText)
  const hasActionVerbs = ACTION_VERBS.some((verb) => lowerText.includes(verb))
  const hasGithub = lowerText.includes('github')
  const hasLinkedin = lowerText.includes('linkedin')
  const hasWeakPhrases = WEAK_WORDS.some((phrase) => lowerText.includes(phrase))
  const isIdealLength = wordCount >= 300 && wordCount <= 800

  return {
    hasMeasurableAchievements,
    hasActionVerbs,
    hasGithub,
    hasLinkedin,
    hasWeakPhrases,
    isIdealLength,
    wordCount
  }
}
