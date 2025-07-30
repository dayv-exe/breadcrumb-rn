import { useAuthStore } from "@/utils/authStore";
import Mapbox from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

const token = Constants.expoConfig?.extra?.mapboxToken;
if (!token) {
  console.warn("Mapbox token is missing!");
} else {
  Mapbox.setAccessToken(token);
}


export default function MapScreen() {
  const lightUrl = Constants.expoConfig?.extra?.lightMapUrl
  const darkUrl = Constants.expoConfig?.extra?.darkMapUrl
  const mapRef = useRef<Mapbox.MapView>(null)
  const { logout } = useAuthStore()
  const mode = useColorScheme() ?? "light"

  const [mapReady, setMapReady] = useState(false)

  const handlePress = async (e: any) => {
    // console.log(e)
    const screenPoint: Position = [e.properties.screenPointX, e.properties.screenPointY]
    const res = await mapRef.current?.queryRenderedFeaturesAtPoint(screenPoint, null, ["poi-label", "continent-label", "country-label", "state-label", "settlement-major-label", "settlement-minor-label", "settlement-subdivision-label, building"])
    //console.log(res?.features)
    res?.features.forEach(feature => {
      console.log(feature)
    })
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView rotateEnabled={false} ref={mapRef} style={styles.map} onDidFinishLoadingMap={() => setMapReady(true)} styleURL={mapReady ? mode === "light" ? lightUrl : darkUrl : Mapbox.StyleURL.Satellite} logoEnabled={false} onPress={e => handlePress(e)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1
  }
})