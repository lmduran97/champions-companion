import { Text, View } from 'react-native'

import { PokemonType } from '@/src/domain/pokemon/types'
import { pokemonTypeStyles } from '@/src/utils/pokemonTypeStyles'

type TypeBadgeProps = {
  type: PokemonType
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const styles = pokemonTypeStyles[type]

  return (
    <View
      className='rounded-full px-3 py-1'
      style={{ backgroundColor: styles.bg }}
    >
      <Text
        className='text-xs font-semibold uppercase'
        style={{ color: styles.text }}
      >
        {type}
      </Text>
    </View>
  )
}
