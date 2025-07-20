import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scroll}>
        <Spacer />
        <CustomInput value={email} setValue={setEmail} labelText="Email:" infoText="" />
        <Spacer size="small" />
        <CustomInput value={password} setValue={setPassword} isPassword labelText="Password:" infoText="" />
        <Spacer />
      </ScrollView>

      <View style={styles.buttonView}>
        <CustomButton type="prominent" labelText="Login" />
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
  }
})