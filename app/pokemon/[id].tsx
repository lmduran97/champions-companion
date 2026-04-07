import { useLocalSearchParams } from 'expo-router'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

import { EmptyState, LoadingView, Screen } from '@/src/components/common'
import {
  PokemonAbilities,
  PokemonHeader,
  PokemonMoves,
  PokemonStats
} from '@/src/components/pokemon'
import { TeamPokemon } from '@/src/domain/pokemon/types'
import { usePokemonDetail } from '@/src/features/pokedex/hooks/usePokemonDetail'
import { useBuilderStore } from '@/src/store/useBuilderStore'

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: pokemon, isLoading, error } = usePokemonDetail(id)

  const { addPokemonToFirstEmptySlot } = useBuilderStore()

  const handleAddToTeam = () => {
    if (!pokemon) {
      return
    }

    const pokemonWithConfig = {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      spriteUrl: pokemon.spriteUrl,
      artworkUrl: pokemon.artworkUrl,
      abilities: pokemon.abilities,
      moves: pokemon.moves,
      battleConfig: {
        nature: null,
        ability: null,
        heldItem: null,
        moves: [null, null, null, null],
        statPoints: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0
        }
      }
    } as TeamPokemon

    const result = addPokemonToFirstEmptySlot(pokemonWithConfig)

    if (!result.ok) {
      if (result.reason === 'TEAM_FULL') {
        return Alert.alert('Team full', 'Your team already has 6 Pokémon.')
      } else if (result.reason === 'DUPLICATE_POKEMON') {
        return Alert.alert(
          'Duplicate Pokémon',
          `${pokemon.name} is already in your team.`
        )
      } else {
        return Alert.alert('Error', 'Could not add Pokémon to team.')
      }
    }

    Alert.alert('Added to team', `${pokemon.name} was added to your team.`)
  }

  if (isLoading) {
    return (
      <Screen>
        <LoadingView message='Loading Pokémon...' />
      </Screen>
    )
  }

  if (error || !pokemon) {
    return (
      <Screen>
        <EmptyState
          title='Pokémon not found'
          description={error?.message ?? 'No data available'}
        />
      </Screen>
    )
  }

  return (
    <Screen scrollable>
      <PokemonHeader pokemon={pokemon} />

      <TouchableOpacity
        onPress={handleAddToTeam}
        activeOpacity={0.85}
        className='mt-4 rounded-card bg-primary px-4 py-4'
      >
        <Text className='text-center text-body font-semibold text-white'>
          Add to team
        </Text>
      </TouchableOpacity>

      <View className='mt-4'>
        <PokemonStats stats={pokemon.stats} />
      </View>

      <View className='mt-4'>
        <PokemonAbilities abilities={pokemon.abilities} />
      </View>

      <View className='mt-4'>
        <PokemonMoves moves={pokemon.moves} />
      </View>
    </Screen>
  )
}
