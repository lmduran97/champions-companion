import { Text, View } from 'react-native'

import { TypeBadge } from '@/src/components/common'
import type { PokemonType } from '@/src/domain/pokemon/types'

type TeamSummaryProps = {
  selectedCount: number
  totalSlots: number
  uniqueTypes: PokemonType[]
}

export function TeamSummary({
  selectedCount,
  totalSlots,
  uniqueTypes
}: TeamSummaryProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <Text className='text-subtitle font-semibold text-text-primary'>
        Team Summary
      </Text>

      <Text className='mt-2 text-body text-text-secondary'>
        {selectedCount} / {totalSlots} Pokémon selected
      </Text>

      <View className='mt-4'>
        <Text className='text-body font-medium text-text-primary'>
          Types in team
        </Text>

        {uniqueTypes.length === 0 ? (
          <Text className='mt-2 text-body text-text-muted'>No types yet</Text>
        ) : (
          <View className='mt-3 flex-row flex-wrap gap-2'>
            {uniqueTypes.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
