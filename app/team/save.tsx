import { router } from 'expo-router'
import { useState } from 'react'
import { Alert } from 'react-native'

import { Screen } from '@/src/components/common/Screen'
import { TeamNameForm } from '@/src/components/team'
import { useBuilderState } from '@/src/features/builder/hooks/useBuilderState'
import { useSavedTeamsStore } from '@/src/store/useSavedTeamsStore'

export default function SaveTeamScreen() {
  const { slots, isEmpty } = useBuilderState()
  const { saveCurrentTeam } = useSavedTeamsStore()

  const [teamName, setTeamName] = useState('')

  const handleSave = () => {
    const trimmedName = teamName.trim()

    if (isEmpty) {
      Alert.alert('Empty team', 'Add at least one Pokémon before saving.')
      return
    }

    if (!trimmedName) {
      Alert.alert('Missing name', 'Please enter a team name.')
      return
    }

    const wasSaved = saveCurrentTeam(trimmedName, slots)
    if (!wasSaved) {
      Alert.alert('Name already in use', 'Choose a different team name.')
      return
    }

    Alert.alert('Team saved', `"${trimmedName}" was saved successfully.`, [
      {
        text: 'OK',
        onPress: () => router.back()
      }
    ])
  }

  return (
    <Screen>
      <TeamNameForm
        title='Save team'
        description='Give your current team a name'
        value={teamName}
        onChangeText={setTeamName}
        confirmLabel='Save'
        onCancel={() => router.back()}
        onConfirm={handleSave}
      />
    </Screen>
  )
}
