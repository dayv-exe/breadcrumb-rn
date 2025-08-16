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
  },
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
          <CustomLabel fitContent adaptToTheme bold labelText="david.arubuike" />
          <View style={{ flexDirection: "row" }}>
            <CustomImageButton size={21} src={getIconImage("findFriends", mode === "light")} flat />
            <Spacer size="small" />
            <CustomImageButton handleClick={handleShowOptions} flat src={getIconImage("options", mode === "light")} />
          </View>
        </View>

        <CustomScrollView customStyle={styles.scroll}>
          <Spacer />
          <View style={styles.profileHeader}>
            <CustomProfilePictureCircle size={100} />
            <Spacer />
            <View style={styles.profileAside}>
              <CustomLabel fontSize={18.5} bold labelText="David 👨🏾‍💻" textAlign="left" adaptToTheme />
              <Spacer size="small" />
              <CustomButton labelText="5 mutual friends" squashed type="theme-faded" />
            </View>
          </View>
          <Spacer />
          <CustomLabel width={"80%"} textAlign="left" labelText="I like the sound keyboards make while you type 😄" adaptToTheme />
          <Spacer />
          <View style={styles.controls}>
            <View style={{ flexShrink: 1, flexGrow: 1 }}><CustomButton width={"100%"} slim labelText="Crumb" type="prominent" /></View>
            <Spacer size="small" />
            <CustomImageButton type="theme-faded" size={21} src={getIconImage("message", mode === "light")} flat />
            <Spacer size="small" />
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
  },
  profileHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  profileAside: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  scroll: {
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
})