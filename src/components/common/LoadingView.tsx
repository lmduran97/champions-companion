import { ActivityIndicator, Text, View } from 'react-native'

type LoadingViewProps = {
  message?: string
}

export function LoadingView({ message = 'Loading...' }: LoadingViewProps) {
  return (
    <View className='flex-1 items-center justify-center py-10'>
      <ActivityIndicator size='large' color='#5B8CFF' />

      <Text className='mt-3 text-body text-text-secondary'>{message}</Text>
    </View>
  )
}
