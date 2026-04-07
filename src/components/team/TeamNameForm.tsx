import { Text, TextInput, TouchableOpacity, View } from 'react-native'

type TeamNameFormProps = {
  title: string
  description: string
  value: string
  onChangeText: (text: string) => void
  confirmLabel: string
  onCancel: () => void
  onConfirm: () => void
}

export function TeamNameForm({
  title,
  description,
  value,
  onChangeText,
  confirmLabel,
  onCancel,
  onConfirm
}: TeamNameFormProps) {
  return (
    <>
      <Text className='text-title font-bold text-text-primary'>{title}</Text>

      <Text className='mt-2 text-body text-text-secondary'>{description}</Text>

      <View className='mt-6 rounded-card border border-border bg-card p-4'>
        <Text className='text-body font-medium text-text-primary'>
          Team name
        </Text>

        <View className='mt-3 rounded-card border border-border bg-surface px-4 py-3'>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder='Enter a team name'
            placeholderTextColor='#7E8794'
            autoCapitalize='sentences'
            autoCorrect={false}
            className='text-body text-text-primary'
          />
        </View>
      </View>

      <View className='mt-6 flex-row gap-3'>
        <TouchableOpacity
          onPress={onCancel}
          activeOpacity={0.85}
          className='flex-1 rounded-card bg-surface px-4 py-4'
        >
          <Text className='text-center text-body font-semibold text-text-primary'>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConfirm}
          activeOpacity={0.85}
          className='flex-1 rounded-card bg-primary px-4 py-4'
        >
          <Text className='text-center text-body font-semibold text-white'>
            {confirmLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
