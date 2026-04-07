import { TeamPokemon } from '@/src/domain/pokemon/types'
import { pokemonTypeStyles } from '@/src/utils/pokemonTypeStyles'
import { Image, Text, TouchableOpacity, View } from 'react-native'

type TeamSlotCardDetailProps = {
  slot: TeamPokemon
  isSelected?: boolean
  onPress?: () => void
}

export function TeamSlotCardDetail({
  slot,
  isSelected,
  onPress
}: TeamSlotCardDetailProps) {
  return (
    <TouchableOpacity
      className='rounded-card border border-border bg-card px-2 py-3 flex-1'
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        borderColor: isSelected ? '#2d4ea3' : '#2a3140',
        shadowColor: isSelected ? '#2d4ea3' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isSelected ? 0.5 : 0.1,
        shadowRadius: 4,
        elevation: isSelected ? 5 : 1
      }}
    >
      <Image
        source={{ uri: slot.artworkUrl }}
        className='h-10 w-10 self-center'
        resizeMode='contain'
      />
      <View className='flex-row flex-wrap items-center gap-2'>
        <Text className='text-body font-bold text-text-primary mt-1'>
          {slot.name}
        </Text>
        <View className='mt-1 flex-row flex-wrap gap-1'>
          {slot.types.map((type) => (
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
      <Text className='text-small text-text-secondary mt-2'>
        {slot.battleConfig.nature
          ? slot.battleConfig.nature?.name.charAt(0).toUpperCase() +
            slot.battleConfig.nature?.name.slice(1)
          : 'No nature selected'}
      </Text>
      <Text className='text-small text-text-secondary mt-2'>
        {slot.battleConfig.ability?.name ?? 'No ability selected'}
      </Text>
      <Text className='text-small text-text-secondary mt-2'>
        {slot.battleConfig.heldItem?.name ?? 'No item selected'}
      </Text>
      <View className='mt-2 flex-row flex-wrap gap-1'>
        {!(slot.battleConfig.moves && slot.battleConfig.moves.length > 0) ? (
          <Text className='text-small text-text-secondary'>
            No moves selected
          </Text>
        ) : (
          (slot.battleConfig.moves ?? []).filter(Boolean).map((move, index) => (
            <Text key={index} className='text-small text-text-secondary'>
              • {move?.name ?? 'Empty Move'}
            </Text>
          ))
        )}
      </View>
    </TouchableOpacity>
  )
}
