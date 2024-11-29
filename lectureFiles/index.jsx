import { View, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";

const index = () => {
  const [QrData, setQrData] = useState(Math.random().toString());

  const generateQr = () => {
    setQrData(Math.random().toString());
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        <QRCode value={QrData} size={160} />
        <Button title="Generate QR" onPress={generateQr} />
      </View>
    </SafeAreaView>
  );
};

export default index;
