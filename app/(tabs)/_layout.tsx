import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarIcon: () => null }}>
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='pokedex' options={{ title: 'Pokedex' }} />
      <Tabs.Screen name='builder' options={{ title: 'Builder' }} />
      <Tabs.Screen name='teams' options={{ title: 'Teams' }} />
      <Tabs.Screen name='settings' options={{ title: 'Settings' }} />
    </Tabs>
  )
}
