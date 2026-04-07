import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useMemo, useState } from 'react'
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { Pokemon, TeamPokemon } from '@/src/domain/pokemon/types'
import { usePokemonList } from '@/src/features/pokedex/hooks/usePokemonList'
import { useBuilderStore } from '@/src/store/useBuilderStore'
import { EmptyState, LoadingView, SearchInput } from '../common'
import { PokemonSelectorCard } from './PokemonSelectorCard'

type PokemonSelectorModalProps = {
  visible: boolean
  onClose: () => void
}
export function PokemonSelectorModal({
  visible,
  onClose
}: PokemonSelectorModalProps) {
  const [search, setSearch] = useState('')
  const { data: pokemon = [], isLoading, error } = usePokemonList(search)
  const { addPokemonToFirstEmptySlot, slots } = useBuilderStore()

  const sortedPokemon = useMemo(() => {
    const pokemonInTeam = pokemon.filter((p) =>
      slots.some((slot) => slot?.id === p.id)
    )
    const pokemonNotInTeam = pokemon.filter(
      (p) => !slots.some((slot) => slot?.id === p.id)
    )
    return [...pokemonNotInTeam, ...pokemonInTeam]
  }, [pokemon, slots])

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  const handleAddToTeam = (selectedPokemon: Pokemon) => {
    if (!selectedPokemon) {
      return
    }

    const pokemonWithConfig = {
      id: selectedPokemon.id,
      name: selectedPokemon.name,
      types: selectedPokemon.types,
      spriteUrl: selectedPokemon.spriteUrl,
      artworkUrl: selectedPokemon.artworkUrl,
      abilities: selectedPokemon.abilities,
      moves: selectedPokemon.moves,
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
      return Alert.alert('Error', 'Could not add Pokémon to team.')
    }

    handleClose()
  }

  return (
    <Modal
      visible={visible}
      animationType='fade'
      transparent
      onRequestClose={handleClose}
      style={{
        boxShadow: '1px 2px 2px 0 rgba(0, 0, 0, 0.08)'
      }}
    >
      <TouchableOpacity
        className='flex-1 items-center justify-center bg-overlay'
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableWithoutFeedback>
          <View
            className='rounded-card border border-border bg-card p-4'
            style={{
              width: '90%',
              minHeight: 500,
              height: '75%'
            }}
          >
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-subtitle font-semibold text-text-primary'>
                Select Pokémon
              </Text>
              <FontAwesome
                name='close'
                size={24}
                color='white'
                onPress={handleClose}
              />
            </View>

            <Text className='text-body text-text-secondary mb-4'>
              Select Pokémon to add to your team.
            </Text>

            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder='Search Pokémon'
            />

            <View className='mt-4 flex-1'>
              {isLoading ? (
                <View className='items-center justify-center py-10'>
                  <LoadingView message='Loading Pokédex...' />
                </View>
              ) : error ? (
                <EmptyState title='Error' description={error.message} />
              ) : sortedPokemon.length === 0 ? (
                <EmptyState
                  title='No Pokémon found'
                  description='Try a different name, type, or Pokédex number.'
                />
              ) : (
                <FlatList
                  data={sortedPokemon}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                  numColumns={2}
                  columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
                  renderItem={({ item }) => (
                    <View className='w-[48%]'>
                      <PokemonSelectorCard
                        pokemon={item}
                        isAlreadyInTeam={slots.some(
                          (slot) => slot?.id === item.id
                        )}
                        onSelect={() => handleAddToTeam(item)}
                      />
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}
