import CustomImageButton from "@/components/buttons/CustomImageButton";
import CustomLabel from "@/components/CustomLabel";
import CustomView from "@/components/views/CustomView";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons = {
  next: {
    light: require("../../assets/images/icons/next_sel_light.png"),
    dark: require("../../assets/images/icons/next_sel_dark.png")
  },
  back: {
    light: require("../../assets/images/icons/close_unsel_light.png"),
    dark: require("../../assets/images/icons/close_unsel_dark.png")
  },
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}

export default function FindFriendsScreen() {
  const insets = useSafeAreaInsets()
  const mode = useColorScheme()
  const router = useRouter()

  async function getContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }
    }
  }

  function handleGoBack() {
    router.dismiss()
  }

  useEffect(() => {
    getContacts()
  }, [])

  // show friend requests, show contacts to send invitations by text to

  return (
    <CustomView horizontalPadding={0} adaptToTheme>
      <SafeAreaView style={{
        paddingTop: insets.top
      }}>
        <View style={styles.header}>
          <CustomImageButton flat size={15} src={getIconImage("back", mode === "light")} handleClick={handleGoBack} />
          <CustomLabel adaptToTheme labelText="Find Friends" width={"auto"} bold />

          {/* this button should not be visible, i put it here to properly align header */}
          <CustomImageButton flat src={""} />
        </View>
      </SafeAreaView>
    </CustomView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  }
})