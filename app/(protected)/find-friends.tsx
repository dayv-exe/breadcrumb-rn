import CustomLabel from "@/components/CustomLabel";
import CustomView from "@/components/views/CustomView";
import { SafeAreaView } from "react-native";

export default function FindFriendsScreen() {
  return (
    <CustomView adaptToTheme>
      <SafeAreaView>
        <CustomLabel labelText="Find Friends" bold />

      </SafeAreaView>
    </CustomView>
  )
}