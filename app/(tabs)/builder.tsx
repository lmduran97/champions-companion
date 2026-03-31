import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { EmptyState, LoadingView, Screen } from '@/src/components/common'
import { TeamSlotCard, TeamSummary } from '@/src/components/team'
import { useBuilderState } from '@/src/features/builder/hooks/useBuilderState'
import { useBuilderTeam } from '@/src/features/builder/hooks/useBuilderTeam'

export default function BuilderScreen() {
  const { slots, summary, isLoading, error, removePokemonFromSlot, clearTeam } =
    useBuilderTeam()
  const { isEmpty } = useBuilderState()

  const handleGoToSave = () => {
    if (isEmpty) {
      return
    }

    router.push('/team/save')
  }

  if (isLoading) {
    return (
      <Screen>
        <LoadingView message='Loading Team Builder...' />
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen>
        <EmptyState title='Something went wrong' description={error} />
      </Screen>
    )
  }

  return (
    <Screen scrollable>
      <View className='flex-row items-center justify-between'>
        <Text className='text-title font-bold text-text-primary'>Builder</Text>

        <View className='flex-row gap-2'>
          <TouchableOpacity
            onPress={handleGoToSave}
            activeOpacity={0.85}
            className='rounded-full bg-primary px-4 py-2'
          >
            <Text className='text-body font-medium text-white'>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearTeam}
            activeOpacity={0.85}
            className='rounded-full bg-surface px-4 py-2'
          >
            <Text className='text-body font-medium text-text-primary'>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className='mt-2 text-body text-text-secondary'>
        Build your team of 6 Pokémon.
      </Text>

      <View className='mt-6'>
        <TeamSummary
          selectedCount={summary.selectedCount}
          totalSlots={summary.totalSlots}
          uniqueTypes={summary.uniqueTypes}
        />
      </View>

      <View className='mt-4 gap-3'>
        {slots.map((slot, index) => (
          <TeamSlotCard
            key={index}
            slotNumber={slot.slotNumber}
            pokemon={slot.pokemon}
            onRemove={
              slot.pokemonId ? () => removePokemonFromSlot(index) : undefined
            }
          />
        ))}
      </View>
    </Screen>
  )
}
