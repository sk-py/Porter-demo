import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export const getUserLocationPermissions = () => {
  Location.requestForegroundPermissionsAsync()
    .then((status) => {
      if (!status.canAskAgain) {
        // Linking.openSettings();
        Alert.alert(
          "Location access required",
          "Precise Location access is required for marking geo-based attendance", //*  Alert with link to app permissions for allowing location based access
          [
            {
              text: "Allow",
              onPress: async () => {
                try {
                  await Linking.openSettings();
                } catch (error) {
                  console.log("Error opening settings:", error);
                }
              },
            },
          ]
        );
      }
    })
    .catch(() => {
      // setIsLoading(false);
      Alert.alert(
        "Location access required",
        "Precise Location access is required for marking geo-based attendance", //*  Alert with link to app permissions for allowing location based access
        [
          {
            text: "Allow",
            onPress: async () => {
              try {
                await Linking.openSettings();
              } catch (error) {
                console.log("Error opening settings:", error);
              }
            },
          },
        ]
      );
    });
};
