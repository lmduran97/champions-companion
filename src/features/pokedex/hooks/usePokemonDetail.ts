import { useQuery } from '@tanstack/react-query'

import { pokemonRepository } from '@/src/data/repositories/pokemonRepository'
import { pokemonKeys } from '../queries/pokemonKeys'

export function usePokemonDetail(id?: string) {
  return useQuery({
    queryKey: id
      ? pokemonKeys.detail(id)
      : [...pokemonKeys.details(), 'missing-id'],
    queryFn: async () => {
      if (!id) {
        throw new Error('Missing Pokémon ID')
      }
      const pokemon = await pokemonRepository.getPokemonById(id)

      if (!pokemon) {
        throw new Error('Pokémon not found')
      }

      return pokemon
    },
    enabled: Boolean(id)
  })
}
