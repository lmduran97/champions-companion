import { useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import { EmptyState, LoadingView, Screen } from '@/src/components/common'
import { SearchInput } from '@/src/components/common/SearchInput'
import { PokemonCard } from '@/src/components/pokemon'
import { usePokemonList } from '@/src/features/pokedex/hooks/usePokemonList'
import { router } from 'expo-router'

export default function PokedexScreen() {
  const [search, setSearch] = useState('')
  const { data: pokemon = [], isLoading, error } = usePokemonList(search)

  if (isLoading) {
    return (
      <Screen>
        <LoadingView message='Loading Pokédex...' />
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen>
        <EmptyState title='Something went wrong' description={error.message} />
      </Screen>
    )
  }

  return (
    <Screen>
      <Text className='mb-4 text-title font-bold text-text-primary'>
        Pokedex
      </Text>

      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder='Buscar Pokémon'
      />

      <View className='mt-4 flex-1'>
        {pokemon.length === 0 ? (
          <EmptyState
            title='No Pokémon found'
            description='Try a different name, type, or Pokédex number.'
          />
        ) : (
          <FlatList
            data={pokemon}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 24 }}
            ItemSeparatorComponent={() => <View className='h-3' />}
            renderItem={({ item }) => (
              <PokemonCard
                pokemon={item}
                onPress={() => router.push(`/pokemon/${item.id}`)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Screen>
  )
}
