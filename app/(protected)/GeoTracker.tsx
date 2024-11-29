import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getUserLocationPermissions } from "@/utils/helpers";
import socket from "@/utils/socket";

import * as Location from "expo-location";
import { getItemAsync } from "expo-secure-store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

interface userData {
  username: string | null;
  role: string | null;
}

export default function GeoTracker() {
  const [coords, setCoords] = useState<Location.LocationObject>();
  const [userData, setUserData] = useState<userData>();
  const [inTransit, setInTransit] = useState(false);

  const getUserData = async () => {
    const role = await getItemAsync("role");
    const username = await getItemAsync("username");
    setUserData({
      username,
      role,
    });
  };

  const getCoords = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const LocationEnabled = await Location.hasServicesEnabledAsync();

    const { remove } = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
      },
      (location) => {
        setCoords(location);
      }
    );
    if (!LocationEnabled) {
      // setIsLoading(false);
      while (!LocationEnabled) {
        await Location.enableNetworkProviderAsync().catch(() => {
          Alert.alert(
            "Location Access Required",
            "Enable Location to mark attendance"
          ); //* Google based dialog prompting user for turning on location services
        });
      }
    }

    if (status == "denied") {
      // setIsLoading(false);
      Alert.alert(
        "Alert",
        "Precise Location access is required for marking geo-based attendance", //*  Alert with link to app permissions for allowing location based access
        [
          {
            text: "Allow",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
    return remove;
  };

  const handleLogout = () => {
    socket.emit("disconnected-porter", { username: userData?.username, id: socket.id })
    setInTransit(false)
    router.replace("/(auth)")
  }

  useEffect(() => {
    if (inTransit) {
      socket.emit("location", {
        role: userData?.role,
        username: userData?.username,
        coords,
      });
    }

  }, [coords]);

  useEffect(() => {
    getUserLocationPermissions();
    if (inTransit) {
      const remove = getCoords();
    }
    getUserData();
  }, [inTransit]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor:"#FFFFFF" }}>
      <TouchableOpacity
        style={{
          width: "50%",
          marginHorizontal: "auto",
          backgroundColor: "#0b67f1",
          padding: 6,
          borderRadius: 6,
        }}
        onPress={() => setInTransit(!inTransit)}
      >
        <Text style={{ textAlign: "center", color: "#FFFFFF" }}>
          {!inTransit ? "Start" : "End"} delivery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "40%",
          marginHorizontal: "auto",
          backgroundColor: "#ffffff",
          padding: 6,
          borderRadius: 6,
          position: "absolute",
          top: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap:4
        }}
        onPress={handleLogout}
      >
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color="red"
          />
        <Text style={{color: "#ff0000" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
