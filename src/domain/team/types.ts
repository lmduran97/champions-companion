export type TeamSlot = {
  slot: 1 | 2 | 3 | 4 | 5 | 6
  pokemonId: string | null
  formId?: string | null
  nickname?: string
}

export type Team = {
  id: string
  name: string
  notes?: string
  slots: TeamSlot[]
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
}

export type SavedTeam = {
  id: string
  name: string
  pokemonIds: (string | null)[]
  createdAt: string
  updatedAt: string
}
