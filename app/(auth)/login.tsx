import { loginDetails } from "@/api/models/userDetails";
import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const [loginDetails, setLoginDetails] = useState<loginDetails>({
    email: "",
    password: ""
  })

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scroll}>
        <Spacer />
        <CustomInput keyboardType="email-address" value={loginDetails.email} setValue={e => setLoginDetails({...loginDetails, email: e})} labelText="Email:" infoText="" />
        <Spacer size="small" />
        <CustomInput value={loginDetails.password} setValue={e => setLoginDetails({...loginDetails, password: e})} isPassword labelText="Password:" infoText="" />
        <CustomButton labelText="forgot password?" type="text" />
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