import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Product: { productId: string };
  Cart: undefined;
  CartScreen: undefined;
  OrderSuccess: undefined;
  OrderHistory: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'OrderSuccess'>;

const OrderSuccessScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [dashPositions, setDashPositions] = useState<number[]>([]); // Store positions of dashes
  const animationDuration = 7000; // Duration of the cart's animation
  const dashSpacing = 30; // Space between dashes
  const animatableRef = useRef<Animatable.View & View>(null); // Reference to the animated view

  const handleViewDetails = () => {
    navigation.navigate('OrderHistory');
  };

  // Track the cart's position and add dashes under the wheels
  useEffect(() => {
    let startTime: number | null = null;
    const totalDistance = 600; // Khoảng cách di chuyển của xe từ -300 đến 300
    const wheelOffsetLeft = -20; // Vị trí của bánh xe trái
    const wheelOffsetRight = 0; // Vị trí của bánh xe phải
  
    const addDash = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % animationDuration) / animationDuration; // Tiến độ từ 0 đến 1
      const cartPosition = -300 + progress * totalDistance; // Vị trí của xe từ -300 đến 300
  
      // Thêm dấu gạch nối ngay dưới bánh xe khi xe di chuyển
      setDashPositions((prevDashes) => {
        const newDashes: number[] = [];
  
        // Lặp qua các bánh xe và thêm dấu gạch nối khi xe di chuyển
        [wheelOffsetLeft, wheelOffsetRight].forEach((wheelOffset) => {
          const wheelPosition = cartPosition + wheelOffset;
  
          // Thêm dấu gạch nối mới khi vị trí của bánh xe thay đổi đáng kể
          // Kiểm tra xem dấu gạch nối có được thêm quá dày hay không
          if (Math.abs(wheelPosition - (prevDashes[prevDashes.length - 1] || -300)) >= dashSpacing) {
            newDashes.push(wheelPosition);
          }
        });
  
        // Nếu dấu gạch nối đã được thêm đủ, không thêm nữa
        if (newDashes.length === 0) return prevDashes;
  
        // Cập nhật danh sách dashes
        return [...prevDashes, ...newDashes];
      });
  
      // Reset dashes khi xe đến cuối và bắt đầu lại
      if (progress >= 0.99) {
        setDashPositions((prevDashes) => {
          // Giới hạn số lượng dashes để tránh dày đặc
          return prevDashes.slice(-10); // Giữ lại chỉ 10 dashes cuối cùng
        });
        startTime = timestamp; // Reset thời gian bắt đầu cho vòng mới
      }
  
      // Gọi lại frame tiếp theo
      requestAnimationFrame(addDash);
    };
  
    const animationFrame = requestAnimationFrame(addDash);
  
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/mark2004dev/img-api/master/img/MJ_20241115_142131.png',
        }}
        style={styles.successImage}
      />
      <Text style={styles.title}>Order placed successfully</Text>
      <Text style={styles.description}>
        Your order is being packed and is expected to be delivered to the specified address soon
      </Text>
      <TouchableOpacity style={styles.viewDetailsBtn} onPress={handleViewDetails}>
        <Text style={styles.btnText}>View order details</Text>
      </TouchableOpacity>

      {/* Icon giỏ hàng chạy qua với khói liên tục và đường kẻ */}
      <View style={styles.iconAnimationContainer}>
        <Animatable.View
          ref={animatableRef}
          animation={{
            from: { translateX: -300 },
            to: { translateX: 300 },
          }}
          duration={animationDuration}
          easing="ease-in-out"
          iterationCount="infinite"
          style={styles.iconContainer}
        >
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/00cc66/shopping-cart.png',
            }}
            style={styles.cartIcon}
          />
          <Text style={styles.iconText}>Order</Text>

          {/* Khói liên tục phía sau, dùng icon */}
          {[0, 1, 2].map((i) => (
            <Animatable.View
              key={`smoke-${i}`}
              animation={{
                from: { opacity: 0.8, translateX: 0, translateY: 0 },
                to: { opacity: 0, translateX: -120, translateY: -10 },
              }}
              duration={2500}
              delay={i * 600}
              iterationCount="infinite"
              style={[styles.iconSmoke, { top: 25 + i * 5 }]}
            >
              <Icon
                name="cloud"
                size={60}
                color="#bdc3c7"
                style={{ opacity: 0.5 }}
              />
            </Animatable.View>
          ))}

          {/* Smog dưới bánh xe, dùng icon */}
          {[0, 1].map((i) => (
            <Animatable.View
              key={`wheel-smog-${i}`}
              animation={{
                from: { opacity: 0.6, translateX: 0, translateY: 0 },
                to: { opacity: 0, translateX: -80, translateY: -5 },
              }}
              duration={2000}
              delay={i * 500}
              iterationCount="infinite"
              style={[styles.wheelSmog, { left: i === 0 ? -20 : 0 }]}
            >
              <Icon
                name="cloud"
                size={30}
                color="#95a5a6"
                style={{ opacity: 0.4 }}
              />
            </Animatable.View>
          ))}
        </Animatable.View>

        {/* Đường kẻ đứt đoạn xuất hiện ngay dưới bánh xe */}
        <View style={styles.trailContainer}>
          {dashPositions.map((position, index) => (
            <View
              key={`dash-${index}`}
              style={[styles.dash, { left: position }]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  successImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  viewDetailsBtn: {
    backgroundColor: '#d2b48c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  btnText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  iconAnimationContainer: {
    marginTop: 30,
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  cartIcon: {
    width: 40,
    height: 40,
  },
  iconText: {
    fontSize: 12,
    color: '#2c3e50',
    marginTop: 5,
  },
  iconSmoke: {
    position: 'absolute',
    left: -30,
    zIndex: -1,
  },
  wheelSmog: {
    position: 'absolute',
    top: 40,
    zIndex: -1,
  },
  trailContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dash: {
    width: 10,
    height: 4,
    backgroundColor: '#2c3e50',
    position: 'absolute',
    borderRadius: 2,
    opacity: 0.7,
  },
});

export default OrderSuccessScreen;