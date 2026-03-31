import { Pokemon } from '@/src/domain/pokemon/types'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TypeBadge } from '../common'

type TeamSlotCardProps = {
  slotNumber: number
  pokemon?: Pokemon
  onRemove?: () => void
}

export function TeamSlotCard({
  slotNumber,
  pokemon,
  onRemove
}: TeamSlotCardProps) {
  const isEmpty = !pokemon

  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <Text className='text-caption text-text-secondary'>
        Slot {slotNumber}
      </Text>

      {isEmpty ? (
        <View className='flex-row mt-2 gap-3 items-center'>
          <Text className='text-body text-text-muted'>Empty slot</Text>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.85}
            className='rounded-card bg-primary px-4 py-2'
          >
            <Text className='text-body text-white'>+ Add Pokémon</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className='mt-3 flex-row items-center'>
            <View className='h-16 w-16 items-center justify-center rounded-full bg-surface'>
              {pokemon.artworkUrl ? (
                <Image
                  source={{ uri: pokemon.artworkUrl }}
                  className='h-14 w-14'
                  resizeMode='contain'
                />
              ) : (
                <View className='h-14 w-14 rounded-full bg-surface-alt' />
              )}
            </View>

            <View className='ml-4 flex-1'>
              <Text className='text-caption text-text-secondary'>
                #{pokemon.dexNumber.toString().padStart(3, '0')}
              </Text>

              <Text className='mt-1 text-subtitle font-semibold text-text-primary'>
                {pokemon.name}
              </Text>

              <View className='mt-2 flex-row flex-wrap gap-2'>
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={onRemove}
            activeOpacity={0.85}
            className='mt-4 self-start rounded-full bg-surface px-3 py-2'
          >
            <Text className='text-caption font-medium text-text-primary'>
              Remove
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
