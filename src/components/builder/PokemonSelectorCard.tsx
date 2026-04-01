import { Image, Text, TouchableOpacity, View } from 'react-native'

import { Pokemon } from '@/src/domain/pokemon/types'
import { pokemonTypeStyles } from '@/src/utils/pokemonTypeStyles'

type PokemonSelectorCardProps = {
  pokemon: Pokemon
  isAlreadyInTeam?: boolean
  onSelect: () => void
}
export function PokemonSelectorCard({
  pokemon,
  isAlreadyInTeam,
  onSelect
}: PokemonSelectorCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      disabled={isAlreadyInTeam}
      className='flex-1 rounded-card border border-border p-4 bg-surface-alt'
      style={{
        opacity: isAlreadyInTeam ? 0.3 : 1
      }}
    >
      <View className='flex-row items-center'>
        <View
          className='items-center justify-center bg-surface-alt'
          style={{
            opacity: isAlreadyInTeam ? 0.5 : 1,
            backgroundColor: isAlreadyInTeam ? 'transparent' : '#1f2430'
          }}
        >
          {pokemon.artworkUrl ? (
            <Image
              source={{ uri: pokemon.artworkUrl }}
              className='h-10 w-10'
              resizeMode='contain'
            />
          ) : (
            <View className='h-10 w-10 rounded-full bg-surface-alt' />
          )}
        </View>

        <View className='ml-4'>
          <Text className='text-caption font-semibold text-text-primary'>
            {pokemon.name}
          </Text>

          <View className='mt-1 flex-row flex-wrap gap-1'>
            {pokemon.types.map((type) => (
              <View
                key={type}
                className='h-2 w-2 rounded-full'
                style={{
                  backgroundColor: pokemonTypeStyles[type].bg
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
