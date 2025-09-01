
import { MAX_VIDEO_DURATION_MILLISECONDS } from "@/constants/appConstants";
import { Colors } from "@/constants/Colors";
import { showSettingsAlert } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { cancelAnimation, Easing, Extrapolation, interpolate, runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, CameraDevice, CameraProps, useCameraDevice, useCameraFormat, useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import CustomButton from "../buttons/CustomButton";
import CustomImageButton from "../buttons/CustomImageButton";
import CustomLabel from "../CustomLabel";
import RecordingIndicator from "../recordingIndicator";
import Spacer from "../Spacer";
import RecordingProgressRing from "./recordingProgressRing";

Reanimated.addWhitelistedNativeProps({
  zoom: true,
})
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

type camProps = {
  device: CameraDevice
}

function CrumbTypePicker() {
  return (
    <View style={[styles.pickerContainer, { backgroundColor: Colors.light.backgroundOverlay }]}>
      <CustomButton squashed width={"auto"} type="faded" labelText="Photo & video" />
      <Spacer size="small" />
      <CustomButton squashed type="text" labelText="Text" />
    </View>
  )
}

function CameraScreen({ device }: camProps) {
  const progress = useSharedValue(0)
  const [isRecording, setIsRecording] = useState(false)
  const zoom = useSharedValue(device.neutralZoom)
  const format = useCameraFormat(device, [
    { photoResolution: { width: 1920, height: 1080 } }
  ])
  const insets = useSafeAreaInsets()

  const router = useRouter()

  const handleTouchEnd = () => {
    // handles ending video recording when user lift finger from screen while recording
    setIsRecording(false)
    if (isRecording) {
      stopRecording()
    }
  }

  const zoomOffset = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onBegin(() => {
      zoomOffset.value = zoom.value
    })
    .onUpdate(event => {
      const zoomDelta = -event.translationY / 40
      const z = zoomOffset.value + zoomDelta
      // const z = zoomOffset.value * event.scale
      if (!isRecording) return
      zoom.value = interpolate(
        z,
        [1, 13],
        [device.minZoom, 13],
        Extrapolation.CLAMP,
      )
    })

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({ zoom: zoom.value }),
    [zoom]
  )

  function startRecording() {
    setIsRecording(true)
    progress.value = 0

    progress.value = withTiming(
      1,
      {
        duration: MAX_VIDEO_DURATION_MILLISECONDS,
        easing: Easing.linear,
      },
      (finished) => {
        runOnJS(stopRecording)()
      }
    )
  }

  function stopRecording() {
    setIsRecording(false)
    cancelAnimation(progress)
    progress.value = 0
    zoom.value = 1
  }

  return (
    <GestureDetector gesture={gesture}>
      <SafeAreaView onTouchEnd={() => {
        handleTouchEnd()
      }} style={styles.cameraContainer}>
        <ReanimatedCamera
          enableZoomGesture
          style={[StyleSheet.absoluteFill, {backgroundColor: "black"}]}
          device={device}
          isActive={true}
          animatedProps={animatedProps}
          audio={true}
        />
        {isRecording && <RecordingIndicator />}
        {!isRecording && <View style={styles.cameraControls}>
          <CustomImageButton type="text" src={require("../../assets/images/icons/noflash_sel_light.png")} size={25} />
          <CustomLabel labelText="Flash" textAlign="center" fontSize={12} />
          <Spacer size="small" />
          <CustomImageButton type="text" src={require("../../assets/images/icons/flipcamera_sel_light.png")} size={25} />
          <CustomLabel labelText="flip" textAlign="center" fontSize={12} />
        </View>}
        {!isRecording && <View style={[styles.topControls, { paddingTop: insets.top }]}>
          <CustomImageButton type="text" src={require("../../assets/images/icons/findfriends_sel_light.png")} size={25} handleClick={() => router.push("/find-friends")} />
          <CustomImageButton type="text" src={require("../../assets/images/icons/walls_sel_light.png")} size={25} handleClick={() => router.push("/create-wall")} />
        </View>}
        {!isRecording && <View style={styles.galleryContainer}>
          <CustomImageButton type="text" src={require("../../assets/images/icons/gallery_unsel_light.png")} size={35} />
        </View>}
        <View style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          bottom: 55,
        }}>
          <View onTouchEnd={handleTouchEnd} style={[styles.videoShutter, { backgroundColor: isRecording ? "red" : "transparent" }]}>
            <TouchableOpacity delayLongPress={150} onLongPress={startRecording} style={[styles.photoShutter, { borderColor: isRecording ? "transparent" : "#ddd", backgroundColor: isRecording ? "transparent" : "white" }]}>
            </TouchableOpacity>
          </View>
          {isRecording && <RecordingProgressRing size={90} strokeWidth={10} progress={progress} />}
        </View>
        {!isRecording && <CrumbTypePicker />}
      </SafeAreaView>
    </GestureDetector>
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

const styles = StyleSheet.create({
  cameraContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black"
  },
  photoShutter: {
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 10,
    width: 80,
    height: 80,
  },
  videoShutter: {
    borderRadius: "100%",
    padding: 10
  },
  videoShutterInner: {

  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 12,
    padding: 5
  },
  cameraControls: {
    position: "absolute",
    right: 15,
    backgroundColor: "rgba(0, 0, 0, .1)",
    borderRadius: 100,
    padding: 5
  },
  topControls: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    top: 0,
    paddingHorizontal: 15,
  },
  galleryContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 75,
    left: 45,
    backgroundColor: "rgba(0, 0, 0, .1)",
    padding: 5,
    borderRadius: 100
  }
})