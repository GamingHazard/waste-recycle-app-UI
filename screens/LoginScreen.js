import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setTimeout(() => {
            navigation.replace("Main");
          }, 400);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const user = {
      email: email.toLowerCase(),
      password: password,
    };

    axios
      .post("https://waste-recycle-app-backend.onrender.com/login", user)
      .then((response) => {
        setLoading(false);
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.navigate("Main");
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Login error", "An error occurred while logging in.");
        console.log("error ", error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#547c5c" }}>
      <View style={{ marginTop: 50 }}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 150,
            height: 100,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
      </View>

      <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 25,
              color: "#fbfbda",
            }}
          >
            Login to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
              marginHorizontal: 10,
              backgroundColor: "white",
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="#4c7c54"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"black"}
              style={{
                color: "#4c7c54",
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Enter your Email"
              keyboardType="email-address" // Set email keyboard type
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
                marginHorizontal: 10,
                backgroundColor: "white",
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="#4c7c54"
              />
              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"black"}
                style={{
                  color: "#4c7c54",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                placeholder="Enter your Password"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#4c7c54"
                  style={{ marginRight: 8 }}
                />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
              marginHorizontal: 10,
            }}
          ></View>
        </View>

        <View style={{ marginTop: 45 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#fbfbda",
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 16,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#4c7c54" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "#4c7c54",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "#fbfbda" }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
