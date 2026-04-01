import { useMemo } from 'react'

import { TeamPokemon } from '@/src/domain/pokemon/types'
import type { SavedTeam } from '@/src/domain/team/types'
import { usePokemonList } from '@/src/features/pokedex/hooks/usePokemonList'
import { useSavedTeamsStore } from '@/src/store/useSavedTeamsStore'

type SavedTeamWithPokemonPreview = {
  team: SavedTeam
  selectedCount: number
  previewSlots: (TeamPokemon | null)[]
}

type UseSavedTeamsWithPokemonReturn = {
  teams: SavedTeamWithPokemonPreview[]
  isLoading: boolean
  error: string | null
  hasHydrated: boolean
}

export function useSavedTeamsWithPokemon(): UseSavedTeamsWithPokemonReturn {
  const { teams: savedTeams, hasHydrated } = useSavedTeamsStore()
  const { data: pokemonList = [], isLoading, error } = usePokemonList()

  const pokemonMap = useMemo(() => {
    return new Map(pokemonList.map((pokemon) => [pokemon.id, pokemon]))
  }, [pokemonList])

  const teams = useMemo<SavedTeamWithPokemonPreview[]>(() => {
    return savedTeams.map((team) => {
      const previewSlots = team.pokemonIds.map((pokemonId) => {
        if (!pokemonId) {
          return null
        }

        return pokemonMap.get(pokemonId) ?? null
      })

      return {
        team,
        selectedCount: team.pokemonIds.filter(Boolean).length,
        previewSlots
      }
    })
  }, [savedTeams, pokemonMap])

  return {
    teams,
    isLoading,
    error: error ? error.message : null,
    hasHydrated
  }
}
