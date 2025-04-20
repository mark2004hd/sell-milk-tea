import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
    Linking,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../router/router";

type Props = NativeStackScreenProps<RootStackParamList, "HelpAndSupport">;

const HelpAndSupportScreen = ({ navigation }: Props) => {
  type HelpItem = {
    name: string;
    icon: string;
    onPress: () => void;
  };

  const helpItems: HelpItem[] = [
    {
      name: "Customer Services",
      icon: "headset-outline",
      onPress: () => {
        // Thay thế bằng số điện thoại hoặc email hỗ trợ thực tế
        Linking.openURL("tel:0987730280");
      },
    },
    {
      name: "WhatsApp",
      icon: "logo-whatsapp",
      onPress: () => {
        // Thay thế bằng link WhatsApp thực tế
        Linking.openURL("https://wa.me/1234567890");
      },
    },
    {
      name: "Website",
      icon: "globe-outline",
      onPress: () => {
        // Thay thế bằng URL website thực tế
        Linking.openURL("https://www.example.com");
      },
    },
    {
      name: "Facebook",
      icon: "logo-facebook",
      onPress: () => {
        // Thay thế bằng URL Facebook thực tế
        Linking.openURL("https://www.facebook.com/profile.php?id=61575121994495");
      },
    },
    {
      name: "Twitter",
      icon: "logo-twitter",
      onPress: () => {
        // Thay thế bằng URL Twitter thực tế
        Linking.openURL("https://www.twitter.com");
      },
    },
    {
      name: "Instagram",
      icon: "logo-instagram",
      onPress: () => {
        // Thay thế bằng URL Instagram thực tế
        Linking.openURL("https://www.instagram.com");
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp(6)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: wp(6) }} /> {/* Placeholder để căn giữa tiêu đề */}
      </View>

      {/* Help Items */}
      {helpItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={item.onPress}
        >
          <View style={styles.itemLeft}>
            <Icon name={item.icon} size={wp(6)} color="#000" />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
          <Icon name="chevron-forward" size={wp(5)} color="#000" />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#000",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
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
});

export default HelpAndSupportScreen;