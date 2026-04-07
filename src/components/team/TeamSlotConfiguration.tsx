import { Alert, Text, TouchableOpacity, View } from 'react-native'

import {
  HELD_ITEMS,
  Move,
  NATURES,
  StatBlock,
  TeamPokemon
} from '@/src/domain/pokemon/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useMemo, useState } from 'react'
import { Dropdown, DropdownOption, TypeBadge } from '../common'

type TeamSlotConfigurationProps = {
  pokemon?: TeamPokemon | null
  onSavePokemon: (pokemon: TeamPokemon) => void
}

export function TeamSlotConfiguration({
  pokemon,
  onSavePokemon
}: TeamSlotConfigurationProps) {
  const EMPTY_STAT_BLOCK: StatBlock = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  }

  const [natureId, setNatureId] = useState<string | null>(
    pokemon?.battleConfig?.nature?.name || null
  )
  const [statPoints, setStatPoints] = useState<StatBlock>(
    pokemon?.battleConfig?.statPoints || EMPTY_STAT_BLOCK
  )
  const [heldItemId, setHeldItemId] = useState<string | null>(
    pokemon?.battleConfig?.heldItem?.id || null
  )
  const [abilityId, setAbilityId] = useState<string | null>(
    pokemon?.battleConfig?.ability?.id || null
  )
  const [moveSet, setMoveSet] = useState<
    [string | null, string | null, string | null, string | null]
  >(() => [
    pokemon?.battleConfig?.moves?.[0]?.id ?? null,
    pokemon?.battleConfig?.moves?.[1]?.id ?? null,
    pokemon?.battleConfig?.moves?.[2]?.id ?? null,
    pokemon?.battleConfig?.moves?.[3]?.id ?? null
  ])

  const statRows: { key: keyof StatBlock; label: string }[] = [
    { key: 'hp', label: 'HP' },
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'specialAttack', label: 'Sp. Atk' },
    { key: 'specialDefense', label: 'Sp. Def' },
    { key: 'speed', label: 'Speed' }
  ]

  const capitalizeStat = (stat: string | null) =>
    stat ? stat.charAt(0).toUpperCase() + stat.slice(1) : ''

  const natureOptions: DropdownOption<string>[] = NATURES.map((nature) => ({
    label: nature.name,
    value: nature.name,
    description:
      nature.increasedStat === nature.decreasedStat
        ? 'Neutral'
        : `⬆️ ${capitalizeStat(nature.increasedStat)}    ⬇️ ${capitalizeStat(
            nature.decreasedStat
          )}`
  }))

  const heldItemOptions: DropdownOption<string>[] = HELD_ITEMS.map(
    (heldItem) => ({
      label: heldItem.name,
      value: heldItem.id,
      description: heldItem.description
    })
  )
  const sortedHeldItemOptions = [...heldItemOptions].sort((a, b) => {
    if (a.value === 'none') return -1
    if (b.value === 'none') return 1
    return a.label.localeCompare(b.label)
  })

  const abilityOptions: DropdownOption<string>[] =
    pokemon?.abilities.map((ability) => ({
      label: `${ability.name} ${ability.isHidden ? '(Hidden)' : ''}`,
      value: ability.id,
      description: ability.description
    })) ?? []

  const moveOptions: DropdownOption<string>[] =
    pokemon?.moves.map((move) => ({
      label: move.name,
      value: move.id,
      description: move.description,
      disabled: moveSet.includes(move.id)
    })) ?? []

  const sumStatPoints = useMemo(() => {
    return (
      statPoints.hp +
      statPoints.attack +
      statPoints.defense +
      statPoints.specialAttack +
      statPoints.specialDefense +
      statPoints.speed
    )
  }, [statPoints])

  if (!pokemon) {
    return (
      <View className='rounded-card border border-border bg-card p-4'>
        <Text className='text-body font-bold text-text-primary mb-2'>
          Slot Configuration
        </Text>
        <View className='items-center'>
          <MaterialCommunityIcons
            name='pokeball'
            size={24}
            color='white'
            style={{ opacity: 0.5, marginBottom: 4 }}
          />
          <Text className='text-small text-text-secondary text-center'>
            Select a Pokémon from the team slots above to configure its details,
            including ability, held item, and moves.
          </Text>
        </View>
      </View>
    )
  }

  const handleOnPressMinusStat = (stat: {
    key: keyof StatBlock
    label: string
  }) => {
    if (!pokemon.battleConfig) {
      return
    }

    const newValue = statPoints[stat.key] - 1 || 0
    if (newValue < 0) {
      return
    }

    setStatPoints({ ...statPoints, [stat.key]: newValue })
  }

  const handleOnPressPlusStat = (stat: {
    key: keyof StatBlock
    label: string
  }) => {
    if (!pokemon.battleConfig) {
      return
    }
    if (statPoints[stat.key] >= 32) {
      Alert.alert(
        'Limit reached',
        'You have reached the maximum points per stat (32).'
      )
      return
    }
    if (sumStatPoints >= 66) {
      Alert.alert(
        'Limit reached',
        'You have reached the maximum stat points (66).'
      )
      return
    }
    const newValue = statPoints[stat.key] + 1 || 1

    setStatPoints({ ...statPoints, [stat.key]: newValue })
  }

  const onClear = () => {
    setNatureId(null)
    setStatPoints(EMPTY_STAT_BLOCK)
    setHeldItemId(null)
    setAbilityId(null)
    setMoveSet([null, null, null, null])
  }

  function getMoveById(
    availableMoves: Move[],
    moveId: string | null
  ): Move | null {
    if (!moveId) return null
    return availableMoves.find((move) => move.id === moveId) ?? null
  }

  const onSave = () => {
    const newPokemon = { ...pokemon }
    const nature = NATURES.find((nature) => nature.name === natureId)
    const ability = pokemon.abilities.find(
      (ability) => ability.id === abilityId
    )
    const heldItem = HELD_ITEMS.find((item) => item.id === heldItemId)
    const moves: [Move | null, Move | null, Move | null, Move | null] = [
      getMoveById(pokemon.moves, moveSet[0]),
      getMoveById(pokemon.moves, moveSet[1]),
      getMoveById(pokemon.moves, moveSet[2]),
      getMoveById(pokemon.moves, moveSet[3])
    ]

    newPokemon.battleConfig = {
      nature: nature ?? null,
      ability: ability ?? null,
      heldItem: heldItem ?? null,
      moves: moves,
      statPoints
    }

    onSavePokemon(newPokemon)
  }

  return (
    <View className='rounded-card border border-border bg-card p-4'>
      <View className='items-center flex-row gap-4'>
        <Text className='text-subtitle font-bold text-text-primary'>
          {pokemon.name}
        </Text>
        <View className='flex-row flex-wrap justify-center gap-2'>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>
      </View>

      <View className='mt-4'>
        <Dropdown
          label='Nature'
          value={natureId}
          options={natureOptions}
          placeholder='Select a nature'
          onChange={setNatureId}
          searchable
        />
      </View>

      <View className='mt-4'>
        <Dropdown
          label='Ability'
          value={abilityId}
          options={abilityOptions}
          placeholder='Select an ability'
          onChange={setAbilityId}
        />
      </View>

      <View className='mt-4'>
        <Dropdown
          label='Held item'
          value={heldItemId}
          options={sortedHeldItemOptions}
          placeholder='Select a held item'
          onChange={setHeldItemId}
          searchable
        />
      </View>

      <View className='mt-4'>
        <Text className='text-body font-medium text-text-secondary mb-2'>
          Moves
        </Text>
        <Dropdown
          label=''
          value={moveSet[0]}
          options={moveOptions}
          placeholder='Select a move'
          onChange={(value) =>
            setMoveSet([value, moveSet[1], moveSet[2], moveSet[3]])
          }
        />
        <View className='h-2' />
        <Dropdown
          label=''
          value={moveSet[1]}
          options={moveOptions}
          placeholder='Select a move'
          onChange={(value) =>
            setMoveSet([moveSet[0], value, moveSet[2], moveSet[3]])
          }
        />
        <View className='h-2' />
        <Dropdown
          label=''
          value={moveSet[2]}
          options={moveOptions}
          placeholder='Select a move'
          onChange={(value) =>
            setMoveSet([moveSet[0], moveSet[1], value, moveSet[3]])
          }
        />
        <View className='h-2' />
        <Dropdown
          label=''
          value={moveSet[3]}
          options={moveOptions}
          placeholder='Select a move'
          onChange={(value) =>
            setMoveSet([moveSet[0], moveSet[1], moveSet[2], value])
          }
        />
      </View>

      <View className='mt-4'>
        <View className='flex-row items-center gap-6'>
          <Text className='text-caption text-text-secondary'>Stat points</Text>
          <Text className='text-caption text-text-secondary'>
            {sumStatPoints}/66
          </Text>
        </View>
        <View className='mt-4 gap-1'>
          {statRows.map((stat) => {
            const value = statPoints[stat.key] ?? 0
            const widthPercentage = Math.min((value / 32) * 100, 100)

            return (
              <View key={stat.key} className='flex-row items-center gap-4 mb-6'>
                <FontAwesome
                  name='minus-circle'
                  size={24}
                  color='white'
                  onPress={() => handleOnPressMinusStat(stat)}
                  onLongPress={() =>
                    setStatPoints({ ...statPoints, [stat.key]: 0 })
                  }
                />
                <View className='flex-1'>
                  <View className='mb-1 flex-row items-center justify-between'>
                    <Text className='text-body text-text-secondary'>
                      {stat.label}
                    </Text>
                    <Text className='text-body font-semibold text-text-primary'>
                      {value}
                    </Text>
                  </View>

                  <View className='h-2 overflow-hidden rounded-full bg-primary-soft'>
                    <View
                      className='h-2 rounded-full bg-primary'
                      style={{ width: `${widthPercentage}%` }}
                    />
                  </View>
                </View>
                <FontAwesome
                  name='plus-circle'
                  size={24}
                  color='white'
                  onPress={() => handleOnPressPlusStat(stat)}
                />
              </View>
            )
          })}
        </View>
      </View>

      <View className='mt-6 flex-row items-center gap-6 w-[60%] self-center'>
        <TouchableOpacity
          onPress={onClear}
          activeOpacity={0.85}
          className='flex-1 rounded-card bg-surface'
        >
          <Text className='text-center text-body font-semibold text-text-primary'>
            Clear
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.85}
          className='flex-1 rounded-card bg-primary py-2'
        >
          <Text className='text-center text-body font-semibold text-white'>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
