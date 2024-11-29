import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { BASE_URL } from "@/constants/configs";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [IsLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      const resData = await res.json();
      console.log(res.status + " = ", resData);
      // console.log(await res.text());

      if (res.status == 200) {
        // const response = resData;
        // const accessToken = resData.accesstoken;
        const role = resData.role;
        if (role == "admin") {
          await SecureStore.setItemAsync("role", "admin");
        } else {
          await SecureStore.setItemAsync("role", "porter");
        }
        await SecureStore.setItemAsync("username", resData.username)
        setIsLoading(false);
        if (resData.role == "admin") {
          router.replace("../(protected)/Admin");
        } else {
          router.replace("../(protected)/GeoTracker");
        }
        // console.log(accessToken);
        // SecureStore.setItemAsync("accessToken", accessToken);
        reset();
      }

      if (res.status == 404) {
        const msg = resData.error;
        console.log(msg);
      }
    } catch (error) {
      console.log("(auth)/index: Error while logging in", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);
    handleLogin(data);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flex: 1, backgroundColor: "#ffffff" }}
    >
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("@/assets/images/Actify-business.png")}
            style={{ objectFit: "contain", width: "50%", height: 100 }}
          />
          <Text style={{ fontWeight: "700", fontSize: 16, marginVertical: 8 }}>
            GeoTracker Sign In
          </Text>
        </View>
        <Text style={styles.label}>
          Username <Text style={{ color: "red" }}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="text"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter your username"
              placeholderTextColor={"grey"}
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && (
          <Text style={{ color: "red", marginLeft: 11, marginTop: 5 }}>
            Email is required
          </Text>
        )}
        <Text style={styles.label}>
          Password <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoComplete="current-password"
                secureTextEntry={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="*****"
                placeholderTextColor={"grey"}
              />
            )}
            name="password"
            rules={{ required: true }}
          />

          {/* <TouchableOpacity
            // onPress={handlePasswordVisibility}
            style={{ display: "flex", position: "absolute", right: "6%" }}
          >
            {isPasswordVisible ? (
              <Ionicons name="eye-off" size={24} color="#2e63a8" />
            ) : (
              <Ionicons name="eye" size={24} color="#2e63a8" />
            )}
          </TouchableOpacity> */}
        </View>
        {errors.password && (
          <Text style={{ color: "red", margin: 11, marginTop: 5 }}>
            Password is required
          </Text>
        )}
        {/* <TouchableOpacity
          onPress={() => {
            setRememberMe(!rememberMe);
          }}
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            justifyContent: "flex-start",
            maxWidth: "50%",
            // backgroundColor:"#474747"
          }}
        >
          {rememberMe ? (
            <Ionicons name="checkbox" size={20} />
          ) : (
            <Ionicons name="square-outline" size={20} />
          )}
          <Text style={{ textAlign: "left" }}>Remember me</Text>
        </TouchableOpacity> */}
        {/* <View style={{ display: "flex", alignItems: "flex-end", margin: 10 }}>
      ink>    <Link href={"./ForgotPassword"}>
            <Text style={{ color: "#0057da" }}>Forgot Password?</Text>
          </Link
        </View> */}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSubmit(onSubmit)}
          >
            {IsLoading ? (
              <ActivityIndicator size={"small"} color={"#1a90ff"} />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  padding: 2,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Text style={{ color: "#636d74" }}>
          Not signed up yet?{" "}
          <Link
            style={{ color: "#0057da", fontWeight: 700, fontSize: 15 }}
            href={"./SignUp"}
          >
            Register
          </Link>
        </Text>
      </View> */}
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
        }}
      ></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    margin: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loginBtn: {
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171825",
    width: "100%",
    padding: 8,
    marginTop: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 8,
    margin: 4,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderColor: "rgba(124, 124, 124, 0.27)",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
    color: "black",
    marginHorizontal: 10,
  },
});
