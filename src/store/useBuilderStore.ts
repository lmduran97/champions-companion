import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorage } from '@/src/data/storage/zustandStorage'
import { TeamPokemon } from '../domain/pokemon/types'

type BuilderSlot = TeamPokemon | null

type AddPokemonToFirstEmptySlotResult =
  | { ok: true }
  | {
      ok: false
      reason: 'TEAM_FULL' | 'DUPLICATE_POKEMON'
    }

type BuilderState = {
  slots: BuilderSlot[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  addPokemonToFirstEmptySlot: (
    pokemon: TeamPokemon
  ) => AddPokemonToFirstEmptySlotResult
  removePokemonFromSlot: (index: number) => void
  clearTeam: () => void
  setSlots: (slots: BuilderSlot[]) => void
}

const EMPTY_SLOTS: BuilderSlot[] = [null, null, null, null, null, null]

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      slots: [...EMPTY_SLOTS],

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addPokemonToFirstEmptySlot: (pokemon) => {
        const { slots } = get()
        const emptyIndex = slots.findIndex((slot) => slot === null)

        if (emptyIndex === -1) {
          return {
            ok: false,
            reason: 'TEAM_FULL' as const
          }
        }

        const alreadyExists = slots.some((slot) => slot?.id === pokemon.id)
        if (alreadyExists) {
          return { ok: false, reason: 'DUPLICATE_POKEMON' }
        }

        const nextSlots = [...slots]
        nextSlots[emptyIndex] = pokemon

        set({
          slots: nextSlots
        })

        return {
          ok: true
        }
      },

      removePokemonFromSlot: (index) =>
        set((state) => {
          const nextSlots = [...state.slots]
          nextSlots[index] = null

          return {
            slots: nextSlots
          }
        }),

      clearTeam: () =>
        set({
          slots: [...EMPTY_SLOTS]
        }),

      setSlots: (slots) =>
        set({
          slots: [...slots]
        })
    }),
    {
      name: 'builder-store',
      storage: zustandStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
)
