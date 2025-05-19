import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const AddressSelectionScreen = () => {
  const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddressSelection'>>();
  const { onSave } = route.params || {};

  const [selectedAddress, setSelectedAddress] = useState<null | Address>(null);
  const [addressList, setAddressList] = useState<Address[]>([]);

  // Load addresses and selected address from AsyncStorage
  const loadAddresses = useCallback(async () => {
    try {
      const savedAddresses = await AsyncStorage.getItem('addresses');
      if (savedAddresses) {
        const parsedAddresses = JSON.parse(savedAddresses);
        setAddressList(parsedAddresses);

        const savedAddress = await AsyncStorage.getItem('selectedAddress');
        if (savedAddress) {
          const parsedSelected = JSON.parse(savedAddress);
          setSelectedAddress(parsedSelected);
        } else {
          const defaultAddress = parsedAddresses.find((addr: Address) => addr.isDefault);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          }
        }
      } else {
        // Initial address list if no data in AsyncStorage
        const initialAddresses: Address[] = [
          {
            id: '1',
            title: 'Bôm Hằng Vi Đam Mẹ',
            phoneNumber: '(+84) 987 730 280',
            addressLine1: 'Số Nhà 31, Ngõ 66 Hồ Tùng Mậu',
            addressLine2: 'Phường Mai Dịch, Quận Cầu Giấy, Hà Nội',
            isDefault: true,
          },
          {
            id: '2',
            title: 'Ma men',
            phoneNumber: '(+84) 987 730 280',
            addressLine1: 'Thôn An Đình',
            addressLine2: 'Xã An Thạnh, Huyện Tư Kỳ, Hải Dương',
            isDefault: false,
          },
        ];
        setAddressList(initialAddresses);
        const defaultAddress = initialAddresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
          await AsyncStorage.setItem('addresses', JSON.stringify(initialAddresses));
        }
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  }, []);

  // Reload addresses when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadAddresses();
    }, [loadAddresses])
  );

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleSave = async () => {
    if (!selectedAddress) {
      Alert.alert('Lỗi', 'Vui lòng chọn một địa chỉ trước khi lưu.');
      return;
    }

    try {
      // Update the isDefault status for the selected address
      const updatedAddresses = addressList.map((addr) =>
        addr.id === selectedAddress.id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
      );
      setAddressList(updatedAddresses);
      setSelectedAddress({ ...selectedAddress, isDefault: true });

      // Save to AsyncStorage
      await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddresses));
      await AsyncStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));

      // Pass the selected address back to the previous screen
      if (onSave) {
        const fullAddress = `${selectedAddress.addressLine1}, ${selectedAddress.addressLine2}`;
        onSave(fullAddress, selectedAddress.phoneNumber);
      }

      // Navigate back to CartScreen without alert
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save selected address:', error);
      Alert.alert('Lỗi', 'Không thể lưu địa chỉ. Vui lòng thử lại.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#ff4500" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn địa chỉ nhận hàng...</Text>
      </View>

      {/* Address List */}
      <View style={styles.addressList}>
        {addressList.map((address) => (
          <TouchableOpacity
            key={address.id}
            onPress={() => handleSelectAddress(address)}
            style={styles.addressItem}
          >
            <View style={styles.radioCircle}>
              {selectedAddress && selectedAddress.id === address.id && (
                <View style={styles.selectedDot} />
              )}
            </View>
            <View style={styles.addressDetails}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressTitle}>{address.title}</Text>
                <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditAddress', {
                      address,
                      onDelete: (addressId: string) => {
                        setAddressList((prev) => prev.filter((addr) => addr.id !== addressId));
                        if (selectedAddress?.id === addressId) {
                          setSelectedAddress(null);
                        }
                      },
                    })
                  }
                >
                  <Text style={styles.editButton}>Sửa</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressLine}>{address.addressLine1}</Text>
              <Text style={styles.addressLine}>{address.addressLine2}</Text>
              {address.isDefault && (
                <View style={styles.defaultTag}>
                  <Text style={styles.defaultTagText}>Mặc định</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add New Address Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('EditAddress', {
            address: {
              id: '',
              title: '',
              phoneNumber: '',
              addressLine1: '',
              addressLine2: '',
              isDefault: false,
            },
            isNewAddress: true,
          })
        }
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>Thêm Địa Chỉ Mới</Text>
      </TouchableOpacity>

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
  addressList: {
    padding: 10,
  },
  addressItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff4500',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#ff4500',
  },
  addressDetails: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    fontSize: 14,
    color: '#ff4500',
  },
  addressLine: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  defaultTag: {
    backgroundColor: '#ff4500',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  defaultTagText: {
    color: '#fff',
    fontSize: 12,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: 20,
    color: '#ff4500',
    marginRight: 5,
  },
  addButtonText: {
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

export default AddressSelectionScreen;