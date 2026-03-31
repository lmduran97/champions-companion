import { useQuery } from '@tanstack/react-query'

import { pokemonRepository } from '@/src/data/repositories/pokemonRepository'
import { pokemonKeys } from '../queries/pokemonKeys'

export function usePokemonList(search?: string) {
  return useQuery({
    queryKey: pokemonKeys.list(search),
    queryFn: async () => {
      if (search?.trim()) {
        return pokemonRepository.searchPokemon(search)
      }

      return pokemonRepository.getPokemonList()
    }
  })
}
