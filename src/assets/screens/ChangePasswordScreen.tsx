// ChangePasswordScreen.tsx
import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  ChangePassword: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "ChangePassword">;

const ChangePasswordScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Change Password Screen</Text>
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

export default ChangePasswordScreen;