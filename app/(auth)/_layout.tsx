import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.vibrantBackground,
      },
      headerTintColor: "#fff",
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="signup-name" options={{ title: "Name" }} />
      <Stack.Screen name="signup-birthdate" options={{ title: "Birthdate" }} />
      <Stack.Screen name="signup-login-details" options={{ title: "Login details" }} />
      <Stack.Screen name="signup-verify" options={{ title: "Verify" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  )
}