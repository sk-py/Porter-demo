import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import socket from "@/utils/socket";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

interface OrderCardProps {
  id: string;
  name: string;
  orderNumber: string;
  fromLocation: string;
  toLocation: string;
  status: "pending" | "in-transit" | "delivered";
}

const OrderCard = ({
  id,
  name,
  orderNumber,
  fromLocation,
  toLocation,
  status,
}: OrderCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/MapScreen", params: { username: name } })
      }
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={24}
            color="#6366F1"
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderLabel}>Order #</Text>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Location Section */}
      <View style={styles.locationContainer}>
        {/* From Location */}
        <View style={styles.locationPoint}>
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>From</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {fromLocation}
            </Text>
          </View>
        </View>

        {/* Connection Line */}
        <View style={styles.connectionLine}>
          <MaterialCommunityIcons
            name="truck-fast-outline"
            size={24}
            color="#6366F1"
            style={styles.vehicleIcon}
          />
        </View>

        {/* To Location */}
        <View style={styles.locationPoint}>
          <View style={styles.dotContainer}>
            <View style={[styles.dot, styles.destinationDot]} />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>To</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {toLocation}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#696969",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  orderNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 4,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  locationContainer: {
    marginTop: 8,
  },
  locationPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  dotContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6366F1",
    borderWidth: 2,
    borderColor: "#C7D2FE",
  },
  destinationDot: {
    backgroundColor: "#DC2626",
    borderColor: "#FEE2E2",
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  connectionLine: {
    position: "absolute",
    left: 11,
    top: 24,
    width: 2,
    height: 40,
    backgroundColor: "#E5E7EB",
    zIndex: -1,
  },
  vehicleIcon: {
    position: "absolute",
    left: -11,
    top: 8,
    backgroundColor: "#FFFFFF",
    padding: 4,
  },
});

export default OrderCard;
