import { Image, Text, View } from 'react-native'

import { TypeBadge } from '@/src/components/common/TypeBadge'
import type { Pokemon } from '@/src/domain/pokemon/types'

type PokemonHeaderProps = {
  pokemon: Pokemon
}

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <View className='items-center'>
        {pokemon.artworkUrl ? (
          <Image
            source={{ uri: pokemon.artworkUrl }}
            className='h-40 w-40'
            resizeMode='contain'
          />
        ) : (
          <View className='h-40 w-40 rounded-full bg-surface' />
        )}
      </View>

      <Text className='mt-4 text-center text-caption text-text-secondary'>
        #{pokemon.dexNumber.toString().padStart(3, '0')}
      </Text>

      <Text className='mt-1 text-center text-title font-bold text-text-primary'>
        {pokemon.name}
      </Text>

      <View className='mt-4 flex-row flex-wrap justify-center gap-2'>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </View>
    </View>
  )
}
