import CustomButton from "@/components/buttons/CustomButton";
import CustomImageButton from "@/components/buttons/CustomImageButton";
import CustomLabel from "@/components/CustomLabel";
import CustomProfilePictureCircle from "@/components/profile/CustomProfilePictureCircle";
import Spacer from "@/components/Spacer";
import CustomScrollView from "@/components/views/CustomScrollView";
import CustomView from "@/components/views/CustomView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

const icons = {
  next: {
    light: require("../../assets/images/icons/next_sel_light.png"),
    dark: require("../../assets/images/icons/next_sel_dark.png")
  },
  options: {
    light: require("../../assets/images/icons/options_sel_light.png"),
    dark: require("../../assets/images/icons/options_sel_dark.png")
  },
  findFriends: {
    light: require("../../assets/images/icons/findfriends_sel_light.png"),
    dark: require("../../assets/images/icons/findfriends_sel_dark.png")
  },
  message: {
    light: require("../../assets/images/icons/messages_sel_light.png"),
    dark: require("../../assets/images/icons/messages_sel_dark.png")
  }
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}

export default function ProfileScreen() {
  const mode = useColorScheme()
  const router = useRouter()
  const handleShowOptions = () => {
    router.push("/profile-settings")
  }

  return (
    <CustomView horizontalPadding={20} adaptToTheme>
      <SafeAreaView style={[
        styles.container
      ]}>
        <View style={styles.header}>
          <CustomLabel fitContent adaptToTheme labelText="david.arubuike" />
          <CustomImageButton handleClick={handleShowOptions} flat src={getIconImage("options", mode === "light")} />
        </View>

        <CustomScrollView>
          <Spacer size="small" />
          <CustomProfilePictureCircle size={150} />
          <Spacer />
          <CustomLabel fontSize={18.5} bold labelText="David 👨🏾‍💻" textAlign="center" adaptToTheme />
          <Spacer size="small" />
          <CustomButton labelText="no mutual friends" squashed type="theme-faded" />
          <Spacer size="small" />
          <CustomLabel width={"70%"} textAlign="center" labelText="I like the sound keyboards make while you type 😄" adaptToTheme />
          <Spacer />
          <View style={styles.controls}>
            <CustomButton width={"40%"} slim labelText="Crumb" type="prominent" />
            <Spacer size="small" />
            <CustomImageButton type="theme-faded" size={21} src={getIconImage("message", mode === "light")} flat />
            <Spacer size="small" />
            <CustomImageButton type="theme-faded" size={21} src={getIconImage("findFriends", mode === "light")} flat />
          </View>
        </CustomScrollView>
      </SafeAreaView>
    </CustomView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})