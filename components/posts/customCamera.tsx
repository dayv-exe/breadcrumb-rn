
import { showSettingsAlert } from "@/utils/helpers";
import { SafeAreaView, StyleSheet } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import CustomLabel from "../CustomLabel";
import CustomButton from "../buttons/CustomButton";

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
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
        <CustomLabel textAlign="center" labelText="🔐" fontSize={21} />
        <CustomLabel width={"80%"} labelText={`Allow ${missingPermissions.join(" and ")} access to start creating.`} textAlign="center" />
        <CustomButton type="less-vibrant-text" labelText="Grant Permissions" handleClick={requestPerms} />
      </SafeAreaView>
    )
  }

  if (device == null) return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
      <CustomLabel textAlign="center" labelText="🤔" fontSize={21} />
      <CustomLabel width={"80%"} labelText="it appears that this device does not have a camera." textAlign="center" />
    </SafeAreaView>
  )

  return (
    <Camera photo video style={StyleSheet.absoluteFill} device={device} isActive={true} />
  )
}