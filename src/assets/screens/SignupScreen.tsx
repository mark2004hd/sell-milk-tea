import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import sigupStyle from "../style/signupStyle";
import { LOCAL_IPV4_ADDRESS, PORT } from "@env";
import axios from "axios";

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  VerificationCode: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

export default function Signup({ navigation }: LoginProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);
  const [confirmVisibilityTimeout, setConfirmVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm validate email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm validate password
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    if (visibilityTimeout) {
      clearTimeout(visibilityTimeout);
    }
    setIsPasswordVisible(!isPasswordVisible);
    if (!isPasswordVisible) {
      const timeout = setTimeout(() => {
        setIsPasswordVisible(false);
      }, 1500);
      setVisibilityTimeout(timeout);
    }
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    if (confirmVisibilityTimeout) {
      clearTimeout(confirmVisibilityTimeout);
    }
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    if (!isConfirmPasswordVisible) {
      const timeout = setTimeout(() => {
        setIsConfirmPasswordVisible(false);
      }, 1500);
      setConfirmVisibilityTimeout(timeout);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Kiểm tra các trường rỗng
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Validate username
    if (trimmedUsername.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }
    if (trimmedUsername.length > 20) {
      Alert.alert("Error", "Username must not exceed 20 characters");
      setIsLoading(false);
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
      Alert.alert("Error", "Username can only contain letters, numbers, and underscores");
      setIsLoading(false);
      return;
    }

    // Validate email
    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Error", "Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Validate password
    if (!isValidPassword(trimmedPassword)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
      setIsLoading(false);
      return;
    }

    // Validate confirm password
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios({
        url: `http://${LOCAL_IPV4_ADDRESS}:${PORT}/zen8labs-system/api/v1/users`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      if (response.status === 200) {
        Alert.alert("Success", "Signup successful!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Signup failed", response.data.message || "Unknown error");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Error", "Invalid input data");
            break;
          case 409:
            Alert.alert("Error", "Username or email already exists");
            break;
          case 500:
            Alert.alert("Error", "Server error, please try again later");
            break;
          default:
            Alert.alert("Error", error.response.data.message || "Something went wrong");
        }
      } else if (error.request) {
        Alert.alert("Error", "Network error, please check your connection");
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={sigupStyle.container}>
      <ScrollView style={sigupStyle.scrollView}>
        <Text style={sigupStyle.header}>Sign up</Text>
        <Text style={sigupStyle.wellcome}>Welcome to Bee Coffee, create an account now!</Text>
        <Text style={sigupStyle.userName}>Username</Text>
        <View style={sigupStyle.input}>
          <Image
            style={sigupStyle.userNameigm}
            source={{
              uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/profile.png",
            }}
            resizeMode={"contain"}
          />
          <TextInput
            style={sigupStyle.textInputUserName}
            placeholder={"Enter username"}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={username ? "#000" : "#888"}
          />
        </View>
        <Text style={sigupStyle.Email}>Email</Text>
        <View style={sigupStyle.contactEmail}>
          <Image
            style={sigupStyle.Emailimg}
            source={{
              uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/user.png",
            }}
            resizeMode={"contain"}
          />
          <TextInput
            style={sigupStyle.textInputEmail}
            placeholder={"Enter Email address"}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={email ? "#000" : "#888"}
          />
        </View>
        <Text style={sigupStyle.titlePassword}>Password</Text>
        <View style={sigupStyle.ViewPassword}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/password.png",
            }}
            resizeMode={"stretch"}
            style={sigupStyle.passwordIGM1}
          />
          <TextInput
            placeholder={"Enter password"}
            style={sigupStyle.password}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={password ? "#000" : "#888"}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/eye.png",
              }}
              resizeMode={"stretch"}
              style={sigupStyle.eyeIMG}
            />
          </TouchableOpacity>
        </View>
        <Text style={sigupStyle.titlePassword}>Confirm Password</Text>
        <View style={sigupStyle.ViewPassword}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/password.png",
            }}
            resizeMode={"stretch"}
            style={sigupStyle.passwordIGM1}
          />
          <TextInput
            placeholder={"Confirm password"}
            style={sigupStyle.password}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor={confirmPassword ? "#000" : "#888"}
            secureTextEntry={!isConfirmPasswordVisible}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/eye.png",
              }}
              resizeMode={"stretch"}
              style={sigupStyle.eyeIMG}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSignup}
          style={[sigupStyle.ClickSignup, isLoading && { opacity: 0.6 }]}
          disabled={isLoading}
        >
          <Text style={sigupStyle.textSignup}>{isLoading ? "Signing up..." : "Sign up"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={sigupStyle.loginQickLy}>Login quickly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sigupStyle.signinGG} onPress={() => alert("Pressed!")}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/google.png",
            }}
            resizeMode={"stretch"}
            style={sigupStyle.siginIMG}
          />
          <Text style={sigupStyle.textSigin}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sigupStyle.siginTikTok} onPress={() => alert("Pressed!")}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/facebook.png",
            }}
            resizeMode={"stretch"}
            style={sigupStyle.sigintiktokIMG}
          />
          <Text style={sigupStyle.texttiktokSigin}>Sign in with TikTok</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 5,
            backgroundColor: "#191D31",
            borderRadius: 100,
            marginHorizontal: 120,
            paddingHorizontal: 30,
            paddingBottom: 30,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}