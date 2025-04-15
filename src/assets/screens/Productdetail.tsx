import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Dùng icon từ expo

const { width, height } = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x400' }} // Thay bằng URL ảnh của bạn
          style={styles.productImage}
          resizeMode="cover"
        />
        <Text style={styles.imageOverlayText}>厚平洋椰飲大滿貫</Text>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.productTitle}>厚平洋椰飲大滿貫</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ 4.6 (660 評價)</Text>
        </View>
        <Text style={styles.description}>
          半茶鮮奶茶、半咖啡奶，純椰奶青，一口喝得到多種風味。搭配濃濃奶香，濃郁椰香，適合喜歡多層次口感的人嘗試體驗。
        </Text>
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>10大好評 1.9萬好評 ❤️</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.favoriteText}>FAVORITE</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity and Price */}
        <View style={styles.quantityPriceContainer}>
          <Text style={styles.price}>¥16.60</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    height: height * 0.5, // Chiều cao hình ảnh responsive
  },
  productImage: {
    width: width,
    height: '100%',
  },
  imageOverlayText: {
    position: 'absolute',
    top: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#f1c40f',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  feedback: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: 14,
    color: '#e74c3c',
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  quantityPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#f0c14b',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductDetailsScreen;