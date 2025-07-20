import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DimensionValue, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type buttonTypes = "prominent" | "faded" | textBtnTypes
type textBtnTypes = "text" | "vibrant-text" | "forced-white"

type bProps = {
  labelText?: string
  type?: buttonTypes
  width?: DimensionValue
  handleClick?: () => void
  textBtnType?: textBtnTypes
}

function ProminentButton({ labelText, width, handleClick }: bProps) {
  return (
    <TouchableOpacity onPress={handleClick} style={[
      styles.prominent,
      { width: width }
    ]}>
      <Text style={styles.labelText}>{labelText}</Text>
    </TouchableOpacity>
  )
}

function FadedButton({ labelText, width, handleClick }: bProps) {
  return (
    <TouchableOpacity onPress={handleClick} style={styles.faded}>
      <Text style={[
        styles.labelText,
        { width: width }
      ]}>{labelText}</Text>
    </TouchableOpacity>
  )
}

function TextButton({ labelText, handleClick, textBtnType }: bProps) {
  const theme = useThemeColor

  return (
    <TouchableOpacity onPress={handleClick} style={styles.text}>
      <Text style={[
        styles.textBtnLabelText,
        {
          color:
            textBtnType === "text" ? theme({}, "text") :
              textBtnType === "vibrant-text" ? styles.textBtnLabelText.color :
                styles.labelText.color
        }
      ]}>{labelText}</Text>
    </TouchableOpacity>
  )
}

export default function CustomButton({ labelText = "button", type = "text", width = "auto", handleClick = () => { } }: bProps) {
  if (type === "prominent") {
    return (
      <ProminentButton labelText={labelText} width={width} handleClick={handleClick} />
    )
  } else if (type === "faded") {
    return (
      <FadedButton labelText={labelText} width={width} handleClick={handleClick} />
    )
  } else {
    return (
      <TextButton labelText={labelText} handleClick={handleClick} textBtnType={type} />
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
    backgroundColor: "rgba(255, 255, 255, .1)",
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