import { Text, View } from 'react-native'

type TeamSummaryDetailProps = {
  teamName: string
  pokemonCount: number
  updatedAt: string
  configuredCount: number
}

export function TeamSummaryDetail({
  teamName,
  pokemonCount,
  updatedAt,
  configuredCount
}: TeamSummaryDetailProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4 mb-2'>
      <Text className='text-title font-bold text-text-primary'>{teamName}</Text>

      <View className='mt-3 gap-2'>
        <Text className='text-body text-text-secondary'>
          Pokémon: {pokemonCount}/6
        </Text>
        <Text className='text-body text-text-secondary'>
          Fully configured: {configuredCount}/{pokemonCount || 0}
        </Text>
        <Text className='text-body text-text-secondary'>
          Updated: {new Date(updatedAt).toLocaleString()}
        </Text>
      </View>
    </View>
  )
}
