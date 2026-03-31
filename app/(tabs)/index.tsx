import { Screen } from '@/src/components/common/Screen'
import { Text, View } from 'react-native'

export default function HomeScreen() {
  return (
    <Screen>
      <Text className='text-title font-bold text-text-primary'>Home</Text>

      <Text className='mt-2 text-body text-text-secondary'>
        Base visual funcionando
      </Text>

      <View className='mt-4 rounded-card border border-border bg-card p-4'>
        <Text className='text-body-large text-text-primary'>
          Card de prueba
        </Text>
      </View>
    </Screen>
  )
}
