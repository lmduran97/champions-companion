import { useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'

import { EmptyState, Screen } from '@/src/components/common'
import {
  TeamSlotConfiguration,
  TeamSlotsDetail,
  TeamSummaryDetail
} from '@/src/components/team'
import { TeamPokemon } from '@/src/domain/pokemon/types'
import { useSavedTeamsStore } from '@/src/store/useSavedTeamsStore'
import { Alert, ScrollView } from 'react-native'

export default function TeamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { teams, hasHydrated, updateTeam } = useSavedTeamsStore()

  const [selectedSlot, setSelectedSlot] = useState<TeamPokemon | null>(null)

  const team = useMemo(() => {
    return teams.find((item) => item.id === id)
  }, [teams, id])

  if (!hasHydrated) {
    return (
      <Screen>
        <EmptyState title='Loading...' description='Please wait a moment.' />
      </Screen>
    )
  }

  if (!teams || teams.length === 0 || !team) {
    return (
      <Screen>
        <EmptyState
          title='Team not found'
          description='The requested team could not be found.'
        />
      </Screen>
    )
  }

  const onSavePokemon = (pokemon: TeamPokemon) => {
    const index = team.pokemons.findIndex((p) => p?.id === pokemon.id)

    if (index === -1) {
      updateTeam(team.id, [...team.pokemons, pokemon])
      return
    }
    updateTeam(team.id, [
      ...team.pokemons.slice(0, index),
      pokemon,
      ...team.pokemons.slice(index + 1)
    ])

    Alert.alert('Team updated', 'The team was updated successfully.')
  }

  const totallyConfiguredPokemons = () => {
    let count = 0

    team.pokemons.forEach((pokemon) => {
      if (pokemon?.battleConfig) {
        const statPoints = pokemon.battleConfig.statPoints
        const sumStatPoints =
          statPoints.hp +
          statPoints.attack +
          statPoints.defense +
          statPoints.specialAttack +
          statPoints.specialDefense +
          statPoints.speed

        if (
          pokemon.battleConfig.ability?.id &&
          pokemon.battleConfig.nature?.name &&
          pokemon.battleConfig.heldItem?.id &&
          pokemon.battleConfig.moves[0]?.id &&
          pokemon.battleConfig.moves[1]?.id &&
          pokemon.battleConfig.moves[2]?.id &&
          pokemon.battleConfig.moves[3]?.id &&
          sumStatPoints === 66
        ) {
          count++
        }
      }
    })

    return count
  }

  return (
    <Screen>
      <TeamSummaryDetail
        teamName={team.name || 'Unknown Team'}
        pokemonCount={
          team.pokemons.filter((pokemon) => pokemon?.id != null).length
        }
        updatedAt={team.updatedAt}
        configuredCount={totallyConfiguredPokemons()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        <TeamSlotsDetail
          slots={team.pokemons.filter(
            (pokemon): pokemon is TeamPokemon => !!pokemon
          )}
          onSlotPress={(pokemon: TeamPokemon) => setSelectedSlot(pokemon)}
          selectedSlot={selectedSlot}
        />
        <TeamSlotConfiguration
          key={selectedSlot?.id ?? 'empty'}
          pokemon={selectedSlot}
          onSavePokemon={onSavePokemon}
        />
      </ScrollView>
    </Screen>
  )
}
