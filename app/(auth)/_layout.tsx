import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.vibrantBackground
      },
    }}>
      <Stack.Screen name="index" options={{title: ""}} />
    </Stack>
  )
}