import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router } from 'expo-router'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import type { SavedTeam } from '@/src/domain/team/types'

type SavedTeamCardProps = {
  team: SavedTeam
  onLoad: () => void
  onRename: () => void
  onDelete: () => void
}

export function SavedTeamCard({
  team,
  onLoad,
  onRename,
  onDelete
}: SavedTeamCardProps) {
  if (!team.pokemons || team.pokemons.length === 0) {
    return null
  }

  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <View className='flex-1 flex-row items-center justify-between'>
        <Text className='text-subtitle font-semibold text-text-primary'>
          {team.name}
        </Text>
        <FontAwesome
          name='minus-circle'
          size={24}
          color='#e85d75'
          onPress={onDelete}
        />
      </View>

      <Text className='mt-2 text-body text-text-secondary'>
        {team.pokemons.filter((pokemon) => pokemon?.id != null).length} / 6
        Pokémon
      </Text>

      <Text className='mt-1 text-caption text-text-muted'>
        Updated {new Date(team.updatedAt).toLocaleString()}
      </Text>

      <View className='mt-4 flex-row items-center justify-between'>
        {team.pokemons.length === 0 ? (
          <Text className='text-body text-text-muted'>
            No Pokémon in this team
          </Text>
        ) : (
          <FlatList
            data={team.pokemons}
            keyExtractor={(item) => team.id + '-' + item?.id}
            scrollEnabled={false}
            numColumns={3}
            columnWrapperStyle={{ gap: 32, marginBottom: 28 }}
            renderItem={({ item }) => (
              <View className=''>
                {item?.artworkUrl ? (
                  <Image
                    source={{ uri: item.artworkUrl }}
                    className='h-12 w-12'
                    resizeMode='contain'
                  />
                ) : (
                  <View className='h-12 w-12 rounded-full bg-surface-alt' />
                )}
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        <MaterialIcons
          name='arrow-forward-ios'
          size={32}
          color='white'
          className='mr-4 pb-6'
          onPress={() =>
            router.push({ pathname: `/team/[id]`, params: { id: team.id } })
          }
        />
      </View>

      <View className='flex-row flex-wrap gap-2'>
        <TouchableOpacity
          onPress={onLoad}
          activeOpacity={0.85}
          className='rounded-full bg-primary px-4 py-2'
        >
          <Text className='text-body font-medium text-white'>Load</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onRename}
          activeOpacity={0.85}
          className='rounded-full bg-surface px-4 py-2'
        >
          <Text className='text-body font-medium text-text-primary'>
            Rename
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
