import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import { ColorValue, Image, StyleSheet, Text } from "react-native";

const icons = {
  map: {
    light: {
      selected: require("../../assets/images/icons/map_sel_dark.png"),
      unselected: require("../../assets/images/icons/map_unsel_dark.png")
    },
    dark: {
      selected: require("../../assets/images/icons/map_sel_light.png"),
      unselected: require("../../assets/images/icons/map_unsel_light.png")
    }
  },
  crumbs: {
    light: {
      selected: require("../../assets/images/icons/crumbs_sel_dark.png"),
      unselected: require("../../assets/images/icons/crumbs_unsel_dark.png")
    },
    dark: {
      selected: require("../../assets/images/icons/crumbs_sel_light.png"),
      unselected: require("../../assets/images/icons/crumbs_unsel_light.png")
    }
  },
  walls: {
    light: {
      selected: require("../../assets/images/icons/walls_sel_dark.png"),
      unselected: require("../../assets/images/icons/walls_unsel_dark.png")
    },
    dark: {
      selected: require("../../assets/images/icons/walls_sel_light.png"),
      unselected: require("../../assets/images/icons/walls_unsel_light.png")
    }
  },

  add: {
    light: {
      selected: require("../../assets/images/icons/add_sel_dark.png"),
      unselected: require("../../assets/images/icons/add_unsel_dark.png")
    },
    dark: {
      selected: require("../../assets/images/icons/add_sel_light.png"),
      unselected: require("../../assets/images/icons/add_unsel_light.png")
    }
  },

  profile: {
    light: {
      selected: require("../../assets/images/icons/profile_sel_dark.png"),
      unselected: require("../../assets/images/icons/profile_unsel_dark.png")
    },
    dark: {
      selected: require("../../assets/images/icons/profile_sel_light.png"),
      unselected: require("../../assets/images/icons/profile_unsel_light.png")
    }
  },
}

export function getIconImage(name: keyof typeof icons, focused: boolean, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme][focused ? "selected" : "unselected"]
}

type cIconProps = {
  name: keyof typeof icons
  focused: boolean
  darkMode: boolean
  size?: number
}

type cLabelProps = {
  text: string
  color: ColorValue | undefined
  focused?: boolean
}

function CustomTabIcon({ name, focused, darkMode, size=20 }: cIconProps) {
  return (
    <Image
      source={getIconImage(name, focused, darkMode)}
      style={{
        width: size,
        height: size,
        opacity: focused ? 1 : .7
      }}
      resizeMode="contain"
    />
  )
}

function CustomTabLabel({text, color, focused}: cLabelProps) {
  return (
    <Text style={[styles.tabLabel, {color: color, opacity: focused ? 1 : .7, fontWeight: focused ? "bold" : "normal"}]}>{text}</Text>
  )
}

export default function MainScreen() {

  const mode = useColorScheme()
  const theme = useThemeColor

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: mode === "dark" ? Colors.dark.background : Colors.light.background,
        height: 100,
        paddingTop: 10,
        borderColor: true ? "transparent" : mode === "dark" ? "#222" : "#eee",
        shadowOpacity: .025,
        shadowRadius: 5,
      },
      tabBarShowLabel: true
    }}>
      <Tabs.Screen name="index" options={{
        title: "Map",
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon name={"map"} focused={focused} darkMode={mode === "dark"} />
        ),
        tabBarLabel: ({focused}) => (
          <CustomTabLabel color={theme({}, "text")} text="Map" focused={focused} />
        )
      }} />
  
      <Tabs.Screen name="messages" options={{
        title: "Crumbs",
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon name={"crumbs"} focused={focused} darkMode={mode === "dark"} />
        ),
        tabBarLabel: ({focused}) => (
          <CustomTabLabel color={theme({}, "text")} text="Crumbs" focused={focused} />
        )
      }} />

      <Tabs.Screen name="add" options={{
        title: "Post",
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon name={"add"} focused={focused} darkMode={mode === "dark"} />
        ),
        tabBarLabel: ({focused}) => (
          <CustomTabLabel color={theme({}, "text")} text="Create" focused={focused} />
        )
      }} />

      <Tabs.Screen name="walls" options={{
        title: "Walls",
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon name={"walls"} focused={focused} darkMode={mode === "dark"} />
        ),
        tabBarLabel: ({focused}) => (
          <CustomTabLabel color={theme({}, "text")} text="Walls" focused={focused} />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Me",
        tabBarIcon: ({ focused }) => (
          <CustomTabIcon name={"profile"} focused={focused} darkMode={mode === "dark"} />
        ),
        tabBarLabel: ({focused}) => (
          <CustomTabLabel color={theme({}, "text")} text="Me" focused={focused} />
        )
      }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabLabel: {
    marginTop: 2,
    fontSize: 10,
  }
})