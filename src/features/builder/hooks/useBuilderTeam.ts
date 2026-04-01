import { useMemo } from 'react'

import type { PokemonType, TeamPokemon } from '@/src/domain/pokemon/types'
import { useBuilderStore } from '@/src/store/useBuilderStore'
import { usePokemonList } from '../../pokedex/hooks/usePokemonList'

type BuilderTeamSlot = {
  slotNumber: number
  pokemonId: string | null
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
  isLoading: boolean
  error: string | null
  removePokemonFromSlot: (index: number) => void
  clearTeam: () => void
}

export function useBuilderTeam(): UseBuilderTeamReturn {
  const { slots, removePokemonFromSlot, clearTeam } = useBuilderStore()
  const { data: pokemonList = [], isLoading, error } = usePokemonList()

  const pokemonMap = useMemo(() => {
    return new Map(pokemonList.map((pokemon) => [pokemon.id, pokemon]))
  }, [pokemonList])

  const enrichedSlots = useMemo<BuilderTeamSlot[]>(() => {
    return slots.map((pokemonId, index) => ({
      slotNumber: index + 1,
      pokemonId,
      pokemon: pokemonId ? pokemonMap.get(pokemonId) : undefined
    }))
  }, [slots, pokemonMap])

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
    isLoading,
    error: error ? error.message : null,
    removePokemonFromSlot,
    clearTeam
  }
}
