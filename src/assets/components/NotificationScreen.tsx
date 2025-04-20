// NotificationScreen.tsx
import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../router/router" // Nhập type từ tệp type chung

type Props = NativeStackScreenProps<RootStackParamList, "Notification">;

const NotificationScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notification Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NotificationScreen;