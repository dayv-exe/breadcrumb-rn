import { Colors } from "@/constants/Colors";
import { DimensionValue, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type buttonTypes = "prominent" | "faded" | "text"

type bProps = {
  labelText?: string
  type?: buttonTypes
  width?: DimensionValue
}

function ProminentButton({ labelText, width }: bProps) {
  return (
    <TouchableOpacity style={[
      styles.prominent,
      { width: width }
    ]}>
      <Text style={styles.labelText}>{labelText}</Text>
    </TouchableOpacity>
  )
}

function FadedButton({ labelText, width }: bProps) {
  return (
    <TouchableOpacity style={styles.faded}>
      <Text style={[
        styles.labelText,
        { width: width }
      ]}>{labelText}</Text>
    </TouchableOpacity>
  )
}

function TextButton({ labelText }: bProps) {
  return (
    <TouchableOpacity style={styles.text}>
      <Text style={styles.textBtnLabelText}>{labelText}</Text>
    </TouchableOpacity>
  )
}

export default function CustomButton({ labelText = "button", type = "text", width = "auto" }: bProps) {
  if (type === "prominent") {
    return (
      <ProminentButton labelText={labelText} width={width} />
    )
  } else if (type === "faded") {
    return (
      <FadedButton labelText={labelText} width={width} />
    )
  } else {
    return (
      <TextButton labelText={labelText} />
    )
  }
}

const baseButton: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  padding: 15,
  borderRadius: 15
}

const baseLabelText: TextStyle = {
  fontWeight: "700"
}

const styles = StyleSheet.create({
  prominent: {
    ...baseButton,
    backgroundColor: Colors.light.vibrantButton,
  },
  faded: {
    backgroundColor: "rgba(255, 255, 255, .2)",
    ...baseButton
  },
  text: {
    ...baseButton,
    backgroundColor: "transparent",
  },
  textBtnLabelText: {
    ...baseLabelText,
    color: Colors.light.vibrantButton,
  },
  labelText: {
    ...baseLabelText,
    color: Colors.dark.text,
  }
})