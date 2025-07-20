import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SignupDetailsScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()  

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}>
      <Spacer />
      <Text style={styles.text}>Step 3 of 4</Text>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scroll}>
        <Spacer />
        <CustomInput value={email} setValue={setEmail} labelText="Email:" infoText="only you can see this" showInfoTextOnFocus />
        <Spacer size="small"/>
        <CustomInput value={password} setValue={setPassword} labelText="Password:" infoText="choose a strong password" isPassword />
        <Spacer />
      </ScrollView>

      <View style={styles.buttonView}>
        <CustomButton type="prominent" labelText="Next" handleClick={() => {
          router.push("/signup-verify")
        }} />
        <Spacer />
        <Spacer />
      </View>
    </KeyboardAvoidingView>
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
  scroll: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 100,
    height: 100
  },
  buttonView: {
    width: "80%",
  },
  text: {
    color: "#fff",
    opacity: .6,
    fontWeight: "700"
  }
})