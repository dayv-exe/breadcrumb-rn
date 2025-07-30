import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CustomScrollView({children}: PropsWithChildren) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
})