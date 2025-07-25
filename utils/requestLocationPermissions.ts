import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';

export const requestLocationPermissionLoop = async (): Promise<boolean> => {
  let granted = false;

  while (!granted) {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      granted = true;
      return true;
    }

    if (!canAskAgain) {
      Alert.alert(
        'Location Permission Denied',
        'Go to settings to enable location access.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: openSettings },
        ]
      );
      return false;
    }

    // Loop will retry
  }

  return false;
};


export const openSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};


