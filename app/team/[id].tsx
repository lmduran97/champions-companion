import { useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'

import { EmptyState, Screen } from '@/src/components/common'
import {
  TeamSlotConfiguration,
  TeamSlotsDetail,
  TeamSummaryDetail
} from '@/src/components/team'
import { TeamPokemon } from '@/src/domain/pokemon/types'
import { useSavedTeamsWithPokemon } from '@/src/features/team/hooks/useSavedTeamsWithPokemon'
import { ScrollView } from 'react-native'

export default function TeamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { teams, hasHydrated, error, isLoading } = useSavedTeamsWithPokemon()

  const [selectedSlot, setSelectedSlot] = useState<TeamPokemon | null>(null)

  const team = useMemo(() => {
    return teams.find((item) => item.team.id === id)
  }, [teams, id])

  if (!hasHydrated || isLoading) {
    return (
      <Screen>
        <EmptyState title='Loading...' description='Please wait a moment.' />
      </Screen>
    )
  }

  if (!teams || teams.length === 0 || error || !team) {
    return (
      <Screen>
        <EmptyState
          title='Team not found'
          description='The requested team could not be found.'
        />
      </Screen>
    )
  }

  return (
    <Screen>
      <TeamSummaryDetail
        teamName={team.team.name || 'Unknown Team'}
        pokemonCount={team.previewSlots.filter((id) => id !== null).length}
        updatedAt={team.team.updatedAt}
        configuredCount={0}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        <TeamSlotsDetail
          slots={team.previewSlots.filter((id): id is TeamPokemon => !!id)}
          onSlotPress={(pokemon: TeamPokemon) => setSelectedSlot(pokemon)}
          selectedSlot={selectedSlot}
        />
        <TeamSlotConfiguration pokemon={selectedSlot} />
      </ScrollView>
    </Screen>
  )
}
