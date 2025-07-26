import { signupDetails } from "@/api/models/userDetails";
import CustomButton from "@/components/buttons/CustomButton";
import CustomInput from "@/components/inputs/CustomInput";
import Spacer from "@/components/Spacer";
import CustomKeyboardAvoidingView from "@/components/views/CustomKeyboardAvoidingView";
import CustomScrollView from "@/components/views/CustomScrollView";
import { Colors } from "@/constants/Colors";
import { inputMode } from "@/constants/customInputModeTypes";
import { useUsernameAvailableOnInputChange, useUsernameAvailableOnSubmit } from "@/hooks/queries/useUsernameAvailable";
import { debounce } from "@/utils/debounce";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignupNameScreen() {
  const [userDetails, setUserDetails] = useState<signupDetails>({
    username: "",
    fullname: "",
    birthdate: new Date().toLocaleDateString(),
    email: "",
    password: ""
  })

  const router = useRouter()

  const { mutate: checkUsernameAvaiblity } = useUsernameAvailableOnSubmit()

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
    data,
    isPending,
    error,
  } = useUsernameAvailableOnInputChange(debouncedUname)

  const handleUsernameChange = (e: string) => {
    setUserDetails({ ...userDetails, username: e })
  }

  const handleProceedToNextPage = async () => {
    checkUsernameAvaiblity(userDetails.username, {
      onSuccess: usernameFree => {
        if (usernameFree.isValid) {
          // one final check just to make sure
          router.push({
            pathname: "/signup-birthdate",
            params: userDetails
          })
        }
      }
    })
  }

  function getNextBtnDisabled(): boolean {
    return !data?.isValid
  }

  function getUsernameInfoText(): string {
    if (userDetails.username.length < 1) {
      return "you can change this later"
    } else if (isPending) {
      return "🔎 checking..."
    } else if (data?.isValid) {
      return `✅ ${userDetails.username} is available`
    } else {
      if (error) {
        return `❌ ${error}`
      }
      return `🚫 ${data?.reason}`
    }
  }

  function getUsernameInputMode(): inputMode {
    if (userDetails.username.length < 1 || isPending || data?.isValid) {
      return "normal"
    } else {
      return "warn"
    }
  }

  return (
    <CustomKeyboardAvoidingView backgroundColor={Colors.light.vibrantBackground}>
      <CustomScrollView>
        <Spacer />
        <CustomInput value={userDetails.username} setValue={e => handleUsernameChange(e)} labelText="Username:" infoText={getUsernameInfoText()} showInfoTextAlways disableAutoCorrect inputMode={getUsernameInputMode()} forceLowercase />

        <Spacer />

        <CustomInput value={userDetails.fullname ?? ""} setValue={e => setUserDetails({ ...userDetails, fullname: e })} labelText="Fullname (optional):" infoText="helps your friends find you" showInfoTextOnFocus disableAutoCorrect autoCapitalize="words" />
        <Spacer />
      </CustomScrollView>

      <View style={styles.buttonView}>
        <CustomButton type="prominent" labelText="Next" handleClick={handleProceedToNextPage} disabled={getNextBtnDisabled()} />
        <Spacer />
        <Spacer />
      </View>
    </CustomKeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  usernameContainer: {
    width: "100%",
    flexDirection: "row"
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