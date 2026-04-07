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

export type NatureName =
  | 'adamant'
  | 'bashful'
  | 'bold'
  | 'brave'
  | 'calm'
  | 'careful'
  | 'docile'
  | 'gentle'
  | 'hardy'
  | 'hasty'
  | 'impish'
  | 'jolly'
  | 'lax'
  | 'lonely'
  | 'mild'
  | 'modest'
  | 'naive'
  | 'naughty'
  | 'quiet'
  | 'quirky'
  | 'rash'
  | 'relaxed'
  | 'sassy'
  | 'serious'
  | 'timid'

export type Nature = {
  name: NatureName
  increasedStat: keyof StatBlock | null
  decreasedStat: keyof StatBlock | null
}
export const NATURES: Nature[] = [
  {
    name: 'adamant',
    increasedStat: 'attack',
    decreasedStat: 'specialAttack'
  },
  {
    name: 'bashful',
    increasedStat: 'specialAttack',
    decreasedStat: 'specialAttack'
  },
  {
    name: 'bold',
    increasedStat: 'defense',
    decreasedStat: 'attack'
  },
  {
    name: 'brave',
    increasedStat: 'attack',
    decreasedStat: 'speed'
  },
  {
    name: 'calm',
    increasedStat: 'specialDefense',
    decreasedStat: 'attack'
  },
  {
    name: 'careful',
    increasedStat: 'specialDefense',
    decreasedStat: 'specialAttack'
  },
  {
    name: 'docile',
    increasedStat: 'defense',
    decreasedStat: 'defense'
  },
  {
    name: 'gentle',
    increasedStat: 'specialDefense',
    decreasedStat: 'defense'
  },
  {
    name: 'hardy',
    increasedStat: 'attack',
    decreasedStat: 'attack'
  },
  {
    name: 'hasty',
    increasedStat: 'speed',
    decreasedStat: 'defense'
  },
  {
    name: 'impish',
    increasedStat: 'defense',
    decreasedStat: 'specialAttack'
  },
  {
    name: 'jolly',
    increasedStat: 'speed',
    decreasedStat: 'specialAttack'
  },
  {
    name: 'lax',
    increasedStat: 'defense',
    decreasedStat: 'specialDefense'
  },
  {
    name: 'lonely',
    increasedStat: 'attack',
    decreasedStat: 'defense'
  },
  {
    name: 'mild',
    increasedStat: 'specialAttack',
    decreasedStat: 'defense'
  },
  {
    name: 'modest',
    increasedStat: 'specialAttack',
    decreasedStat: 'attack'
  },
  {
    name: 'naive',
    increasedStat: 'speed',
    decreasedStat: 'specialDefense'
  },
  {
    name: 'naughty',
    increasedStat: 'attack',
    decreasedStat: 'specialDefense'
  },
  {
    name: 'quiet',
    increasedStat: 'specialAttack',
    decreasedStat: 'speed'
  },
  {
    name: 'quirky',
    increasedStat: 'specialDefense',
    decreasedStat: 'specialDefense'
  },
  {
    name: 'rash',
    increasedStat: 'specialAttack',
    decreasedStat: 'specialDefense'
  },
  {
    name: 'relaxed',
    increasedStat: 'defense',
    decreasedStat: 'speed'
  },
  {
    name: 'sassy',
    increasedStat: 'specialDefense',
    decreasedStat: 'speed'
  },
  {
    name: 'serious',
    increasedStat: 'speed',
    decreasedStat: 'speed'
  },
  {
    name: 'timid',
    increasedStat: 'speed',
    decreasedStat: 'attack'
  }
]

export type HeldItem = {
  id: string
  name: string
  description?: string
}

