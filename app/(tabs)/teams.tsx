import { router } from 'expo-router'
import { Alert, Text, View } from 'react-native'

import { EmptyState, LoadingView, Screen } from '@/src/components/common'
import { SavedTeamCard } from '@/src/components/team'
import { TeamPokemon } from '@/src/domain/pokemon/types'
import { useBuilderStore } from '@/src/store/useBuilderStore'
import { useSavedTeamsStore } from '@/src/store/useSavedTeamsStore'

export default function TeamsScreen() {
  const {
    teams,
    hasHydrated: teamsHasHydrated,
    deleteTeam
  } = useSavedTeamsStore()
  const { setSlots, hasHydrated: builderHasHydrated } = useBuilderStore()

  const handleLoadTeam = (pokemons: (TeamPokemon | null)[]) => {
    setSlots(pokemons)
    Alert.alert('Team loaded', 'The team was loaded into the builder.')
    router.push('/builder')
  }

  const handleDeleteTeam = (teamId: string, teamName: string) => {
    Alert.alert(
      'Delete team',
      `Are you sure you want to delete "${teamName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTeam(teamId)
        }
      ]
    )
  }

  if (!teamsHasHydrated || !builderHasHydrated) {
    return (
      <Screen>
        <LoadingView message='Loading saved teams...' />
      </Screen>
    )
  }

  if (!teams) {
    return (
      <Screen>
        <EmptyState title='Something went wrong' />
      </Screen>
    )
  }

  return (
    <Screen scrollable>
      <Text className='text-title font-bold text-text-primary'>Teams</Text>
      <Text className='mt-2 text-body text-text-secondary'>
        Manage your saved teams.
      </Text>

      <View className='mt-6 gap-3'>
        {teams.length === 0 ? (
          <EmptyState
            title='No saved teams yet'
            description='Save a team from the builder and it will appear here.'
          />
        ) : (
          teams.map((team) => (
            <SavedTeamCard
              key={team.id + '-' + team.name.trim().replace(/\s/g, '')}
              team={team}
              onLoad={() => handleLoadTeam(team.pokemons)}
              onRename={() =>
                router.push({
                  pathname: '/team/edit/[id]',
                  params: { id: team.id }
                })
              }
              onDelete={() => handleDeleteTeam(team.id, team.name)}
            />
          ))
        )}
      </View>
    </Screen>
  )
}
