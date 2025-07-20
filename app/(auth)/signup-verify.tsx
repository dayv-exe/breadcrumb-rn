import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SignupVerifyScreen() {
  const [code, setCode] = useState("")

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}>
      <Spacer />
      <Text style={styles.text}>Step 4 of 4</Text>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scroll}>
        <Spacer />
        <CustomInput value={code} setValue={setCode} labelText="Verification code:" infoText="enter the code we sent to your email" />
        <Spacer size="big" />

        <View style={styles.buttonView}>
          <CustomButton type="prominent" labelText="Verify" />
          <Spacer size="big" />
          <Text style={styles.text}>Or</Text>
          <Spacer />
          <CustomButton type="forced-white" labelText="Resend verification code" />
        </View>
      </ScrollView>
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
    width: "100%",
    textAlign: "center",
    color: "#fff",
    opacity: .6,
    fontWeight: "700"
  }
})