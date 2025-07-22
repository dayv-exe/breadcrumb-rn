import { deleteItemAsync, getItem, setItem } from "expo-secure-store"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type UserState = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create(
  persist<UserState>((set) => ({
    isLoggedIn: false,
    login: () => {
      set(state => {
        return ({
          ...state,
          isLoggedIn: true
        })
      })
    },
    logout: () => {
      set(state => {
        return ({
          ...state,
          isLoggedIn: false
        })
      })
    }
  }), {
    name: "auth-store",
    storage: createJSONStorage(() => ({
      setItem,
      getItem,
      removeItem: deleteItemAsync
    }))
  })
)

