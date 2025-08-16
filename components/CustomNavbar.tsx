// components/FloatingTabBar.tsx
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomNavBar ({ state, descriptors, navigation }: BottomTabBarProps) {

  return (
    <View
      style={[
        styles.tabBar,
        { },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const iconName =
          options.tabBarIcon !== undefined
            ? (options.tabBarIcon as any)({ focused: state.index === index })?.props?.name
            : "ellipse";

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName || "ellipse"}
              size={24}
              color={isFocused ? "#007AFF" : "#999"}
            />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 65
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    marginTop: 20
  },
  label: {
    fontSize: 12,
    color: "#999",
  },
  labelFocused: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
