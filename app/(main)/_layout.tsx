import { Stack } from "expo-router";
import { useEffect } from "react";

export default function MainScreen() {

  useEffect(() => {
    // (async () => {
    //   await requestLocationPermissionLoop();
    // })();
  }, [])

  return (
    <Stack screenOptions={{
      headerShown: true
    }}>
      <Stack.Screen name="index" />
    </Stack>
  )
}