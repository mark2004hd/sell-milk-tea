import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define the RootStackParamList based on your router.tsx
type RootStackParamList = {
  CartScreen: undefined;
  AddressSelection: { onSave: (address: string, phoneNumber: string) => void };
  Product: { productId: string };
  EditAddress: { address?: Address; onDelete?: (addressId: string) => void; isNewAddress?: boolean };
};

// Define the Address interface
interface Address {
  id: string;
  title: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  isDefault: boolean;
}

const EditAddressScreen = () => {
  const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditAddress'>>();
  const { address, onDelete, isNewAddress = false } = route.params || {};

  const [title, setTitle] = useState(isNewAddress ? '' : address?.title || '');
  const [phoneNumber, setPhoneNumber] = useState(isNewAddress ? '' : address?.phoneNumber || '');
  const [addressLine1, setAddressLine1] = useState(isNewAddress ? '' : address?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(isNewAddress ? '' : address?.addressLine2 || '');

  const validateInputs = () => {
    // Validate title
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Tên liên hệ không được để trống.');
      return false;
    }
    if (title.length < 2) {
      Alert.alert('Lỗi', 'Tên liên hệ phải có ít nhất 2 ký tự.');
      return false;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(title)) {
      Alert.alert('Lỗi', 'Tên liên hệ chỉ được chứa chữ cái, số và khoảng trắng.');
      return false;
    }

    // Validate phone number
    const phoneRegex = /^0\d{9}$/;
    if (!phoneNumber.trim()) {
      Alert.alert('Lỗi', 'Số điện thoại không được để trống.');
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Lỗi', 'Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số (VD: 0123456789).');
      return false;
    }

    // Validate addressLine1
    if (!addressLine1.trim()) {
      Alert.alert('Lỗi', 'Địa chỉ dòng 1 không được để trống.');
      return false;
    }
    if (addressLine1.length < 5) {
      Alert.alert('Lỗi', 'Địa chỉ dòng 1 phải có ít nhất 5 ký tự.');
      return false;
    }

    // Validate addressLine2
    if (!addressLine2.trim()) {
      Alert.alert('Lỗi', 'Địa chỉ dòng 2 không được để trống.');
      return false;
    }
    if (addressLine2.length < 5) {
      Alert.alert('Lỗi', 'Địa chỉ dòng 2 phải có ít nhất 5 ký tự.');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    // Perform validation
    if (!validateInputs()) {
      return;
    }

    try {
      const savedAddresses = await AsyncStorage.getItem('addresses');
      let addressList: Address[] = savedAddresses ? JSON.parse(savedAddresses) : [];

      if (isNewAddress) {
        // Create new address
        const newAddress: Address = {
          id: Date.now().toString(), // Generate unique ID
          title: title.trim(),
          phoneNumber: phoneNumber.trim(),
          addressLine1: addressLine1.trim(),
          addressLine2: addressLine2.trim(),
          isDefault: addressList.length === 0, // Set as default if it's the first address
        };
        addressList = [...addressList, newAddress];
      } else {
        // Update existing address
        addressList = addressList.map((addr) =>
          addr.id === address?.id
            ? { ...addr, title: title.trim(), phoneNumber: phoneNumber.trim(), addressLine1: addressLine1.trim(), addressLine2: addressLine2.trim() }
            : addr
        );

        // Update selected address if it's the current one
        const savedSelectedAddress = await AsyncStorage.getItem('selectedAddress');
        if (savedSelectedAddress) {
          const parsedSelected = JSON.parse(savedSelectedAddress);
          if (parsedSelected.id === address?.id) {
            await AsyncStorage.setItem(
              'selectedAddress',
              JSON.stringify({ ...parsedSelected, title: title.trim(), phoneNumber: phoneNumber.trim(), addressLine1: addressLine1.trim(), addressLine2: addressLine2.trim() })
            );
          }
        }
      }

      // Save updated address list to AsyncStorage
      await AsyncStorage.setItem('addresses', JSON.stringify(addressList));

      navigation.goBack();
    } catch (error) {
      console.error('Failed to save address:', error);
      Alert.alert('Lỗi', 'Không thể lưu địa chỉ. Vui lòng thử lại.');
    }
  };

  const handleDelete = async () => {
    if (!address) return;

    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa địa chỉ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              const savedAddresses = await AsyncStorage.getItem('addresses');
              let addressList: Address[] = savedAddresses ? JSON.parse(savedAddresses) : [];

              const updatedAddresses = addressList.filter((addr) => addr.id !== address.id);
              await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddresses));

              // If the deleted address was the default, clear the selected address
              const savedSelectedAddress = await AsyncStorage.getItem('selectedAddress');
              if (savedSelectedAddress) {
                const parsedSelected = JSON.parse(savedSelectedAddress);
                if (parsedSelected.id === address.id) {
                  await AsyncStorage.removeItem('selectedAddress');
                }
              }

              if (onDelete) {
                onDelete(address.id);
              }

              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete address:', error);
              Alert.alert('Lỗi', 'Không thể xóa địa chỉ. Vui lòng thử lại.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#ff4500" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isNewAddress ? 'Thêm địa chỉ mới' : 'Chỉnh sửa địa chỉ'}</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Tên liên hệ</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập tên liên hệ"
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Nhập số điện thoại (VD: 0123456789)"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Địa chỉ 1</Text>
        <TextInput
          style={styles.input}
          value={addressLine1}
          onChangeText={setAddressLine1}
          placeholder="Nhập địa chỉ dòng 1"
        />

        <Text style={styles.label}>Địa chỉ 2</Text>
        <TextInput
          style={styles.input}
          value={addressLine2}
          onChangeText={setAddressLine2}
          placeholder="Nhập địa chỉ dòng 2"
        />
      </View>

      {/* Delete Button (only for existing addresses) */}
      {!isNewAddress && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Xóa địa chỉ</Text>
        </TouchableOpacity>
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  form: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff4500',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#ff4500',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#ff4500',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditAddressScreen;