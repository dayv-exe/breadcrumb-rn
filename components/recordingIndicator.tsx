import { usePulseAnimation } from "@/hooks/animations/usePulseAnimation";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomLabel from "./CustomLabel";

export default function RecordingIndicator() {
  const insets = useSafeAreaInsets()
  const pulseStyle = usePulseAnimation(true, {duration: 400})

  return (
    <View style={{ position: "absolute", top: insets.top + 10, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={[{
        width: 13,
        height:13,
        borderRadius: "100%",
        backgroundColor: "red",
      }, pulseStyle]} />
      <CustomLabel labelText={`rec`} width={"auto"} fontSize={16} />
    </View>
  )
}