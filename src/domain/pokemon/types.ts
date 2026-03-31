export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'

export type StatBlock = {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export type Ability = {
  id: string
  name: string
  description?: string
  isHidden?: boolean
}

export type MoveCategory = 'physical' | 'special' | 'status'

export type Move = {
  id: string
  name: string
  type: PokemonType
  category: MoveCategory
  power?: number
  accuracy?: number
  pp?: number
  description?: string
}

export type PokemonForm = {
  id: string
  name: string
  types: PokemonType[]
  spriteUrl?: string
  artworkUrl?: string
  stats: StatBlock
  abilities: Ability[]
}

export type Pokemon = {
  id: string
  dexNumber: number
  slug: string
  name: string
  types: PokemonType[]
  spriteUrl?: string
  artworkUrl?: string
  stats: StatBlock
  abilities: Ability[]
  moves: Move[]
  forms?: PokemonForm[]
  generation?: number
  isEligible: boolean
  hasMega?: boolean
}
