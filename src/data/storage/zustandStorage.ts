import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, StateStorage } from 'zustand/middleware'

const asyncStorage: StateStorage = {
  getItem: async (name) => {
    return await AsyncStorage.getItem(name)
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, value)
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name)
  }
}

export const zustandStorage = createJSONStorage(() => asyncStorage)
