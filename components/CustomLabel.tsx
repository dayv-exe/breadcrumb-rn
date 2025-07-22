import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, TextStyle } from "react-native";

type tAlign = "left" | "right" | "center"

type lProps = {
  labelText?: string,
  textAlign?: tAlign
  bold?: boolean
  fade?: boolean
  adaptToTheme?: boolean
}

export default function CustomLabel({ labelText = "Label", textAlign = "left", adaptToTheme = false, bold = false, fade=false }: lProps) {
  const theme = useThemeColor
  return (
    <Text style={[
      styles.labelText,
      {
        color: adaptToTheme ? theme({}, "text") : "#fff",
        fontWeight: bold ? "600" : "normal",
        textAlign: textAlign,
        opacity: fade ? .7 : 1
      }
    ]}>{labelText}</Text>
  )
}

const baseLabel: TextStyle = {
  width: "100%",
  padding: 5,
  fontSize: 16
}

const styles = StyleSheet.create({
  labelText: {
    ...baseLabel
  },
})