import { Text, View } from 'react-native'

import type { StatBlock } from '@/src/domain/pokemon/types'

type PokemonStatsProps = {
  stats: StatBlock
}

const statRows: { key: keyof StatBlock; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'Attack' },
  { key: 'defense', label: 'Defense' },
  { key: 'specialAttack', label: 'Sp. Atk' },
  { key: 'specialDefense', label: 'Sp. Def' },
  { key: 'speed', label: 'Speed' }
]

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <Text className='text-subtitle font-semibold text-text-primary'>
        Base Stats
      </Text>

      <View className='mt-4 gap-3'>
        {statRows.map((stat) => {
          const value = stats[stat.key]
          const widthPercentage = Math.min((value / 180) * 100, 100)

          return (
            <View key={stat.key}>
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
          )
        })}
      </View>
    </View>
  )
}