export const BERRIES: HeldItem[] = [
  {
    id: 'cheri-berry',
    name: 'Cheri Berry',
    description: 'Consumed automatically to cure paralysis.'
  },
  {
    id: 'chesto-berry',
    name: 'Chesto Berry',
    description: 'Consumed automatically to wake the holder from sleep.'
  },
  {
    id: 'pecha-berry',
    name: 'Pecha Berry',
    description: 'Consumed automatically to cure poison.'
  },
  {
    id: 'rawst-berry',
    name: 'Rawst Berry',
    description: 'Consumed automatically to cure burn.'
  },
  {
    id: 'aspear-berry',
    name: 'Aspear Berry',
    description: 'Consumed automatically to thaw the holder if it is frozen.'
  },
  {
    id: 'leppa-berry',
    name: 'Leppa Berry',
    description: 'Consumed automatically to restore 10 PP to one move.'
  }
]

export const BATTLE_HELD_ITEMS: HeldItem[] = [
  {
    id: 'choice-band',
    name: 'Choice Band',
    description:
      'Boosts the holder’s Attack, but only allows it to use the first move it selects until it switches out.'
  },
  {
    id: 'choice-specs',
    name: 'Choice Specs',
    description:
      'Boosts the holder’s Special Attack, but only allows it to use the first move it selects until it switches out.'
  },
  {
    id: 'choice-scarf',
    name: 'Choice Scarf',
    description:
      'Boosts the holder’s Speed, but only allows it to use the first move it selects until it switches out.'
  },
  {
    id: 'focus-sash',
    name: 'Focus Sash',
    description:
      'If the holder has full HP and would be knocked out by one hit, it survives with 1 HP instead.'
  },
  {
    id: 'leftovers',
    name: 'Leftovers',
    description: 'Gradually restores the holder’s HP during battle.'
  },
  {
    id: 'life-orb',
    name: 'Life Orb',
    description:
      'Boosts the power of the holder’s damaging moves, but the holder loses some HP after attacking.'
  },
  {
    id: 'assault-vest',
    name: 'Assault Vest',
    description:
      'Boosts the holder’s Special Defense, but prevents it from using status moves.'
  },
  {
    id: 'rocky-helmet',
    name: 'Rocky Helmet',
    description:
      'Damages an attacker that makes direct contact with the holder.'
  },
  {
    id: 'expert-belt',
    name: 'Expert Belt',
    description: 'Boosts the power of the holder’s super-effective moves.'
  },
  {
    id: 'heavy-duty-boots',
    name: 'Heavy-Duty Boots',
    description: 'Protects the holder from the effects of entry hazards.'
  },
  {
    id: 'air-balloon',
    name: 'Air Balloon',
    description:
      'Makes the holder immune to Ground-type attacks until it is hit by an attack.'
  },
  {
    id: 'eviolite',
    name: 'Eviolite',
    description:
      'Boosts Defense and Special Defense if the holder can still evolve.'
  },
  {
    id: 'weakness-policy',
    name: 'Weakness Policy',
    description:
      'Sharply boosts Attack and Special Attack when the holder is hit by a super-effective move.'
  },
  {
    id: 'sitrus-berry',
    name: 'Sitrus Berry',
    description:
      'Consumed automatically when the holder’s HP gets low to restore some HP.'
  },
  {
    id: 'lum-berry',
    name: 'Lum Berry',
    description:
      'Consumed automatically to cure a major status condition or confusion.'
  },
  {
    id: 'mental-herb',
    name: 'Mental Herb',
    description:
      'Consumed automatically to cure effects that prevent the holder from selecting moves freely, such as Taunt, Encore, Torment, Disable, or Cursed Body.'
  },
  {
    id: 'power-herb',
    name: 'Power Herb',
    description:
      'Consumed automatically so the holder can use a two-turn move immediately.'
  },
  {
    id: 'clear-amulet',
    name: 'Clear Amulet',
    description:
      'Prevents the holder’s stats from being lowered by moves or abilities used by other Pokémon.'
  },
  {
    id: 'covert-cloak',
    name: 'Covert Cloak',
    description:
      'Protects the holder from the additional effects of opposing moves.'
  },
  {
    id: 'flame-orb',
    name: 'Flame Orb',
    description:
      'Badly affects the holder by burning it at the end of the turn.'
  },
  {
    id: 'toxic-orb',
    name: 'Toxic Orb',
    description: 'Badly poisons the holder at the end of the turn.'
  },
  {
    id: 'light-clay',
    name: 'Light Clay',
    description:
      'Extends the duration of barrier moves such as Reflect and Light Screen used by the holder.'
  },
  {
    id: 'terrain-extender',
    name: 'Terrain Extender',
    description: 'Extends the duration of a terrain created by the holder.'
  },
  {
    id: 'booster-energy',
    name: 'Booster Energy',
    description:
      'Triggers Protosynthesis or Quark Drive once for a holder with that ability.'
  },
  {
    id: 'loaded-dice',
    name: 'Loaded Dice',
    description: 'Makes multi-hit moves more likely to strike more times.'
  }
]

