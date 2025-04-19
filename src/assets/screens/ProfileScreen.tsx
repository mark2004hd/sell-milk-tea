import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Định nghĩa kiểu cho navigation
type RootStackParamList = {
  Profile: undefined;
  Setting: undefined; // Đảm bảo tên này khớp với router
  Settings: undefined; // Added to match the navigation usage
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp(6)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="settings-outline" size={wp(6)} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/meo.jpg" }}
          style={styles.profilePic}
        />
      </View>

      {/* Username Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="person-outline"
            size={wp(5)}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
          />
        </View>
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="mail-outline"
            size={wp(5)}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(3),
  },
  headerTitle: {
    fontSize: wp(5.5),
    fontWeight: "bold",
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: hp(4),
  },
  profilePic: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
  },
  inputContainer: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: wp(4.2),
    color: "#333",
    marginBottom: hp(0.5),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp(2.5),
    paddingHorizontal: wp(2.5),
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    height: hp(5),
    fontSize: wp(4),
  },
  saveButton: {
    backgroundColor: "#d4b990",
    paddingVertical: hp(2),
    borderRadius: wp(6),
    alignItems: "center",
    marginTop: hp(3),
  },
  saveButtonText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontWeight: "bold",
  },
});

export default ProfileScreen;