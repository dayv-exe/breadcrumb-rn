import { Colors } from "@/constants/Colors";
import { PropsWithChildren } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

type cvProps = {
  backgroundColor?: string
  verticalAlign?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined
  horizontalPadding?: DimensionValue
}

export default function CustomView({ children, backgroundColor = "#FFF", verticalAlign = "flex-start", horizontalPadding = 40 }: PropsWithChildren<cvProps>) {
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: backgroundColor,
        justifyContent: verticalAlign,
        paddingHorizontal: horizontalPadding
      }
    ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.vibrantBackground,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    width: "100%"
  },
})