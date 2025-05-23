import { LOCAL_IPV4_ADDRESS, PORT } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { supabase } from "../config/Supabase/SupabaseClient";
import { useAudio } from "../context/AudioContext"; // Import useAudio
import signupStyle from "../style/signupStyle";
import loginStyle from "../style/styleLogin";

type RootStackParamList = {
  Introduce: undefined;
  Signup: undefined;
  Login: undefined;
  VerificationCode: undefined;
  MainTabs: undefined; // Sửa từ HomeScreen thành MainTabs
  AuthCallback: { code?: string };
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState("dotuan");
  const [password, setPassword] = useState("112233");
  const [backPressCount, setBackPressCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);
  const [session, setSession] = useState<any>(null);

  const { startMusicAfterLogin } = useAudio(); // Lấy hàm phát nhạc từ context

  useEffect(() => {
    const backAction = () => {
      const currentRoute = navigation.getState()?.routes[navigation.getState().index].name;
      if (currentRoute !== "Login") return false;

      if (backPressCount === 0) {
        setBackPressCount(1);
        setTimeout(() => setBackPressCount(0), 2000);
        return true;
      } else if (backPressCount === 1) {
        setModalVisible(true);
        setBackPressCount(2);
        setTimeout(() => {
          setModalVisible(false);
          setBackPressCount(0);
        }, 3500);
        return true;
      } else if (backPressCount === 2) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [backPressCount, navigation]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
       
        navigation.replace("MainTabs"); // Sửa từ HomeScreen thành MainTabs
      } else {
        console.log("Không tìm thấy phiên đăng nhập khi tải ứng dụng.");
      }
    });

    
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === "active") {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Phiên sau khi quay lại:", session);
          navigation.replace("MainTabs"); // Sửa từ HomeScreen thành MainTabs
        }
      }
    };
    const appStateSubscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
     
      appStateSubscription.remove();
    };
  }, [navigation]);

  const handleExit = () => {
    setModalVisible(false);
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setModalVisible(false);
    setBackPressCount(0);
  };

  const togglePasswordVisibility = () => {
    if (visibilityTimeout) clearTimeout(visibilityTimeout);
    setIsPasswordVisible(!isPasswordVisible);
    if (!isPasswordVisible) {
      const timeout = setTimeout(() => setIsPasswordVisible(false), 1500);
      setVisibilityTimeout(timeout);
    }
  };

  const handleGoogleSignIn = async () => {
    const WebBrowser = require("expo-web-browser");
    try {
      console.log("Bắt đầu đăng nhập Google...");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "sell-milk-tea://auth-callback",
          scopes: "email",
        },
      });
      if (error) {
        console.error("Lỗi OAuth Supabase:", error.message);
        throw error;
      }
      console.log("Đăng nhập Google thành công:", data);
      if (data.url) {
        await WebBrowser.openBrowserAsync(data.url);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      alert("Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${LOCAL_IPV4_ADDRESS}:${PORT}/zen8labs-system/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, // Giả sử 'email' chứa giá trị tên đăng nhập
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        Alert.alert("Login Failed", errorData.message || "Invalid credentials");
        return;
      }

      const data = await response.json();
      console.log("Login success:", data);
      navigation.replace("MainTabs");

      // Sau khi đăng nhập thành công, gọi hàm để phát nhạc từ context
      startMusicAfterLogin();

      // 👇 Lưu token vào AsyncStorage
      // await AsyncStorage.setItem("accessToken", data.accessToken);

    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={loginStyle.container}>
      <ScrollView style={loginStyle.scrollView}>
        <Text style={loginStyle.header}>Login</Text>
        <Text style={loginStyle.wellcome}>Welcome to Bee Coffee, login to your account!</Text>
        <Text style={loginStyle.Email}>Email</Text>
        <View style={loginStyle.contactEmail}>
          <Image
            style={loginStyle.Emailimg}
            source={{ uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/user.png" }}
            resizeMode={"contain"}
          />
          <TextInput
            style={loginStyle.textInputEmail}
            placeholder={"Enter Email address or Username"}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={email ? "#000" : "#888"}
          />
        </View>
        <Text style={loginStyle.titlePassword}>Password</Text>
        <View style={loginStyle.ViewPassword}>
          <Image
            source={{ uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/password.png" }}
            resizeMode={"stretch"}
            style={loginStyle.passwordIGM1}
          />
          <TextInput
            placeholder={"Enter password"}
            style={loginStyle.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={password ? "#000" : "#888"}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={{ uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/eye.png" }}
              resizeMode={"stretch"}
              style={loginStyle.eyeIMG}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin} style={loginStyle.ClickLogin}>
          <Text style={loginStyle.textLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={signupStyle.loginQickLy}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={loginStyle.signinGG} onPress={handleGoogleSignIn}>
          <Image
            source={{ uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/google.png" }}
            resizeMode={"stretch"}
            style={loginStyle.siginIMG}
          />
          <Text style={loginStyle.textSigin}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={loginStyle.siginTikTok} onPress={() => alert("Pressed!")}>
          <Image
            source={{ uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/facebook.png" }}
            resizeMode={"stretch"}
            style={loginStyle.sigintiktokIMG}
          />
          <Text style={loginStyle.texttiktokSigin}>Sign in with TikTok</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={handleCancel}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thoát ứng dụng</Text>
          <Text style={styles.modalMessage}>Bạn có chắc chắn muốn thoát không?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
              <Text style={styles.buttonText}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  cancelButton: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  exitButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
