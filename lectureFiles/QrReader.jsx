import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QrReader() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setscannedData] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#0672ee",
            width: "50%",
            marginHorizontal: "auto",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            borderRadius: 8,
          }}
          onPress={requestPermission}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
            Grant permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {!scannedData ? (
        <CameraView
          onBarcodeScanned={(result) => {
            setscannedData(result.data);
          }}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View
          style={[styles.container, { alignItems: "center", width: "100%", gap:32 }]}
        >
          <Text style={{ textAlign: "center" }}>{scannedData}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#0672ee",
              width: "50%",
              marginHorizontal: "auto",
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
                borderRadius: 8,
             
            }}
            onPress={() => setscannedData(null)}
          >
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              Okay
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
