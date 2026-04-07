import { useMemo } from 'react'

import type { PokemonType, TeamPokemon } from '@/src/domain/pokemon/types'
import { useBuilderStore } from '@/src/store/useBuilderStore'

type BuilderTeamSlot = {
  slotNumber: number
  pokemon?: TeamPokemon
}

type BuilderTeamSummary = {
  selectedCount: number
  totalSlots: number
  uniqueTypes: PokemonType[]
}

type UseBuilderTeamReturn = {
  slots: BuilderTeamSlot[]
  summary: BuilderTeamSummary
  removePokemonFromSlot: (index: number) => void
  clearTeam: () => void
}

export function useBuilderTeam(): UseBuilderTeamReturn {
  const { slots, removePokemonFromSlot, clearTeam } = useBuilderStore()

  const enrichedSlots = useMemo<BuilderTeamSlot[]>(() => {
    return slots.map((pokemon, index) => ({
      slotNumber: index + 1,
      pokemon: pokemon ? pokemon : undefined
    }))
  }, [slots])

  const summary = useMemo<BuilderTeamSummary>(() => {
    const selectedPokemons = enrichedSlots
      .map((slot) => slot.pokemon)
      .filter((pokemon): pokemon is TeamPokemon => Boolean(pokemon))

    const typeSet = new Set<PokemonType>()

    selectedPokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => typeSet.add(type))
    })

    return {
      selectedCount: selectedPokemons.length,
      totalSlots: 6,
      uniqueTypes: Array.from(typeSet)
    }
  }, [enrichedSlots])

  return {
    slots: enrichedSlots,
    summary,
    removePokemonFromSlot,
    clearTeam
  }
}
