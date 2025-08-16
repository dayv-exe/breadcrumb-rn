import { buttonTypes } from "@/constants/buttonTypes";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { ActivityIndicator, DimensionValue, StyleSheet, Text, TouchableOpacity } from "react-native";

type bProps = {
  labelText?: string
  type?: buttonTypes
  width?: DimensionValue
  adaptToTheme?: boolean
  disabled?: boolean
  allowMultipleClicks?: boolean
  isPending?: boolean
  squashed?: boolean
  slim?: boolean
  bold?: boolean
  handleClick?: () => void
  debounceTime?: number
}

export default function CustomButton({ labelText = "button", type = "faded", width = "auto", handleClick = () => { }, adaptToTheme = false, disabled = false, allowMultipleClicks = false, isPending = false, debounceTime = 500, slim=false, squashed=false, bold=true }: bProps) {
  const theme = useThemeColor
  const [clicked, setClicked] = useState(false)

  // debounce
  const resetClick = async () => {
    setTimeout(() => { setClicked(false) }, debounceTime)
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={() => {
      // debounce clicks and disable clicks is button is in loading state
      if (!clicked) {
        if (!allowMultipleClicks) { setClicked(true) }
        if (!isPending) {
          handleClick()
          resetClick()
        }
      }
    }} style={[
      styles.button,
      {
        backgroundColor: disabled ? Colors.dark.tabIconDefault :
          type === "prominent" ? Colors.light.vibrantButton :
            type === "faded" ? "rgba(255, 255, 255, 0.1)" :
              type === "dark-faded" ? "rgba(0, 0, 0, 0.1)" :
                type === "theme-faded" ? theme({}, "fadedBackground") :
                type === "less-prominent" ? theme({}, "vibrantBackground") :
                  "transparent",
        height: slim ? 43 : "auto",
        width: width,
        padding: squashed ? 6 : slim ? 10 : 15,
        paddingHorizontal: squashed ? 13 : slim ? 10 : 15,
        borderRadius: 15
      }
    ]}>
      {isPending && <ActivityIndicator color="#FFF" />}
      <Text style={[
        styles.text,
        {
          color: type === "vibrant-text" ? Colors.light.vibrantButton :
            adaptToTheme || type === "theme-faded" ? theme({}, "text") :
              type === "dark-faded" ? Colors.light.text : "#fff",
              fontSize: squashed ? 13 :  slim ? 14 : 15,
              fontWeight: bold ? 600 : "normal",
        }
      ]}>{labelText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    textAlign: "center"
  },
})