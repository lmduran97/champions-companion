import React from 'react'
import { TextInput, View } from 'react-native'

type SearchInputProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search'
}: SearchInputProps) {
  return (
    <View className='rounded-card border border-border bg-card px-4 py-3'>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#7E8794'
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='search'
        className='text-body text-text-primary'
      />
    </View>
  )
}
