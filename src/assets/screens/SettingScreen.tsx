import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define the navigation stack param list
type RootStackParamList = {
  Profile: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  Notification: undefined;
  Security: undefined;
  Language: undefined;
  LawAndPolicy: undefined;
  HelpAndSupport: undefined;
  Login: undefined;
};

// Define the props type for SettingsScreen
type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const SettingsScreen = ({ navigation }: Props) => {
  type SettingsItem = {
    name: string;
    icon: string;
    onPress: () => void;
    isLogout?: boolean;
    extraText?: string;
  };
  
  const settingsItems: SettingsItem[] = [
      { name: "Edit Profile", icon: "person-outline", onPress: () =>  Alert.alert("Xin chào") },
      { name: "Change Password", icon: "lock-closed-outline", onPress: () =>navigation.navigate("ChangePassword") },
      { name: "Notification", icon: "notifications-outline", onPress: () => navigation.navigate("Notification") },
      { name: "Security", icon: "shield-checkmark-outline", onPress: () => Alert.alert("Xin chào") },
      { name: "Language", icon: "globe-outline", extraText: "中文", onPress: () => Alert.alert("Xin chào") },
      { name: "Law and Policy", icon: "document-text-outline", onPress: () => Alert.alert("Xin chào") },
      { name: "Help and Support", icon: "help-circle-outline", onPress: () => navigation.navigate("HelpAndSupport") },
      { name: "Logout", icon: "log-out-outline", isLogout: true, onPress: () => navigation.replace("Login") },
    ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp(6)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={wp(6)} color="#000" />
        </TouchableOpacity>
      </View>

      {/* General Settings Section */}
      <Text style={styles.sectionTitle}>GENERAL SETTINGS</Text>
      {settingsItems.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.itemContainer}
          onPress={item.onPress}
        >
          <View style={styles.itemLeft}>
            <Icon
              name={item.icon}
              size={wp(6)}
              color={item.isLogout ? "#FF0000" : "#000"}
            />
            <Text
              style={[
                styles.itemText,
                item.isLogout && { color: "#FF0000" },
              ]}
            >
              {item.name}
            </Text>
          </View>
          <View style={styles.itemRight}>
            {item.extraText && (
              <Text style={styles.extraText}>{item.extraText}</Text>
            )}
            <Icon name="chevron-forward" size={wp(5)} color="#000" />
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#000",
  },
  sectionTitle: {
    fontSize: wp(4),
    color: "#666",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    fontWeight: "600",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: 1,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: wp(4.2),
    color: "#000",
    marginLeft: wp(4),
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  extraText: {
    fontSize: wp(4),
    color: "#666",
    marginRight: wp(2),
  },
});

export default SettingsScreen;