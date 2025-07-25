import CustomButton from "@/components/buttons/CustomButton";
import { useAuthStore } from "@/utils/authStore";
import { SafeAreaView, Text, View } from "react-native";

export default function MapScreen() {
  const { logout } = useAuthStore()

  return (
    <SafeAreaView>
      <View style={{
        flex: 1
      }}>
        <Text>Camera</Text>
        <CustomButton labelText="Logout" handleClick={logout} type="prominent" />
      </View>
    </SafeAreaView>
  )
}