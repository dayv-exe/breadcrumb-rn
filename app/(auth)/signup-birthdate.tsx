import CustomButton from "@/components/buttons/CustomButton";
import CustomLabel from "@/components/CustomLabel";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function BirthdateScreen() {
  const [birthdate, setBirthdate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter()

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setBirthdate(currentDate ?? new Date());
    setShowPicker(false)
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? 'padding' : "height"}
      keyboardVerticalOffset={100}>
      <Spacer />
      <Text style={styles.text}>Step 2 of 4</Text>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scroll}>
        <Spacer />
        <View style={{ width: "100%" }}>
          <CustomLabel labelText="Birthdate:" bold />
          <CustomButton labelText={birthdate.toLocaleDateString()} type="faded" handleClick={handleShowPicker} />
          <CustomLabel labelText="only you can see this" />
        </View>
        <Spacer />
        {(Platform.OS === "ios" || showPicker) && <DateTimePicker
          testID="dateTimePicker"
          value={birthdate}
          mode="date"
          onChange={onChange}
          display="spinner"
          themeVariant="dark"
        />}
      </ScrollView>

      <View style={styles.buttonView}>
        <CustomButton type="prominent" labelText="Next" />
        <Spacer />
        <Spacer />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.vibrantBackground,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    width: "100%"
  },
  scroll: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 100,
    height: 100
  },
  buttonView: {
    width: "80%",
  },
  text: {
    color: "#fff",
    opacity: .6,
    fontWeight: "700"
  }
})