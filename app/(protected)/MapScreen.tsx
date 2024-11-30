// import { Image, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import MapView, { Marker } from "react-native-maps";
// import socket from "@/utils/socket";

// const MapScreen = () => {
//   const [markers, setMarkers] = useState<any>(null);

//   const requestPorterCoords = (username: string) => {
//     socket.emit("requestPorterCoords", username);

//     // Listen for specific porter's coordinates
//     socket.on("porterCoords", ({ username, coords }) => {
//       console.log(`Coordinates for ${username}:`, coords);
//       // Here you can navigate to the MapScreen or update state to show on map
//       // For example:
//       // navigation.navigate('MapScreen', { coords });
//     });
//   };

//   useEffect(() => {
//     socket.on("updateLocation", (location) => {
//       console.log("admin", location);
//       setMarkers(location);
//     });

//     return () => {
//       socket.off("updateLocation");
//     };
//   }, []);

//   return (
//     <View>
//       <MapView  style={{ height: "100%", width: "100%" }}>
//         {markers && (
//           <Marker
//             coordinate={{
//               latitude: markers?.coords.coords.latitude,
//               longitude: markers?.coords.coords.longitude,
//             }}
//             image={require("@/assets/images/porter-mid.png")}
//           />
//         )}
//           </MapView>
//           {/* <Image source={require("@/assets/images/porter.png")} style={{width:100,height:100}} /> */}
//     </View>
//   );
// };

// export default MapScreen;

// import { View } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import MapView, { Marker, AnimatedRegion } from "react-native-maps";
// import socket from "@/utils/socket";
// import { useGlobalSearchParams } from "expo-router";

// const MapScreen = () => {
//   const [markerCoords, setMarkerCoords] = useState(null);
//     const mapRef = useRef(null); // Reference to the MapView

//     const params = useGlobalSearchParams()
//     console.log(params);

//   const requestPorterCoords = (username) => {
//     socket.emit("requestPorterCoords", username);

//     // Listen for specific porter's coordinates
//     socket.on("porterCoords", ({ username, coords }) => {
//       console.log(`Coordinates for ${username}:`, coords);
//       // Update marker coordinates
//       setMarkerCoords(coords);
//     });
//   };

//   useEffect(() => {
//     socket.on("updateLocation", (location) => {
//       console.log("admin", location);
//       const newCoords = location.coords.coords; // Extracting the coordinates
//       setMarkerCoords(newCoords);

//       // Adjust the map view to center on the new coordinates
//       if (mapRef.current) {
//         mapRef.current.animateToRegion(
//           {
//             latitude: newCoords.latitude,
//             longitude: newCoords.longitude,
//             latitudeDelta: 0.005, // Adjust as needed for zoom level
//             longitudeDelta: 0.005, // Adjust as needed for zoom level
//           },
//           1000 // Animation duration in milliseconds
//         );
//       }
//     });

//     return () => {
//       socket.off("updateLocation");
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         ref={mapRef} // Set ref for MapView
//         style={{ height: "100%", width: "100%" }}
//         initialRegion={{
//           latitude: markerCoords ? markerCoords.latitude : 18.941159, // Default starting latitude
//           longitude: markerCoords ? markerCoords.longitude : 72.8374066, // Default starting longitude
//           latitudeDelta: 0.005,
//           longitudeDelta: 0.005,
//         }}
//       >
//         {markerCoords && (
//           <Marker
//             coordinate={{
//               latitude: markerCoords.latitude,
//               longitude: markerCoords.longitude,
//             }}
//             image={require("@/assets/images/porter-mid.png")}
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default MapScreen;

import { Alert, Dimensions, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import socket from "@/utils/socket";
import { router, useGlobalSearchParams } from "expo-router";

const MapScreen = () => {
  const [markerCoords, setMarkerCoords] = useState(null);
  const mapRef = useRef(null); // Reference to the MapView
  const params = useGlobalSearchParams();

  const requestPorterCoords = (username) => {
    socket.emit("requestPorterCoords", username);
  };

  const initial = {
    latitude: markerCoords ? markerCoords.coords.latitude : 18.941159, // Default starting latitude
    longitude: markerCoords ? markerCoords.coords.longitude : 72.8374066, // Default starting longitude
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    // Request coordinates for the specific porter
    requestPorterCoords(params.username);

    // Listen for specific porter's coordinates
    socket.on("porterCoords", ({ username, coords }) => {
      console.log(`Coordinates for ${username}:`, coords, "Params:", params);
      // Update marker coordinates
      if (params.username == username) {
        setMarkerCoords(coords);

        // Adjust the map view to center on the new coordinates
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: coords.coords.latitude,
              longitude: coords.coords.longitude,
              latitudeDelta: 0.005, // Adjust as needed for zoom level
              longitudeDelta: 0.005, // Adjust as needed for zoom level
            },
            1000 // Animation duration in milliseconds
          );
        }
      }
    });

    socket.on("activePorters", (data: []) => {
      if (!data.includes(params.username)) {
        setMarkerCoords(null);
        Alert.alert("", `${params.username} logged out!`, [
          { text: "OK", onPress: () => router.replace("/(protected)/Admin") },
        ]);
      }
    });

    return () => {
      socket.off("porterCoords"); // Clean up listener on unmount
      socket.off("activePorters");
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        width: Dimensions.get("window").width,
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: 5,
          zIndex: 5,
          backgroundColor: "#FFFFFF",
          width: "90%",
          marginHorizontal: "5%",
          padding: 8,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 20 }}>Porter name: {params.username}</Text>
      </View>
      {initial && (
        <MapView
          ref={mapRef} // Set ref for MapView
          style={{ height: "100%", width: "100%" }}
          initialRegion={initial}
        >
          {markerCoords && (
            <Marker
              coordinate={{
                latitude: markerCoords.coords.latitude,
                longitude: markerCoords.coords.longitude,
              }}
              image={require("@/assets/images/porter-mid.png")}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;
