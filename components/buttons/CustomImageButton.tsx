import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type props = {
  size?: number
  src: any
  fadeImg?: boolean
  handleClick?: () => void
}

export default function CustomImageButton({ size = 23, src, fadeImg=true, handleClick }: props) {
  const theme = useThemeColor

  return (
    <TouchableOpacity style={[
      styles.container,
      {
        backgroundColor: theme({}, "background")
      }
    ]} onPress={handleClick}>
      <Image style={[{ width: size, height: size, opacity: fadeImg ? .8 : 1 }]} source={src} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .275,
    shadowRadius: 10,
  }
})