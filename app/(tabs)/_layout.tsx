import { Tabs } from 'expo-router'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5b8cff',
        tabBarInactiveTintColor: '#a9b1bc',
        tabBarStyle: {
          backgroundColor: '#0f1115',
          borderTopWidth: 1,
          borderTopColor: '#2a3140',
          height: 60,
          paddingTop: 2
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='pokedex'
        options={{
          title: 'Pokedex',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='pokeball' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='builder'
        options={{
          title: 'Builder',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='construction' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='teams'
        options={{
          title: 'Teams',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='group' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='settings' size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
