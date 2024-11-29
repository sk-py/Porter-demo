// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    // </ThemeProvider>
    // <Tabs>
    //   <Tabs.Screen
    //     name="GeoTracker"
    //     options={{
    //       title: "Delivery",
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <MaterialCommunityIcons
    //           name={focused ? "truck-delivery" : "truck-delivery-outline"}
    //           size={24}
    //           color={focused ? "#1575e2" : "grey"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="Admin"
    //     options={{
    //       title: "Map View",
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <MaterialCommunityIcons
    //           name="map-marker-path"
    //           size={24}
    //           color={focused ? "#1575e2" : "grey"}
    //         />
    //       ),
    //       freezeOnBlur: true,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="index"
    //     redirect={true}
    //     options={{
    //       href: null,
    //       title: "Qr Generation",
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <Ionicons
    //           name="qr-code"
    //           size={24}
    //           color={focused ? "#1575e2" : "grey"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="QrReader"
    //     redirect={true}
    //     options={{
    //       href: null,
    //       title: "Qr Reader",
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <Ionicons
    //           name="scan-outline"
    //           size={24}
    //           color={focused ? "#1575e2" : "grey"}
    //         />
    //       ),
    //       freezeOnBlur: true,
    //     }}
    //   />
    //   {/* <StatusBar style="auto" /> */}
    // </Tabs>

    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
}
