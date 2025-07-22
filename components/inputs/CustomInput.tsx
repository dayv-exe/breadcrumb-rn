import { Colors } from "@/constants/Colors";
import { inputMode } from "@/constants/customInputModeTypes";
import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";

type autoCapitalizeType = "none" | "sentences" | "words" | "characters"

type iProps = {
  labelText?: string
  value: string
  setValue?: (e: string) => void
  infoText?: string
  showInfoTextOnFocus?: boolean
  showInfoTextAlways?: boolean
  isPassword?: boolean
  disableAutoCorrect?: boolean
  autoCapitalize?: autoCapitalizeType
  inputMode?: inputMode
  keyboardType?: KeyboardTypeOptions
}

export default function CustomInput({ value, setValue, labelText = "Label:", infoText = "", showInfoTextOnFocus = false, isPassword = false, disableAutoCorrect = false, autoCapitalize, inputMode = "normal", showInfoTextAlways = false, keyboardType = "default" }: iProps) {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  return (
    <View style={[
      styles.container
    ]}>
      <Text style={styles.labelText}>
        {labelText}
      </Text>
      <TextInput keyboardType={keyboardType} autoCorrect={!disableAutoCorrect} autoCapitalize={autoCapitalize} readOnly={setValue == null} secureTextEntry={isPassword} onFocus={handleFocus} onBlur={handleBlur} style={[
        styles.input,
        {
          borderColor: inputMode === "normal" ? focused ? Colors.light.vibrantButton : "transparent" :
            inputMode === "warn" ? "red" :
              "green"
        }
      ]}
        value={value}
        onChangeText={setValue ? e => setValue(e) : e => {}} />

      <Text style={[
        styles.infoText,
        {
          color: inputMode === "normal" ? "#FFF" :
            inputMode === "warn" ? "red" :
              "#fff"
        }
      ]}>
        {
          showInfoTextAlways ? infoText :
            showInfoTextOnFocus && focused ? infoText :
              !showInfoTextOnFocus && !focused ? infoText :
                ""
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, .2)",
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 16,
  },
  labelText: {
    width: "100%",
    color: "#fff",
    padding: 5,
    fontWeight: "600",
    fontSize: 16,
    opacity: .7
  },
  infoText: {
    width: "100%",
    color: "#fff",
    padding: 5,
  }
})