import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type iProps = {
  labelText?: string
  value: string
  setValue: (e: string) => void
  infoText?: string
  showInfoTextOnFocus?: boolean
  isPassword?: boolean
}

export default function CustomInput({ value, setValue, labelText = "Label:", infoText = "Info text", showInfoTextOnFocus = false, isPassword = false }: iProps) {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>
        {labelText}
      </Text>
      <TextInput secureTextEntry={isPassword} onFocus={handleFocus} onBlur={handleBlur} style={[
        styles.input,
        { borderColor: focused ? Colors.light.vibrantButton : "transparent" }
      ]}
        value={value}
        onChangeText={e => setValue(e)} />

      {showInfoTextOnFocus && <Text style={styles.infoText}>
        {showInfoTextOnFocus && focused ? infoText : ""}
      </Text>}
      {!showInfoTextOnFocus && <Text style={styles.infoText}>
        {!showInfoTextOnFocus && !focused ? infoText : ""}
      </Text>}
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
    borderWidth: 2
  },
  labelText: {
    width: "100%",
    color: "#fff",
    padding: 5,
    fontWeight: "700",
  },
  infoText: {
    width: "100%",
    color: "#fff",
    padding: 5,
  }
})