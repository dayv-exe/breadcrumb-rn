
import { showSettingsAlert } from "@/utils/helpers";
import { SafeAreaView, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { Extrapolation, interpolate, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { Camera, CameraDevice, CameraProps, useCameraDevice, useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import CustomButton from "../buttons/CustomButton";
import CustomLabel from "../CustomLabel";

Reanimated.addWhitelistedNativeProps({
  zoom: true,
})
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

type camProps = {
  device: CameraDevice
}
function CameraScreen({ device }: camProps) {
  const zoom = useSharedValue(device.neutralZoom)

  const zoomOffset = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onBegin(() => {
      zoomOffset.value = zoom.value
    })
    .onUpdate(event => {
      const zoomDelta = -event.translationY / 50
      const z = zoomOffset.value + zoomDelta
      // const z = zoomOffset.value * event.scale
      zoom.value = interpolate(
        z,
        [1, 10],
        [device.minZoom, 10],
        Extrapolation.CLAMP,
      )
    })

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({ zoom: zoom.value }),
    [zoom]
  )

  return (
    <GestureDetector gesture={gesture}>
      <ReanimatedCamera
        enableZoomGesture
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        animatedProps={animatedProps}
      />
    </GestureDetector>
    // <View style={{ backgroundColor: "black", flex: 1 }}>
    //   <Camera enableZoomGesture photo video style={StyleSheet.absoluteFill} device={device} isActive={true} />
    // </View>
  )
}

function NoCameraFoundScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
      <CustomLabel textAlign="center" labelText="🤔" fontSize={21} />
      <CustomLabel width={"80%"} labelText="it appears that this device does not have a camera." textAlign="center" />
    </SafeAreaView>
  )
}

type noPermProps = {
  missingPermissions: string[]
  requestPerms: () => void
}
function NoPermissionScreen({ missingPermissions, requestPerms }: noPermProps) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
      <CustomLabel textAlign="center" labelText="🔐" fontSize={21} />
      <CustomLabel width={"80%"} labelText={`Allow ${missingPermissions.join(" and ")} access to start creating.`} textAlign="center" />
      <CustomButton type="less-vibrant-text" labelText="Grant Permissions" handleClick={requestPerms} />
    </SafeAreaView>
  )
}

export default function CustomCamera() {
  const device = useCameraDevice("back")
  const { hasPermission: hasCamPermission, requestPermission: reqCamPermission } = useCameraPermission()
  const { hasPermission: hasMicPermission, requestPermission: reqMicPermission } = useMicrophonePermission()

  async function requestPerms() {
    if (!hasCamPermission) {
      const status = await reqCamPermission()
      if (!status) {
        showSettingsAlert("Camera and Microphone")
      }
    } else if (!hasMicPermission) {
      const status = await reqMicPermission()
      if (!status) {
        showSettingsAlert("Microphone")
      }
    }
  }

  if (!hasCamPermission || !hasMicPermission) {
    let missingPermissions = []

    if (!hasCamPermission) missingPermissions.push("camera")
    if (!hasMicPermission) missingPermissions.push("microphone")

    return (
      <NoPermissionScreen missingPermissions={missingPermissions} requestPerms={requestPerms} />
    )
  }

  if (device == null) return (
    <NoCameraFoundScreen />
  )

  return (
    <CameraScreen device={device} />
  )
}