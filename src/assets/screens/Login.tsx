import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  AppState, // Thêm AppState
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
import signupStyle from "../style/signupStyle";
import loginStyle from "../style/styleLogin";

type RootStackParamList = {
  Introduce: undefined;
  Signup: undefined;
  Login: undefined;
  VerificationCode: undefined;
  HomeScreen: undefined;
  AuthCallback: { code?: string };
  MainTabs: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backPressCount, setBackPressCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);
  const [session, setSession] = useState<any>(null);

  // Xử lý nút back
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

  // Xử lý phiên đăng nhập và sự kiện xác thực
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        console.log("Phiên đăng nhập được tìm thấy khi tải ứng dụng:", session);
        navigation.replace("HomeScreen");
      } else {
        console.log("Không tìm thấy phiên đăng nhập khi tải ứng dụng.");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Trạng thái xác thực thay đổi:", event, session);
      setSession(session);
      if (event === "SIGNED_IN" && session) {
        console.log("Người dùng đăng nhập thành công:", session);
        navigation.replace("HomeScreen");
      } else if (event === "SIGNED_OUT") {
        console.log("Người dùng đã đăng xuất.");
      } else {
        console.log("Sự kiện xác thực khác:", event);
      }
    });

    // Lắng nghe AppState để phát hiện khi ứng dụng quay lại từ trình duyệt
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === "active") {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Phiên sau khi quay lại:", session);
          navigation.replace("HomeScreen");
        }
      }
    };
    const appStateSubscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription?.unsubscribe();
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
        await WebBrowser.openBrowserAsync(data.url); // Mở URL bằng WebBrowser
      }
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      alert("Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Lỗi đăng nhập:", error.message);
        alert("Đăng nhập thất bại: " + error.message);
        return;
      }

      console.log("Đăng nhập thành công:", data);
    } catch (error) {
      console.error("Lỗi không xác định:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
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