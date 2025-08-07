import CustomButton from "@/components/buttons/CustomButton";
import CustomView from "@/components/views/CustomView";
import { useAuthStore } from "@/utils/authStore";
import { useState } from "react";
import { SafeAreaView, Text } from "react-native";

export default function ProfileScreen() {
  const { logout } = useAuthStore()
  const [pending, setPending] = useState(false)

  return (
    <CustomView adaptToTheme>
      <SafeAreaView>
        <Text>
          Profile page
        </Text>
        <CustomButton labelText="Logout" type="prominent" isPending={pending} handleClick={() => {
          setPending(true)
          logout()
        }} />
      </SafeAreaView>
    </CustomView>
  )
}