import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text } from "react-native";
import CustomFloatingSquare from "./CustomFloatingSquare";

type props = {
  text: string
  fade?: boolean
  allowWidthExpansion?: boolean
}

export default function CustomTextButton({ text, fade = false, allowWidthExpansion=false }: props) {
  const theme = useThemeColor

  return (
    <CustomFloatingSquare allowWidthExpansion={allowWidthExpansion}>
      <Text style={[
        styles.text,
        {
          color: theme({}, "text"),
          opacity: fade ? .7 : 1
        }
      ]}>{text}</Text>
    </CustomFloatingSquare>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  }
})