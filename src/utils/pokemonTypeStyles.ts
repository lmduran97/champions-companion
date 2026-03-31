import { PokemonType } from '@/src/domain/pokemon/types'

export const pokemonTypeStyles: Record<
  PokemonType,
  { bg: string; text: string }
> = {
  normal: { bg: '#A8A77A', text: '#111111' },
  fire: { bg: '#EE8130', text: '#FFFFFF' },
  water: { bg: '#6390F0', text: '#FFFFFF' },
  electric: { bg: '#F7D02C', text: '#111111' },
  grass: { bg: '#7AC74C', text: '#111111' },
  ice: { bg: '#96D9D6', text: '#111111' },
  fighting: { bg: '#C22E28', text: '#FFFFFF' },
  poison: { bg: '#A33EA1', text: '#FFFFFF' },
  ground: { bg: '#E2BF65', text: '#111111' },
  flying: { bg: '#A98FF3', text: '#111111' },
  psychic: { bg: '#F95587', text: '#FFFFFF' },
  bug: { bg: '#A6B91A', text: '#111111' },
  rock: { bg: '#B6A136', text: '#111111' },
  ghost: { bg: '#735797', text: '#FFFFFF' },
  dragon: { bg: '#6F35FC', text: '#FFFFFF' },
  dark: { bg: '#705746', text: '#FFFFFF' },
  steel: { bg: '#B7B7CE', text: '#111111' },
  fairy: { bg: '#D685AD', text: '#111111' }
}
