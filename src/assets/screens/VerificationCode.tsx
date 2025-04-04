import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import verificationCodeStyle from "../style/styleVerification";

type RootStackParamList = {
  Signup: undefined;
  VerificationCode: undefined;
};

type VerificationCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, "VerificationCode">;

interface VerificationCodeProps {
  navigation: VerificationCodeScreenNavigationProp;
}

export default function VerificationCode({ navigation }: VerificationCodeProps) {
  // Tạo refs cho từng TextInput
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);
  const input5Ref = useRef<TextInput>(null);

  // Tạo state để quản lý giá trị của từng ô
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [code5, setCode5] = useState("");

  return (
    <SafeAreaView style={verificationCodeStyle.safeArea}>
      <ScrollView style={verificationCodeStyle.scrollView}>
        <View style={verificationCodeStyle.headerContainer}>
          <View style={verificationCodeStyle.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#191D31" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={verificationCodeStyle.headerText}>Verification</Text>
            </View>
          </View>
          <View style={verificationCodeStyle.divider}></View>
        </View>

        <Image
          source={{
            uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/Illustration.png",
          }}
          resizeMode="stretch"
          style={verificationCodeStyle.verificationImage}
        />

        <Text style={verificationCodeStyle.titleText}>Verification code</Text>

        <Text style={verificationCodeStyle.infoText}>
          We sent the information and verification code{"\n"}
          to someone's specified email address{"\n"}
        </Text>
        <Text style={verificationCodeStyle.mailText}>hawanzhjiangmian@mianmain.com</Text>

        <View style={verificationCodeStyle.codeContainer}>
          <View style={verificationCodeStyle.codeButton}>
            <TextInput
              ref={input1Ref}
              style={verificationCodeStyle.codeText}
              value={code1}
              onChangeText={(text) => {
                setCode1(text);
                if (text.length === 1) input2Ref.current?.focus();
              }}
              textAlign="center"
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => input2Ref.current?.focus()}
            />
          </View>
          <View style={verificationCodeStyle.codeButton}>
            <TextInput
              ref={input2Ref}
              style={verificationCodeStyle.codeText}
              value={code2}
              onChangeText={(text) => {
                setCode2(text);
                if (text.length === 1) {
                  input3Ref.current?.focus();
                } else if (text === "" && code1 !== "") {
                  input1Ref.current?.focus();
                }
              }}
              textAlign="center"
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => input3Ref.current?.focus()}
            />
          </View>
          <View style={verificationCodeStyle.codeButton}>
            <TextInput
              ref={input3Ref}
              style={verificationCodeStyle.codeText}
              value={code3}
              onChangeText={(text) => {
                setCode3(text);
                if (text.length === 1) {
                  input4Ref.current?.focus();
                } else if (text === "" && code2 !== "") {
                  input2Ref.current?.focus();
                }
              }}
              textAlign="center"
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => input4Ref.current?.focus()}
            />
          </View>
          <View style={verificationCodeStyle.codeButton}>
            <TextInput
              ref={input4Ref}
              style={verificationCodeStyle.codeText}
              value={code4}
              onChangeText={(text) => {
                setCode4(text);
                if (text.length === 1) {
                  input5Ref.current?.focus();
                } else if (text === "" && code3 !== "") {
                  input3Ref.current?.focus();
                }
              }}
              textAlign="center"
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => input5Ref.current?.focus()}
            />
          </View>
          <View style={verificationCodeStyle.emptyCodeBox}>
            <TextInput
              ref={input5Ref}
              style={verificationCodeStyle.codeText}
              value={code5}
              onChangeText={(text) => {
                setCode5(text);
                if (text === "" && code4 !== "") {
                  input4Ref.current?.focus();
                }
              }}
              textAlign="center"
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="done"
              onSubmitEditing={() => input5Ref.current?.blur()}
            />
          </View>
        </View>

        <TouchableOpacity
          style={verificationCodeStyle.confirmButton}
          onPress={() => alert(`Code: ${code1}${code2}${code3}${code4}${code5}`)}
        >
          <Text style={verificationCodeStyle.confirmText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={verificationCodeStyle.retryText}>
              Can't receive the authentication code?
            </Text>
            <Text style={verificationCodeStyle.retry}> Retry</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}