import { Colors } from "@/constants/Colors";
import { inputMode } from "@/constants/customInputModeTypes";
import { useState } from "react";
import { DimensionValue, Image, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type autoCapitalizeType = "none" | "sentences" | "words" | "characters"

type iProps = {
  labelText?: string
  value: string
  setValue?: (e: string) => void
  width?: DimensionValue
  infoText?: string
  forceLowercase?: boolean
  showInfoTextOnFocus?: boolean
  showInfoTextAlways?: boolean
  isPassword?: boolean
  disableAutoCorrect?: boolean
  autoCapitalize?: autoCapitalizeType
  inputMode?: inputMode
  keyboardType?: KeyboardTypeOptions
}

export default function CustomInput({ value, setValue, labelText = "Label:", infoText = "", showInfoTextOnFocus = false, isPassword = false, disableAutoCorrect = false, autoCapitalize, inputMode = "normal", showInfoTextAlways = false, keyboardType = "default", width = "100%", forceLowercase = false }: iProps) {
  const [focused, setFocused] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  return (
    <View style={[
      styles.container,
      { width: width }
    ]}>
      <Text style={styles.labelText}>
        {labelText}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput keyboardType={isPassword && !hidePassword ? "visible-password" : keyboardType} autoCorrect={!disableAutoCorrect} autoCapitalize={forceLowercase ? "none" : autoCapitalize} readOnly={setValue == null} secureTextEntry={isPassword && hidePassword} onFocus={handleFocus} onBlur={handleBlur} style={[
          styles.input,
          {
            borderColor: inputMode === "normal" ? focused ? Colors.light.vibrantButton : "transparent" :
              inputMode === "warn" ? "red" :
                "green"
          }
        ]}
          value={value}
          onChangeText={setValue ? e => setValue(forceLowercase ? e.toLowerCase() : e) : e => { }} />

        {isPassword && <TouchableOpacity style={styles.showToggle} onPress={() => { setHidePassword(hidePassword ? false : true) }}>
          {<Image style={styles.inputToggle} source={
            hidePassword ? require("../../assets/images/hidepassword.png") :
              require("../../assets/images/showpassword.png")
          } />}
        </TouchableOpacity>}
      </View>

      <Text style={[
        styles.infoText,
        {
          color: inputMode === "normal" ? "#FFF" :
            inputMode === "warn" ? "#fff" :
              "#fff",
          opacity: inputMode === "normal" ? 0.8 : 1
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
  inputContainer: {
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
    fontSize: 17,
    fontWeight: "500"
  },
  labelText: {
    width: "100%",
    color: "#fff",
    padding: 5,
    fontWeight: "600",
    fontSize: 16,
    opacity: 1
  },
  infoText: {
    width: "100%",
    color: "#fff",
    padding: 5,
    opacity: .8
  },
  showToggle: {
    position: "absolute",
    right: 15,
    padding: 5,
    borderRadius: 5
  },
  inputToggle: {
    height: 20,
    width: 20,
    opacity: .7
  }
})