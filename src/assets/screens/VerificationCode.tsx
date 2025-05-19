import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

const VerificationScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));

  // Tự động mở modal khi màn hình được render
  useEffect(() => {
    setModalVisible(true);
  }, []);

  // Hiệu ứng zoom out cho nút Login khi nhấn
  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify</Text>
      </View>

      {/* Modal Popup */}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.3}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {/* Verification Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: 'https://fra.cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/682a21e6001a5546d6cd/view?project=67ed5f5e00176f489872&mode=admin' }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.verificationText}>Regitered Successfully</Text>

          {/* Success Section */}
          <View style={styles.successContainer}>
            <Animatable.View
              animation="bounceIn"
              duration={1000}
              style={styles.checkmarkContainer}
            >
              <Text style={styles.checkmark}>✓</Text>
            </Animatable.View>
            <Text style={styles.successText}>Successful</Text>
            <Text style={styles.congratsText}>
              Congratulations, your account has been created.
            </Text>
            <Text style={styles.loginPrompt}>
              Please login to receive more discount information.
            </Text>
          </View>

          {/* Login Button với hiệu ứng zoom out */}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View style={[styles.loginButton, { transform: [{ scale: buttonScale }] }]}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backArrow: {
    fontSize: 24,
    color: '#1E90FF',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    height: '70%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D3C8A6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 50,
    height: 50,
  },
  verificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 40,
    color: '#fff',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  congratsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#8B5A2B',
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;