import { Text, View } from 'react-native'

import { StatBlock, TeamPokemon } from '@/src/domain/pokemon/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TypeBadge } from '../common'

type TeamSlotConfigurationProps = {
  pokemon?: TeamPokemon | null
}

export function TeamSlotConfiguration({ pokemon }: TeamSlotConfigurationProps) {
  const statRows: { key: keyof StatBlock; label: string }[] = [
    { key: 'hp', label: 'HP' },
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'specialAttack', label: 'Sp. Atk' },
    { key: 'specialDefense', label: 'Sp. Def' },
    { key: 'speed', label: 'Speed' }
  ]

  if (!pokemon) {
    return (
      <View className='rounded-card border border-border bg-card p-4'>
        <Text className='text-body font-bold text-text-primary mb-2'>
          Slot Configuration
        </Text>
        <View className='items-center'>
          <MaterialCommunityIcons
            name='pokeball'
            size={24}
            color='white'
            style={{ opacity: 0.5, marginBottom: 4 }}
          />
          <Text className='text-small text-text-secondary text-center'>
            Select a Pokémon from the team slots above to configure its details,
            including ability, held item, and moves.
          </Text>
        </View>
      </View>
    )
  }

  const handleOnPressMinusStat = (stat: {
    key: keyof StatBlock
    label: string
  }) => {
    console.log(stat)

    // conseguir id del team para poder modificarlo en la store
  }

  const handleOnPressPlusStat = (stat: {
    key: keyof StatBlock
    label: string
  }) => {
    console.log(stat)
  }

  // FALTA: crear dropdowns para dar la posibilidad al usuario de elegir la config
  // de cada aspecto del pokemon

  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <View className='items-center flex-row gap-4'>
        <Text className='text-subtitle font-bold text-text-primary'>
          {pokemon.name}
        </Text>
        <View className='flex-row flex-wrap justify-center gap-2'>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>
      </View>

      <View className='mt-4'>
        <Text className='text-caption text-text-secondary'>Nature</Text>
        <Text className='text-body text-text-primary'>
          {pokemon.battleConfig?.nature?.name || 'Not set'}
        </Text>
      </View>

      <View className='mt-4'>
        <Text className='text-caption text-text-secondary'>Ability</Text>
        <Text className='text-body text-text-primary'>
          {pokemon.battleConfig?.ability?.name || 'Not set'}
        </Text>
      </View>

      <View className='mt-4'>
        <Text className='text-caption text-text-secondary'>Held item</Text>
        <Text className='text-body text-text-primary'>
          {pokemon.battleConfig?.heldItem || 'Not set'}
        </Text>
      </View>

      <View className='mt-4'>
        <Text className='text-caption text-text-secondary'>Moves</Text>
        {pokemon.battleConfig?.moves.map((move, index) => {
          if (!move) {
            return (
              <Text key={index} className='text-body text-text-primary'>
                Not set
              </Text>
            )
          } else {
            return (
              <Text key={index} className='text-body text-text-primary'>
                {move.name}
              </Text>
            )
          }
        })}
      </View>

      <View className='mt-4'>
        <View className='flex-row items-center gap-6'>
          <Text className='text-caption text-text-secondary'>Stat points</Text>
          <Text className='text-caption text-text-secondary'>0/66</Text>
        </View>
        <View className='mt-4 gap-1'>
          {statRows.map((stat) => {
            const value = pokemon.battleConfig?.statPoints[stat.key] ?? 0
            const widthPercentage = Math.min((value / 32) * 100, 100)

            return (
              <View key={stat.key} className='flex-row items-center gap-3'>
                <FontAwesome
                  name='minus-circle'
                  size={24}
                  color='white'
                  onPress={() => handleOnPressMinusStat(stat)}
                />
                <View className='flex-1'>
                  <View className='mb-1 flex-row items-center justify-between'>
                    <Text className='text-body text-text-secondary'>
                      {stat.label}
                    </Text>
                    <Text className='text-body font-semibold text-text-primary'>
                      {value}
                    </Text>
                  </View>

                  <View className='h-2 overflow-hidden rounded-full bg-surface'>
                    <View
                      className='h-2 rounded-full bg-primary'
                      style={{ width: `${widthPercentage}%` }}
                    />
                  </View>
                </View>
                <FontAwesome
                  name='plus-circle'
                  size={24}
                  color='white'
                  onPress={() => handleOnPressPlusStat(stat)}
                />
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
