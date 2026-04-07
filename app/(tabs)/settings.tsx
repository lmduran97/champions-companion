import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Button, Text, View } from 'react-native'

export default function SettingsScreen() {
  const handleReset = async () => {
    await AsyncStorage.clear()
    Alert.alert('Done', 'Storage cleared')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>

      <Button title='Reset app data' onPress={handleReset} />
    </View>
  )
}
