import type { Pokemon } from '@/src/domain/pokemon/types'

export const MOCK_POKEMON: Pokemon[] = [
  {
    id: 'pikachu',
    dexNumber: 25,
    slug: 'pikachu',
    name: 'Pikachu',
    types: ['electric'],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    artworkUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90
    },
    abilities: [
      {
        id: 'static',
        name: 'Static',
        description: 'May paralyze opponents on contact.'
      },
      {
        id: 'lightning-rod',
        name: 'Lightning Rod',
        description: 'Draws in Electric-type moves.',
        isHidden: true
      }
    ],
    moves: [
      {
        id: 'thunderbolt',
        name: 'Thunderbolt',
        type: 'electric',
        category: 'special',
        power: 90,
        accuracy: 100,
        pp: 15
      },
      {
        id: 'volt-tackle',
        name: 'Volt Tackle',
        type: 'electric',
        category: 'physical',
        power: 120,
        accuracy: 100,
        pp: 15
      },
      {
        id: 'quick-attack',
        name: 'Quick Attack',
        type: 'normal',
        category: 'physical',
        power: 40,
        accuracy: 100,
        pp: 30
      }
    ],
    generation: 1,
    isEligible: true
  },
  {
    id: 'charizard',
    dexNumber: 6,
    slug: 'charizard',
    name: 'Charizard',
    types: ['fire', 'flying'],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    artworkUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      specialAttack: 109,
      specialDefense: 85,
      speed: 100
    },
    abilities: [
      {
        id: 'blaze',
        name: 'Blaze',
        description: 'Powers up Fire-type moves in a pinch.'
      },
      {
        id: 'solar-power',
        name: 'Solar Power',
        description: 'Boosts Sp. Atk in sunshine at the cost of HP.',
        isHidden: true
      }
    ],
    moves: [
      {
        id: 'flamethrower',
        name: 'Flamethrower',
        type: 'fire',
        category: 'special',
        power: 90,
        accuracy: 100,
        pp: 15
      },
      {
        id: 'air-slash',
        name: 'Air Slash',
        type: 'flying',
        category: 'special',
        power: 75,
        accuracy: 95,
        pp: 15
      },
      {
        id: 'dragon-pulse',
        name: 'Dragon Pulse',
        type: 'dragon',
        category: 'special',
        power: 85,
        accuracy: 100,
        pp: 10
      }
    ],
    generation: 1,
    isEligible: true,
    hasMega: true
  },
  {
    id: 'gengar',
    dexNumber: 94,
    slug: 'gengar',
    name: 'Gengar',
    types: ['ghost', 'poison'],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    artworkUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110
    },
    abilities: [
      {
        id: 'cursed-body',
        name: 'Cursed Body',
        description: 'May disable a move used on the Pokémon.'
      }
    ],
    moves: [
      {
        id: 'shadow-ball',
        name: 'Shadow Ball',
        type: 'ghost',
        category: 'special',
        power: 80,
        accuracy: 100,
        pp: 15
      },
      {
        id: 'sludge-bomb',
        name: 'Sludge Bomb',
        type: 'poison',
        category: 'special',
        power: 90,
        accuracy: 100,
        pp: 10
      },
      {
        id: 'thunderbolt',
        name: 'Thunderbolt',
        type: 'electric',
        category: 'special',
        power: 90,
        accuracy: 100,
        pp: 15
      }
    ],
    generation: 1,
    isEligible: true,
    hasMega: true
  },
  {
    id: 'dragonite',
    dexNumber: 149,
    slug: 'dragonite',
    name: 'Dragonite',
    types: ['dragon', 'flying'],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
    artworkUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    stats: {
      hp: 91,
      attack: 134,
      defense: 95,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80
    },
    abilities: [
      {
        id: 'inner-focus',
        name: 'Inner Focus',
        description: 'Protects the Pokémon from flinching.'
      },
      {
        id: 'multiscale',
        name: 'Multiscale',
        description: 'Reduces damage when HP is full.',
        isHidden: true
      }
    ],
    moves: [
      {
        id: 'outrage',
        name: 'Outrage',
        type: 'dragon',
        category: 'physical',
        power: 120,
        accuracy: 100,
        pp: 10
      },
      {
        id: 'extreme-speed',
        name: 'Extreme Speed',
        type: 'normal',
        category: 'physical',
        power: 80,
        accuracy: 100,
        pp: 5
      },
      {
        id: 'fire-punch',
        name: 'Fire Punch',
        type: 'fire',
        category: 'physical',
        power: 75,
        accuracy: 100,
        pp: 15
      }
    ],
    generation: 1,
    isEligible: true,
    hasMega: true
  },
  {
    id: 'lucario',
    dexNumber: 448,
    slug: 'lucario',
    name: 'Lucario',
    types: ['fighting', 'steel'],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png',
    artworkUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    stats: {
      hp: 70,
      attack: 110,
      defense: 70,
      specialAttack: 115,
      specialDefense: 70,
      speed: 90
    },
    abilities: [
      {
        id: 'steadfast',
        name: 'Steadfast',
        description: 'Boosts Speed each time the Pokémon flinches.'
      },
      {
        id: 'inner-focus',
        name: 'Inner Focus',
        description: 'Protects the Pokémon from flinching.'
      },
      {
        id: 'justified',
        name: 'Justified',
        description: 'Raises Attack when hit by a Dark-type move.',
        isHidden: true
      }
    ],
    moves: [
      {
        id: 'aura-sphere',
        name: 'Aura Sphere',
        type: 'fighting',
        category: 'special',
        power: 80,
        accuracy: 100,
        pp: 20
      },
      {
        id: 'flash-cannon',
        name: 'Flash Cannon',
        type: 'steel',
        category: 'special',
        power: 80,
        accuracy: 100,
        pp: 10
      },
      {
        id: 'extreme-speed',
        name: 'Extreme Speed',
        type: 'normal',
        category: 'physical',
        power: 80,
        accuracy: 100,
        pp: 5
      }
    ],
    generation: 4,
    isEligible: true,
    hasMega: true
  },
  {
    id: 'garchomp',
    dexNumber: 445,
    slug: 'garchomp',
    name: 'Garchomp',
    types: ['dragon', 'ground'],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png',
    artworkUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png',
    stats: {
      hp: 108,
      attack: 130,
      defense: 95,
      specialAttack: 80,
      specialDefense: 85,
      speed: 102
    },
    abilities: [
      {
        id: 'sand-veil',
        name: 'Sand Veil',
        description: 'Boosts evasion in a sandstorm.'
      },
      {
        id: 'rough-skin',
        name: 'Rough Skin',
        description: 'Inflicts damage on contact.',
        isHidden: true
      }
    ],
    moves: [
      {
        id: 'earthquake',
        name: 'Earthquake',
        type: 'ground',
        category: 'physical',
        power: 100,
        accuracy: 100,
        pp: 10
      },
      {
        id: 'dragon-claw',
        name: 'Dragon Claw',
        type: 'dragon',
        category: 'physical',
        power: 80,
        accuracy: 100,
        pp: 15
      },
      {
        id: 'stone-edge',
        name: 'Stone Edge',
        type: 'rock',
        category: 'physical',
        power: 100,
        accuracy: 80,
        pp: 5
      }
    ],
    generation: 4,
    isEligible: true,
    hasMega: true
  }
]
