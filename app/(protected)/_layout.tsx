import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="GeoTracker" options={{ headerShown: false }} />
      <Stack.Screen name="Admin" options={{ headerShown: false }} />
    </Stack>
  );
}
