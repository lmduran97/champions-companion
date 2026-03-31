import { Text, View } from 'react-native'

type EmptyStateProps = {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className='items-center justify-center rounded-card border border-border bg-card px-5 py-8'>
      <Text className='text-subtitle font-semibold text-text-primary'>
        {title}
      </Text>

      {description ? (
        <Text className='mt-2 text-center text-body text-text-secondary'>
          {description}
        </Text>
      ) : null}
    </View>
  )
}
