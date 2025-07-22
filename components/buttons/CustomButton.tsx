import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DimensionValue, StyleSheet, Text, TouchableOpacity } from "react-native";

type buttonTypes = "prominent" | "faded" | "text" | "vibrant-text"

type bProps = {
  labelText?: string
  type?: buttonTypes
  width?: DimensionValue
  adaptToTheme?: boolean
  disabled?: boolean
  handleClick?: () => void
}

export default function CustomButton({ labelText = "button", type = "faded", width = "auto", handleClick = () => { }, adaptToTheme = false, disabled = false }: bProps) {
  const theme = useThemeColor

  return (
    <TouchableOpacity disabled={disabled} onPress={handleClick} style={[
      styles.button,
      {
        backgroundColor: disabled ? Colors.dark.tabIconDefault :
          type === "prominent" ? Colors.light.vibrantButton :
            type === "faded" ? "rgba(255, 255, 255, 0.1)" :
              "transparent"
      }
    ]}>
      <Text style={[
        styles.text,
        {
          color: adaptToTheme ? theme({}, "text") :
            "#fff"
        }
      ]}>{labelText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    padding: 15,
    fontWeight: 600,
    color: Colors.light.vibrantButton,
  },
})