import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorage } from '@/src/data/storage/zustandStorage'

type BuilderSlot = string | null

type BuilderState = {
  slots: BuilderSlot[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  addPokemonToFirstEmptySlot: (pokemonId: string) => boolean
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
      addPokemonToFirstEmptySlot: (pokemonId) => {
        const { slots } = get()
        const emptyIndex = slots.findIndex((slot) => slot === null)

        if (emptyIndex === -1) {
          return false
        }

        const nextSlots = [...slots]
        nextSlots[emptyIndex] = pokemonId

        set({
          slots: nextSlots
        })

        return true
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
