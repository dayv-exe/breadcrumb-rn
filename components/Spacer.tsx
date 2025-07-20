import { StyleSheet, View } from "react-native";

type spaceSize = "small" | "medium" | "big"

type sProps = {
  size?: spaceSize
}

export default function Spacer({ size="medium" }: sProps) {
  return (
    <View style={
      size === "big" ? styles.big :
        size === "medium" ? styles.medium :
          styles.small
    }>

    </View>
  )
}

const styles = StyleSheet.create({
  small: {
    padding: 5
  },
  medium: {
    padding: 10
  },
  big: {
    padding: 20
  },
})