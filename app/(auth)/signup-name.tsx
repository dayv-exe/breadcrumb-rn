import { signupDetails } from "@/api/models/userDetails";
import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { useUsernameAvailableOnInputChange, useUsernameAvailableOnSubmit } from "@/hooks/queries/useUsernameAvailable";
import { debounce } from "@/utils/debounce";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SignupNameScreen() {
  const [userDetails, setUserDetails] = useState<signupDetails>({
    username: "",
    fullname: "",
    birthdate: "",
    email: "",
    password: ""
  })
  const [debouncedUname, setDebouncedUname] = useState("")

  const debounceInput = useMemo(() => {
    return debounce((value: string) => {
      setDebouncedUname(value);
    }, 500);
  }, []);

  useEffect(() => {
    debounceInput(userDetails.username)
  }, [userDetails.username])

  const {
    data: isAvailable,
    isFetching,
  } = useUsernameAvailableOnInputChange(debouncedUname)

  const {
    isPending,
    mutate: checkUsernameAvaiblity,
  } = useUsernameAvailableOnSubmit()


  function getUsernameInfoText() {
    if (userDetails.username.length < 1) {
      return "you can change this later"
    } else if (isFetching) {
      return "🔎 checking..."
    } else if (isAvailable) {
      return `✅ ${userDetails.username} is available`
    } else {
      return `❌ ${userDetails.username} is unavailable!`
    }
  }

  const router = useRouter()

  const handleNext = () => {
    // run final check on username
    checkUsernameAvaiblity(userDetails.username, {
      onSuccess: available => {
        if (available) {
          // proceed to next page
          console.log(userDetails.username)
          router.push({
            pathname: "/signup-birthdate",
            params: userDetails
          })
        } else {
          // show popup for invalid username
        }
      }
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}>
      <Spacer />
      <Text style={styles.text}>Step 1 of 4</Text>

      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scroll}>
        <Spacer />
        <CustomInput value={userDetails.username} setValue={e => setUserDetails({ ...userDetails, username: e })} labelText="Username:" infoText={getUsernameInfoText()} showInfoTextAlways disableAutoCorrect autoCapitalize="none" inputMode={userDetails.username.length > 0 && !isAvailable && !isFetching ? "warn" : "normal"} />

        <Spacer />

        <CustomInput value={userDetails.fullname ?? ""} setValue={e => setUserDetails({ ...userDetails, fullname: e })} labelText="Fullname (optional):" infoText="helps your friends find you" showInfoTextOnFocus disableAutoCorrect autoCapitalize="words" />
        <Spacer />

      </ScrollView>

      <View style={styles.buttonView}>
        <CustomButton type="prominent" labelText="Next" handleClick={handleNext} disabled={!isAvailable && !isFetching} />
        <Spacer />
        <Spacer />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  usernameContainer: {
    width: "100%",
    flexDirection: "row"
  },
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
    fontSize: 15,
    color: "#fff",
    opacity: .6,
    fontWeight: "700"
  }
})