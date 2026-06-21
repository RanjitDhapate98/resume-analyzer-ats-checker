import { HISTORY_STORAGE_KEY, MAX_HISTORY_ENTRIES } from './constants'

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistoryEntry(entry) {
  const existing = getHistory()
  const updated = [entry, ...existing].slice(0, MAX_HISTORY_ENTRIES)

  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    return existing
  }

  return updated
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY)
  } catch {
    return
  }
}
