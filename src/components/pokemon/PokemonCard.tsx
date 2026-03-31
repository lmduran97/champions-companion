import { Image, Text, TouchableOpacity, View } from 'react-native'

import { TypeBadge } from '@/src/components/common/TypeBadge'
import type { Pokemon } from '@/src/domain/pokemon/types'

type PokemonCardProps = {
  pokemon: Pokemon
  onPress?: () => void
}

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className='rounded-card border border-border bg-card p-4'
    >
      <View className='flex-row items-center'>
        <View className='h-20 w-20 items-center justify-center rounded-full bg-surface'>
          {pokemon.artworkUrl ? (
            <Image
              source={{ uri: pokemon.artworkUrl }}
              className='h-16 w-16'
              resizeMode='contain'
            />
          ) : (
            <View className='h-16 w-16 rounded-full bg-surface-alt' />
          )}
        </View>

        <View className='ml-4 flex-1'>
          <Text className='text-caption text-text-secondary'>
            #{pokemon.dexNumber.toString().padStart(3, '0')}
          </Text>

          <Text className='mt-1 text-subtitle font-semibold text-text-primary'>
            {pokemon.name}
          </Text>

          <View className='mt-3 flex-row flex-wrap gap-2'>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
