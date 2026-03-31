export function normalizeTeamName(name: string) {
  return name.trim().replace(/\s+/g, ' ').toLowerCase()
}
