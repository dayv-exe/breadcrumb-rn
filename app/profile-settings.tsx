import CustomImageButton from "@/components/buttons/CustomImageButton";
import CustomLabel from "@/components/CustomLabel";
import CustomProfilePictureCircle from "@/components/profile/CustomProfilePictureCircle";
import Spacer from "@/components/Spacer";
import CustomView from "@/components/views/CustomView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuthStore } from "@/utils/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const icons = {
  next: {
    light: require("../assets/images/icons/next_sel_light.png"),
    dark: require("../assets/images/icons/next_sel_dark.png")
  },
  back: {
    light: require("../assets/images/icons/back_sel_light.png"),
    dark: require("../assets/images/icons/back_sel_dark.png")
  },
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}

export default function ProfileSettingsScreen() {
  const { logout } = useAuthStore()
  const [pending, setPending] = useState(false)
  const theme = useThemeColor
  const mode = useColorScheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.dismiss()
  }
  const sections = [
    {
      title: '👤 Account Information', data: [
        { name: 'Username', value: "david.arubuike" },
        { name: "Full name", value: "David" },
        { name: 'Bio', value: "" },
        { name: "Email", value: "davzy007@gmail.com" },
        { name: "Password", value: "****" },
        { name: "Birthdate", value: "12/03/2002" },
      ]
    },
    {
      title: '🔐 Privacy', data: [
        { name: 'Blocked Users', value: "" },
        { name: 'Restricted Users', value: "" },
        { name: "Logout", value: "", handleClick: handleLogout },
        { name: 'Deactivate account', value: "" },
        { name: 'Delete account', value: "" },
        { name: 'Bug report', value: "" },
      ]
    },
    {
      title: '📖 Legal', data: [
        { name: 'Term of service', value: "" },
        { name: 'Contact us', value: "" },
      ]
    },
  ];

  return (
    <CustomView horizontalPadding={0} adaptToTheme>
      <SafeAreaView style={[
        styles.container
      ]}>
        <View style={styles.header}>
          <CustomImageButton flat src={getIconImage("back", mode === "light")} handleClick={() => {
            router.dismiss()
          }} />
          <CustomLabel labelText="Profile" fitContent adaptToTheme bold />
          <CustomImageButton src={"."} flat />
        </View>
        <Spacer />
        <CustomProfilePictureCircle showInstruction />
        <Spacer />
        <SectionList
          style={styles.sections}
          sections={sections}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <View style={[styles.item, { borderBottomColor: theme({}, "fadedBackground") }]}>
              <TouchableOpacity onPress={item.handleClick ? item.handleClick : () => { }} style={styles.optionTouchable}>
                <View>
                  <CustomLabel fitContent adaptToTheme fade labelText={item.name} />
                  {item.value && <CustomLabel fitContent adaptToTheme labelText={item.value} />}
                </View>
                <CustomImageButton flat fadeImg src={getIconImage("next", mode === "light")} />
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={[styles.sectionHeader, {
              backgroundColor: mode === "dark" ? Colors.dark.background : Colors.light.background,
              color: mode === "dark" ? Colors.dark.text : Colors.light.text
            }]}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </CustomView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%"
  },
  sectionHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 17,
  },
  item: {
    width: "90%",
    paddingVertical: 10,
    borderBottomWidth: .5,
    alignSelf: "center"
  },
  sections: {
    width: "100%",
  },
  optionTouchable: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  }
})