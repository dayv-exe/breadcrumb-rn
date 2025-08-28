import CustomCamera from "@/components/posts/customCamera";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";

export default function AddScreen() {
  const isFocused = useIsFocused()

  return (
    <View style={{flex: 1}}>
      {isFocused && <CustomCamera />}
    </View>
  )
  
}