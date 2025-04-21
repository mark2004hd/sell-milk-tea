import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const scaleFont = (size: number) => {
  return size * (Dimensions.get('window').width / 375);
};

const scaleDimension = (size: number) => {
  return size * (Dimensions.get('window').width / 375);
};

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Product: { productId: string };
  Cart: undefined;
  CartScreen: undefined;
  OrderSuccess: undefined;
  OrderHistory: undefined;
  MainTabs: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "OrderHistory">;

const OrderHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { orderHistory } = useCart();

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderDate}>
        Ordered on: {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text style={styles.orderInfo}>
        Delivery Address: {item.address || 'Not provided'}
      </Text>
      <Text style={styles.orderInfo}>
        Phone Number: {item.phoneNumber || 'Not provided'}
      </Text>
      <FlatList
        data={item.items}
        renderItem={({ item: product }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productDescription}>
                {product.description} (Size: {product.size})
              </Text>
              <Text style={styles.productPrice}>
                {(product.price * product.quantity).toFixed(2)} USD (x{product.quantity})
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(product) => product.id}
      />
      <View style={styles.orderTotal}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{item.total.toFixed(2)} USD</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <Ionicons name="chevron-back" size={scaleFont(24)} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: scaleFont(24) }} />
      </View>
      <FlatList
        data={orderHistory}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders yet</Text>}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleDimension(15),
    paddingVertical: scaleDimension(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#333',
  },
  orderContainer: {
    padding: scaleDimension(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderDate: {
    fontSize: scaleFont(14),
    color: '#666',
    marginBottom: scaleDimension(10),
  },
  orderInfo: {
    fontSize: scaleFont(14),
    color: '#333',
    marginBottom: scaleDimension(5),
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: scaleDimension(10),
  },
  productImage: {
    width: scaleDimension(60),
    height: scaleDimension(60),
    borderRadius: scaleDimension(10),
    marginRight: scaleDimension(10),
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scaleDimension(5),
  },
  productDescription: {
    fontSize: scaleFont(12),
    color: '#666',
    marginBottom: scaleDimension(5),
  },
  productPrice: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: '#FF6347',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleDimension(10),
  },
  totalLabel: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#FF6347',
  },
  emptyText: {
    fontSize: scaleFont(16),
    color: '#666',
    textAlign: 'center',
    marginTop: scaleDimension(20),
  },
});

export default OrderHistoryScreen;