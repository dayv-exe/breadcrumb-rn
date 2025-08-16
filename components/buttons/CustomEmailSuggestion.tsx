import { StyleSheet, View } from "react-native";
import Spacer from "../Spacer";
import CustomButton from "./CustomButton";

type props = {
  inputVal: string
  setInputVal?: (val: string) => void
  useTheme?: boolean
}

const suggestions = [
  "@gmail.com",
  "@icloud.com",
]

export default function CustomEmailSuggestion({ inputVal, setInputVal, useTheme = false }: props) {

  const getEmailName = () => {
    const parts = inputVal.split("@")
    return parts[0]
  }

  return (
    <View style={styles.container}>
      <Spacer size="small" />
      <View style={styles.suggestionContainer}>
        {
          suggestions.map(text => (
            <View style={{ flexDirection: "row" }} key={text}>
              <CustomButton squashed handleClick={setInputVal ? () => {
                setInputVal(getEmailName() + text)
              } : () => { }} key={text} type={useTheme ? "theme-faded" : "faded"} labelText={text} />
              <Spacer size="small" />
            </View>
          ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  suggestionContainer: {
    width: "100%",
    flexDirection: "row"
  }
})