import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorage } from '@/src/data/storage/zustandStorage'
import type { SavedTeam } from '@/src/domain/team/types'
import { normalizeTeamName } from '../domain/team/utils'

type SavedTeamsState = {
  teams: SavedTeam[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  saveCurrentTeam: (name: string, pokemonIds: (string | null)[]) => boolean
  renameTeam: (teamId: string, newName: string) => boolean
  deleteTeam: (teamId: string) => void
}

export const useSavedTeamsStore = create<SavedTeamsState>()(
  persist(
    (set, get) => ({
      teams: [],

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      saveCurrentTeam: (name, pokemonIds) => {
        const trimmedName = name.trim()

        if (!trimmedName) {
          return false
        }

        const normalizedName = normalizeTeamName(trimmedName)
        const alreadyExists = get().teams.some(
          (team) => normalizeTeamName(team.name) === normalizedName
        )

        if (alreadyExists) {
          return false
        }

        const now = new Date().toISOString()

        const newTeam: SavedTeam = {
          id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
          name: trimmedName,
          pokemonIds: [...pokemonIds],
          createdAt: now,
          updatedAt: now
        }

        set({
          teams: [newTeam, ...get().teams]
        })

        return true
      },

      renameTeam: (teamId, newName) => {
        const trimmedName = newName.trim()

        if (!trimmedName) {
          return false
        }

        const normalizedName = normalizeTeamName(trimmedName)
        const alreadyExists = get().teams.some(
          (team) =>
            team.id !== teamId &&
            normalizeTeamName(team.name) === normalizedName
        )

        if (alreadyExists) {
          return false
        }

        set({
          teams: get().teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  name: trimmedName,
                  updatedAt: new Date().toISOString()
                }
              : team
          )
        })

        return true
      },

      deleteTeam: (teamId) => {
        set({
          teams: get().teams.filter((team) => team.id !== teamId)
        })
      }
    }),
    {
      name: 'saved-teams',
      storage: zustandStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
)
