import { SKILL_LIST, SKILL_CATEGORIES } from './constants'

function escapeForRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isSkillPresent(resumeText, skill) {
  const escapedSkill = escapeForRegex(skill.toLowerCase())
  const pattern = new RegExp(`(^|[^a-z0-9])${escapedSkill}([^a-z0-9]|$)`, 'i')
  return pattern.test(resumeText.toLowerCase())
}

export function checkKeywords(resumeText) {
  const found = []
  const missing = []

  SKILL_LIST.forEach((skill) => {
    if (isSkillPresent(resumeText, skill)) {
      found.push(skill)
    } else {
      missing.push(skill)
    }
  })

  return { found, missing }
}

export function getCategorizedKeywords(foundSkills) {
  const foundSet = new Set(foundSkills)

  return Object.entries(SKILL_CATEGORIES).map(([category, skills]) => ({
    category,
    total: skills.length,
    matched: skills.filter((skill) => foundSet.has(skill)).length
  }))
}
