import CustomImageButton from "@/components/buttons/CustomImageButton";
import CustomLabel from "@/components/CustomLabel";
import CustomMap, { mapMethods } from "@/components/map/CustomMap";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Mapbox from "@rnmapbox/maps";
import Constants from "expo-constants";
import { useMemo, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from "react-native";

const token = Constants.expoConfig?.extra?.mapboxToken;
if (!token) {
  console.warn("Mapbox token is missing!");
} else {
  Mapbox.setAccessToken(token);
}

const icons = {
  addFriend: {
    light: require("../../assets/images/icons/nfriend_sel_light.png"),
    dark: require("../../assets/images/icons/nfriend_sel_dark.png")
  },
  frameMap: {
    light: require("../../assets/images/icons/frame_unsel_light.png"),
    dark: require("../../assets/images/icons/frame_unsel_dark.png")
  },
  focusUserLoc: {
    light: require("../../assets/images/icons/userlocation_sel_light.png"),
    dark: require("../../assets/images/icons/userlocation_sel_dark.png")
  },
}

export function getIconImage(name: keyof typeof icons, darkMode: boolean) {
  const theme = darkMode ? "dark" : "light"
  return icons[name][theme]
}

export default function MapScreen() {
  const mode = useColorScheme() ?? "light";
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '30%', '50%'], []);
  const mapRef = useRef<Mapbox.MapView>(null);
  const [mapMethods, setMapMethods] = useState<mapMethods | null>(null)

  return (
    <View style={styles.page}>

      <SafeAreaView style={styles.headerWrapper}>
        <View>
          <CustomImageButton src={getIconImage("addFriend", mode === "light")} />
        </View>
        <View style={[styles.headerTextContainer, { backgroundColor: mode === "dark" ? Colors.dark.background : Colors.light.background }]}>
          <Text style={[styles.headerText, { color: mode === "dark" ? Colors.dark.text : Colors.light.text }]}>0 crumbs</Text>
        </View>
        <View>
          <CustomImageButton handleClick={() => {
            mapMethods?.moveTo([-1.5, 50], 5)
          }} src={getIconImage("focusUserLoc", mode === "light")} />
          <Spacer size="small" />
          <CustomImageButton src={getIconImage("frameMap", mode === "light")} />
        </View>
      </SafeAreaView>

      <CustomMap setMapMethods={setMapMethods} mapRef={mapRef} zoomLevel={3} />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={[styles.bottomSheet, {
          backgroundColor: mode === "dark" ? Colors.dark.background : Colors.light.background
        }]}
        handleIndicatorStyle={{ backgroundColor: mode === "dark" ? Colors.dark.text : Colors.light.text }}
      >
        <BottomSheetView style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
          <CustomLabel labelText="crumbs" adaptToTheme />
          <CustomLabel labelText="crumbs you received or sent will show here" adaptToTheme fade />
          <Spacer size="big" />
          <CustomLabel labelText="walls" adaptToTheme />
          <CustomLabel labelText="walls you are part of will show here" adaptToTheme fade />
          <Spacer />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    position: "absolute",
    marginTop: 10,
    top: 0,
    left: 15,
    right: 15,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 10,
  },
  headerText: {
    fontSize: 16
  },
  headerTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .275,
    shadowRadius: 10,
  },
  page: {
    flex: 1,
  },
  bottomSheet: {
    borderRadius: 20,
    shadowRadius: 10,
    shadowOpacity: .25
  }
});
