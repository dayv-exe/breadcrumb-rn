import CustomButton from "@/components/buttons/CustomButton";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function AuthChoiceScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Spacer />
      <Spacer />
      <Image style={styles.image} source={require("../../assets/images/bread-no-bg.png")} />
      <Spacer />
      <CustomButton handleClick={() => {
        router.push("/login")
      }} labelText="Login" type="prominent" />
      <Spacer />
      <Text style={styles.text}>Or</Text>
      <Spacer />
      <CustomButton handleClick={() => {
        router.push("/signup-name")
      }} labelText="Register" type="faded" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.vibrantBackground,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  image: {
    width: 100,
    height: 100,
  },

  text: {
    color: "#fff",
  }
})