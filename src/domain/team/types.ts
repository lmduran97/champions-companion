import { TeamPokemon } from '../pokemon/types'

export type SavedTeam = {
  id: string
  name: string
  pokemons: (TeamPokemon | null)[]
  createdAt: string
  updatedAt: string
}
