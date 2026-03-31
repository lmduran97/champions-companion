import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorage } from '@/src/data/storage/zustandStorage'
import type { SavedTeam } from '@/src/domain/team/types'

type SavedTeamsState = {
  teams: SavedTeam[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  saveCurrentTeam: (name: string, pokemonIds: (string | null)[]) => void
  renameTeam: (teamId: string, newName: string) => void
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
          return
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
      },

      renameTeam: (teamId, newName) => {
        const trimmedName = newName.trim()

        if (!trimmedName) {
          return
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
