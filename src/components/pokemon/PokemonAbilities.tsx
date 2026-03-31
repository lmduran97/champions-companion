import { Text, View } from 'react-native'

import type { Ability } from '@/src/domain/pokemon/types'

type PokemonAbilitiesProps = {
  abilities: Ability[]
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <Text className='text-subtitle font-semibold text-text-primary'>
        Abilities
      </Text>

      <View className='mt-4 gap-3'>
        {abilities.map((ability) => (
          <View
            key={ability.id}
            className='rounded-xl border border-border bg-surface px-4 py-3'
          >
            <Text className='text-body font-semibold text-text-primary'>
              {ability.name}
              {ability.isHidden ? ' (Hidden)' : ''}
            </Text>

            {ability.description ? (
              <Text className='mt-1 text-body text-text-secondary'>
                {ability.description}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  )
}
