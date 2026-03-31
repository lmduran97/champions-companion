import { Image, Text, TouchableOpacity, View } from 'react-native'

import { Pokemon } from '@/src/domain/pokemon/types'
import type { SavedTeam } from '@/src/domain/team/types'

type SavedTeamCardProps = {
  team: SavedTeam
  selectedCount: number
  previewSlots: (Pokemon | null)[]
  onLoad: () => void
  onRename: () => void
  onDelete: () => void
}

export function SavedTeamCard({
  team,
  selectedCount,
  previewSlots,
  onLoad,
  onRename,
  onDelete
}: SavedTeamCardProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <Text className='text-subtitle font-semibold text-text-primary'>
        {team.name}
      </Text>

      <Text className='mt-2 text-body text-text-secondary'>
        {selectedCount} / 6 Pokémon
      </Text>

      <Text className='mt-1 text-caption text-text-muted'>
        Updated {new Date(team.updatedAt).toLocaleString()}
      </Text>

      <View className='mt-4 flex-row flex-wrap gap-2'>
        {previewSlots.length === 0 ? (
          <Text className='text-body text-text-muted'>
            No Pokémon in this team
          </Text>
        ) : (
          previewSlots.map((pokemon, index) => (
            <View
              key={team.id + '-' + index}
              className='h-14 w-14 items-center justify-center rounded-full bg-surface'
            >
              {pokemon?.artworkUrl ? (
                <Image
                  source={{ uri: pokemon.artworkUrl }}
                  className='h-12 w-12'
                  resizeMode='contain'
                />
              ) : (
                <View className='h-12 w-12 rounded-full bg-surface-alt' />
              )}
            </View>
          ))
        )}
      </View>

      <View className='mt-4 flex-row flex-wrap gap-2'>
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

        <TouchableOpacity
          onPress={onDelete}
          activeOpacity={0.85}
          className='rounded-full bg-surface px-4 py-2'
        >
          <Text className='text-body font-medium text-text-primary'>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
