import { Text, View } from 'react-native'

import { TypeBadge } from '@/src/components/common/TypeBadge'
import type { Move } from '@/src/domain/pokemon/types'

type PokemonMovesProps = {
  moves: Move[]
}

export function PokemonMoves({ moves }: PokemonMovesProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <Text className='text-subtitle font-semibold text-text-primary'>
        Moves
      </Text>

      <View className='mt-4 gap-3'>
        {moves.map((move) => (
          <View
            key={move.id}
            className='rounded-xl border border-border bg-surface px-4 py-3'
          >
            <View className='flex-row items-start justify-between gap-3'>
              <View className='flex-1'>
                <Text className='text-body font-semibold text-text-primary'>
                  {move.name}
                </Text>

                <Text className='mt-1 text-caption text-text-secondary'>
                  {move.category.charAt(0).toUpperCase() +
                    move.category.slice(1)}
                  {move.power ? ` • Power ${move.power}` : ''}
                  {move.accuracy ? ` • Accuracy ${move.accuracy}` : ''}
                  {move.pp ? ` • PP ${move.pp}` : ''}
                </Text>
              </View>

              <TypeBadge type={move.type} />
            </View>

            {move.description ? (
              <Text className='mt-2 text-body text-text-secondary'>
                {move.description}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  )
}