export const MEGA_STONES: HeldItem[] = [
  {
    id: 'venusaurite',
    name: 'Venusaurite',
    description: 'Allows Venusaur to Mega Evolve during battle.'
  },
  {
    id: 'charizardite-x',
    name: 'Charizardite X',
    description:
      'Allows Charizard to Mega Evolve into Mega Charizard X during battle.'
  },
  {
    id: 'blastoisinite',
    name: 'Blastoisinite',
    description: 'Allows Blastoise to Mega Evolve during battle.'
  },
  {
    id: 'gengarite',
    name: 'Gengarite',
    description: 'Allows Gengar to Mega Evolve during battle.'
  },
  {
    id: 'kangaskhanite',
    name: 'Kangaskhanite',
    description: 'Allows Kangaskhan to Mega Evolve during battle.'
  },
  {
    id: 'dragoninite',
    name: 'Dragoninite',
    description: 'Allows Dragonite to Mega Evolve during battle.'
  },
  {
    id: 'meganiumite',
    name: 'Meganiumite',
    description: 'Allows Meganium to Mega Evolve during battle.'
  },
  {
    id: 'feraligite',
    name: 'Feraligite',
    description: 'Allows Feraligatr to Mega Evolve during battle.'
  },
  {
    id: 'ampharosite',
    name: 'Ampharosite',
    description: 'Allows Ampharos to Mega Evolve during battle.'
  },
  {
    id: 'scizorite',
    name: 'Scizorite',
    description: 'Allows Scizor to Mega Evolve during battle.'
  },
  {
    id: 'tyranitarite',
    name: 'Tyranitarite',
    description: 'Allows Tyranitar to Mega Evolve during battle.'
  },
  {
    id: 'gardevoirite',
    name: 'Gardevoirite',
    description: 'Allows Gardevoir to Mega Evolve during battle.'
  },
  {
    id: 'garchompite',
    name: 'Garchompite',
    description: 'Allows Garchomp to Mega Evolve during battle.'
  },
  {
    id: 'lucarionite',
    name: 'Lucarionite',
    description: 'Allows Lucario to Mega Evolve during battle.'
  },
  {
    id: 'emboarite',
    name: 'Emboarite',
    description: 'Allows Emboar to Mega Evolve during battle.'
  },
  {
    id: 'chesnaughtite',
    name: 'Chesnaughtite',
    description: 'Allows Chesnaught to Mega Evolve during battle.'
  },
  {
    id: 'delphoxite',
    name: 'Delphoxite',
    description: 'Allows Delphox to Mega Evolve during battle.'
  },
  {
    id: 'greninjite',
    name: 'Greninjite',
    description: 'Allows Greninja to Mega Evolve during battle.'
  },
  {
    id: 'floettite',
    name: 'Floettite',
    description: 'Allows Floette to Mega Evolve during battle.'
  }
]

export const HELD_ITEMS: HeldItem[] = [
  {
    id: 'none',
    name: 'No Held Item'
  },
  ...BERRIES,
  ...BATTLE_HELD_ITEMS,
  ...MEGA_STONES
]

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

export type TeamPokemonBase = Pick<
  Pokemon,
  'id' | 'name' | 'types' | 'spriteUrl' | 'artworkUrl' | 'abilities' | 'moves'
>

export type TeamPokemon = TeamPokemonBase & {
  battleConfig: {
    nature: Nature | null
    ability: Ability | null
    heldItem: HeldItem | null
    moves: [Move | null, Move | null, Move | null, Move | null]
    statPoints: StatBlock
  }
}
