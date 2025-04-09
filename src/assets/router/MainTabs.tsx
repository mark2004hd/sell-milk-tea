import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Header from '../components/Header'; // Import Header
import HomeScreen from '../screens/HomeScreen';
import Category from '../screens/Category';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Import Feather icons

// Placeholder components cho các tab khác
const MyOrdersScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>My Orders Screen</Text>
  </View>
);

const FavoritesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Favorites Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

// Tạo MaterialTopTabNavigator cho "Home" và "Category"
const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        swipeEnabled: true,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIndicatorStyle: { backgroundColor: '#8B4513', height: 3 }, // Gạch chân màu nâu
      }}
    >
      <TopTab.Screen name="Home" component={HomeScreen} />
      <TopTab.Screen name="Category" component={Category} />
    </TopTab.Navigator>
  );
};

// Tạo BottomTabNavigator
const BottomTab = createBottomTabNavigator();

const MainTabs = () => {
  const [currentTab, setCurrentTab] = useState('HomeTab'); // Theo dõi tab hiện tại

  return (
    <View style={{ flex: 1 }}>
      {/* Chỉ hiển thị Header khi ở tab "HomeTab" */}
      {currentTab === 'HomeTab' && <Header />}
      <BottomTab.Navigator
        initialRouteName="HomeTab"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#8B4513', // Màu nâu cho tab được chọn
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === 'HomeTab') {
              iconName = 'home'; // Biểu tượng ngôi nhà
            } else if (route.name === 'MyOrders') {
              iconName = 'shopping-cart'; // Biểu tượng giỏ hàng
            } else if (route.name === 'Favorites') {
              iconName = 'heart'; // Biểu tượng trái tim
            } else if (route.name === 'Profile') {
              iconName = 'user'; // Biểu tượng người dùng
            } else {
              iconName = 'circle'; // Biểu tượng mặc định (nếu cần)
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        // Theo dõi tab hiện tại khi người dùng chuyển tab
        // Removed invalid onTabPress prop
      >
        <BottomTab.Screen
          name="HomeTab"
          component={TopTabs}
          options={{ title: '首页', headerShown: false }}
          listeners={{
            tabPress: () => setCurrentTab('HomeTab'),
          }}
        />
        <BottomTab.Screen
          name="MyOrders"
          component={MyOrdersScreen}
          options={{ title: '我的订单', headerShown: false }}
          listeners={{
            tabPress: () => setCurrentTab('MyOrders'),
          }}
        />
        <BottomTab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: '最爱', headerShown: false }}
          listeners={{
            tabPress: () => setCurrentTab('Favorites'),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: '个人主页', headerShown: false }}
          listeners={{
            tabPress: () => setCurrentTab('Profile'),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

export default MainTabs;