import { MOCK_POKEMON } from '@/src/data/mocks/pokemon.mock'
import type { Pokemon } from '@/src/domain/pokemon/types'

export interface PokemonRepository {
  getPokemonList(): Promise<Pokemon[]>
  getPokemonById(id: string): Promise<Pokemon | null>
  searchPokemon(query: string): Promise<Pokemon[]>
}

export class LocalPokemonRepository implements PokemonRepository {
  async getPokemonList(): Promise<Pokemon[]> {
    return MOCK_POKEMON
  }

  async getPokemonById(id: string): Promise<Pokemon | null> {
    return MOCK_POKEMON.find((pokemon) => pokemon.id === id) ?? null
  }

  async searchPokemon(query: string): Promise<Pokemon[]> {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return MOCK_POKEMON
    }

    return MOCK_POKEMON.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(normalizedQuery)
      const matchesDexNumber = pokemon.dexNumber
        .toString()
        .includes(normalizedQuery)
      const matchesType = pokemon.types.some((type) =>
        type.toLowerCase().includes(normalizedQuery)
      )

      return matchesName || matchesDexNumber || matchesType
    })
  }
}

export const pokemonRepository = new LocalPokemonRepository()
