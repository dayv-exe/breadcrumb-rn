import { useAuthStore } from '@/utils/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  const {isLoggedIn} = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="blank" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  )
}