import { TeamPokemon } from '@/src/domain/pokemon/types'
import { FlatList, View } from 'react-native'
import { TeamSlotCardDetail } from './TeamSlotCardDetail'

type TeamSlotsDetailProps = {
  slots: TeamPokemon[]
  onSlotPress: (pokemon: TeamPokemon) => void
  selectedSlot?: TeamPokemon | null
}

export function TeamSlotsDetail({
  slots,
  onSlotPress,
  selectedSlot
}: TeamSlotsDetailProps) {
  return (
    <View className='mt-2'>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 6, marginBottom: 10 }}
        renderItem={({ item }) => (
          <View className='w-[32%]'>
            <TeamSlotCardDetail
              slot={item}
              isSelected={item.id === selectedSlot?.id}
              onPress={() => onSlotPress(item)}
            />
          </View>
        )}
      />
    </View>
  )
}
