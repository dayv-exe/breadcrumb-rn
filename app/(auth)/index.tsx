import CustomButton from "@/components/buttons/CustomButton";
import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

export default function AuthChoiceScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/bread-no-bg.png")} />
      <CustomButton labelText="Login" type="prominent" />
      <Text style={styles.text}>Or</Text>
      <CustomButton labelText="Signup" type="faded" />
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
    marginTop: 30,
    marginBottom: 30
  },

  text: {
    color: "#fff",
    marginVertical: 10
  }
})