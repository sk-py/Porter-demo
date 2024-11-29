import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PorterCard from "@/components/PorterCard";
import socket from "@/utils/socket";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

export default function Admin() {
  const [activePorters, setActivePorters] = useState([]);

  useEffect(() => {
    // Emit admin connection
    socket.emit("admin-connect");

    // Listen for active porters when admin connects
    socket.on("activePorters", (data) => {
      console.log(data); // List of active porters (usernames)
      setActivePorters(data);
    });

    // Clean up on unmount
    return () => {
      socket.off("activePorters");
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "flex-start",
        width: Dimensions.get("window").width,
      }}
    >
      <View
        style={{
          padding: 12,
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={()=>router.push("/(auth)")} >
          <MaterialCommunityIcons name="logout" size={24} color={"red"} />
        </TouchableOpacity>

        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}>
          List of Ongoing Deliveries
        </Text>
      </View>
      <FlatList
        data={activePorters} // Use activePorters state here instead of orders
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: Dimensions.get("window").width * 0.94,
          gap: 12,
          padding: 4,
        }}
        renderItem={({ item }) => (
          <PorterCard
            id={item} // Assuming item is the username of the porter
            fromLocation="From Location" // Replace with actual data if available
            toLocation="To Location" // Replace with actual data if available
            status="in-transit" // Replace with actual data if available
            orderNumber="1234" // Replace with actual data if available
            name={item} // Use item as username for display
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No active porters</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

// import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
// import { useEffect, useState } from "react";

// import PorterCard from "@/components/PorterCard";

// import socket from "@/utils/socket";
// import { orders } from "@/utils/data";

// export default function Admin() {
//   const [activePorters, setActivePorters] = useState([]);

//   useEffect(() => {
//     socket.emit("admin-connect", { role: "admin" });
//     // Listen for active porters when admin connects
//     socket.on("activePorters", (data) => {
//       console.log(data); // List of active porters (usernames)
//       setActivePorters(data);
//     });

//     // Clean up on unmount
//     return () => {
//       socket.off("activePorters");
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         width: Dimensions.get("window").width,
//       }}
//     >
//       <View style={{ padding: 12 }}>
//         <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}>
//           List of ongoing deliveries
//         </Text>
//       </View>
//       <FlatList
//         data={orders}
//         style={{ flex: 1 }}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           width: Dimensions.get("window").width * 0.94,
//           gap: 12,
//           padding: 4,
//         }}
//         renderItem={({ item }) => {
//           return (
//             <PorterCard
//               id={item.id}
//               fromLocation={item.fromLocation}
//               toLocation={item.toLocation}
//               status={item.status}
//               orderNumber={item.orderNumber}
//               name={item.name}
//             />
//           );
//         }}
//       />
//     </View>
//   );
// }

// // import React, { useEffect, useState, useRef } from "react";
// // import { StyleSheet, View, Button } from "react-native";
// // import socket from "@/utils/socket";
// // import MapView, { Marker, Region } from "react-native-maps";

// // export default function Admin() {
// //   const [markers, setMarkers] = useState<any>(null);
// //   const [isTestMode, setIsTestMode] = useState(false);
// //   const mapRef = useRef<MapView>(null);

// //   // Initial base coordinates (Mumbai area)
// //   const [currentRegion, setCurrentRegion] = useState<Region>({
// //     latitude: 19.188688,
// //     longitude: 72.9757243,
// //     latitudeDelta: 0.1,
// //     longitudeDelta: 0.1,
// //   });

// //   // Socket listener for real location updates
// //   useEffect(() => {
// //     socket.on("updateLocation", (location) => {
// //       console.log("admin", location);
// //       setMarkers(location);
// //       updateMapRegion(location.cords.coords);
// //     });

// //     // Cleanup listener on component unmount
// //     return () => {
// //       socket.off("updateLocation");
// //     };
// //   }, []);

// //   // Function to update map region to keep marker centered
// //   const updateMapRegion = (coords: any) => {
// //     if (mapRef.current) {
// //       const newRegion = {
// //         latitude: coords.latitude,
// //         longitude: coords.longitude,
// //         latitudeDelta: 0.1, // Adjust these values to control zoom level
// //         longitudeDelta: 0.1,
// //       };

// //       // Animate to new region
// //       mapRef.current.animateToRegion(newRegion, 1000);
// //       setCurrentRegion(newRegion);
// //     }
// //   };

// //   // Test function to simulate linear location updates
// //   const startTestLocationUpdates = () => {
// //     setIsTestMode(true);

// //     // Initial base coordinates (Mumbai area)
// //     let baseLatitude = 19.188688;
// //     let baseLongitude = 72.9757243;

// //     // Direction vector for movement
// //     let movementStep = 0;
// //     const latitudeIncrement = 0.01;
// //     const longitudeIncrement = 0.02;

// //     const intervalId = setInterval(() => {
// //       movementStep++;

// //       // Calculate new coordinates with consistent movement
// //       const newLocation = {
// //         cords: {
// //           coords: {
// //             accuracy: 9.9350004196167,
// //             altitude: -43.500003814697266,
// //             altitudeAccuracy: 1.0328580141067505,
// //             heading: 0,
// //             latitude: baseLatitude + latitudeIncrement * movementStep,
// //             longitude: baseLongitude + longitudeIncrement * movementStep,
// //             speed: 0.01789616420865059,
// //           },
// //           mocked: true,
// //           timestamp: Date.now(),
// //         },
// //         id: "test-device",
// //       };

// //       console.log("Test Location Update:", newLocation);
// //       isTestMode && setMarkers(newLocation);
// //       updateMapRegion(newLocation.cords.coords);
// //     }, 2000); // 2-second intervals

// //     // Return a function to stop the updates
// //     return () => {
// //       clearInterval(intervalId);
// //       setIsTestMode(false);
// //     };
// //   };

// //   // Stop test updates function
// //   const stopTestLocationUpdates = () => {
// //     setIsTestMode(false);
// //     setMarkers(null);
// //   };

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <MapView
// //         ref={mapRef}
// //         style={{ height: "90%", width: "100%" }}
// //         initialRegion={currentRegion}
// //         region={currentRegion}
// //       >
// //         {markers && (
// //           <Marker
// //             coordinate={{
// //               latitude: markers?.cords.coords.latitude,
// //               longitude: markers?.cords.coords.longitude,
// //             }}
// //             title={isTestMode ? "Test Device" : "Device Location"}
// //             description={`Lat: ${markers?.cords.coords.latitude.toFixed(6)},
// //                          Lon: ${markers?.cords.coords.longitude.toFixed(6)}`}
// //           />
// //         )}
// //       </MapView>
// //       <View style={styles.buttonContainer}>
// //         {!isTestMode ? (
// //           <Button
// //             title="Start Test Updates"
// //             onPress={startTestLocationUpdates}
// //           />
// //         ) : (
// //           <Button
// //             title="Stop Test Updates"
// //             color="red"
// //             onPress={stopTestLocationUpdates}
// //           />
// //         )}
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   buttonContainer: {
// //     height: "10%",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: 10,
// //   },
// // });
