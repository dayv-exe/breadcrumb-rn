import { useColorScheme } from "@/hooks/useColorScheme.web";
import Mapbox from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export interface mapMethods {
  moveTo: (position: Position, newZoomLevel?: number) => void
  moveToUserLocation: (zoomLevel?: number) => void
}

type customMapProps = {
  mapRef?: React.RefObject<Mapbox.MapView | null>
  handlePress?: (v: any) => void
  handleLongPress?: (v: any) => void
  userPosition?: Position
  zoomLevel?: number
  pitch?: number
  setMapMethods: (methods: mapMethods) => void
}

export default function CustomMap({ handlePress = () => { }, handleLongPress = () => { }, mapRef, userPosition, zoomLevel = 3, pitch = 0, setMapMethods }: customMapProps) {
  const lightUrl = Constants.expoConfig?.extra?.lightMapUrl;
  const darkUrl = Constants.expoConfig?.extra?.darkMapUrl;
  const mode = useColorScheme()
  const cameraRef = useRef<Mapbox.Camera>(null)

  const [mapReady, setMapReady] = useState(false);

  const methods: mapMethods = {
    moveTo: (position: Position, newZoomLevel?: number) => {
      cameraRef.current?.setCamera({
        centerCoordinate: position,
        zoomLevel: newZoomLevel || zoomLevel,
        animationDuration: 1000
      })
    },

    moveToUserLocation: (newZoomLevel?: number) => {

    }
  }

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        rotateEnabled={false}
        ref={mapRef}
        style={styles.map}
        scaleBarEnabled={false}
        onDidFinishLoadingMap={() => {
          setMapReady(true)
          setMapMethods(methods)
        }}
        styleURL={mapReady ? (mode === "light" ? lightUrl : darkUrl) : Mapbox.StyleURL.Satellite}
        logoEnabled={false}
        onPress={e => handlePress(e)}
        onLongPress={e => handleLongPress(e)}
      >
        <Mapbox.Camera ref={cameraRef} centerCoordinate={[0, 0]} zoomLevel={zoomLevel} animationDuration={1000} pitch={pitch} />

        {userPosition &&
          <Mapbox.UserLocation
            visible={true}
            minDisplacement={10}
            requestsAlwaysUse={true} />
        }
      </Mapbox.MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})