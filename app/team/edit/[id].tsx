import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'

import { EmptyState } from '@/src/components/common/EmptyState'
import { Screen } from '@/src/components/common/Screen'
import { TeamNameForm } from '@/src/components/team/TeamNameForm'
import { useSavedTeamsStore } from '@/src/store/useSavedTeamsStore'

export default function EditTeamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { teams, hasHydrated, renameTeam } = useSavedTeamsStore()

  const team = useMemo(() => {
    return teams.find((item) => item.id === id)
  }, [teams, id])

  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    if (team) {
      setTeamName(team.name)
    }
  }, [team])

  const handleRename = () => {
    const trimmedName = teamName.trim()

    if (!team) {
      return
    }

    if (!trimmedName) {
      Alert.alert('Missing name', 'Please enter a team name.')
      return
    }

    const wasRenamed = renameTeam(team.id, trimmedName)
    if (!wasRenamed) {
      Alert.alert('Name already in use', 'Choose a different team name.')
      return
    }

    Alert.alert('Team updated', `"${trimmedName}" was updated successfully.`, [
      {
        text: 'OK',
        onPress: () => router.back()
      }
    ])
  }

  if (!hasHydrated) {
    return (
      <Screen>
        <EmptyState title='Loading...' description='Please wait a moment.' />
      </Screen>
    )
  }

  if (!team) {
    return (
      <Screen>
        <EmptyState
          title='Team not found'
          description='The selected team could not be found.'
        />
      </Screen>
    )
  }

  return (
    <Screen>
      <TeamNameForm
        title='Rename Team'
        description='Choose a new name for this team.'
        value={teamName}
        onChangeText={setTeamName}
        confirmLabel='Update'
        onCancel={() => router.back()}
        onConfirm={handleRename}
      />
    </Screen>
  )
}
