import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import Category from "../screens/Category";
import HomeScreen from "../screens/HomeScreen";

interface Promotion {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  tag?: string;
  tagColor?: string;
  product?: string;
}

const MyOrdersScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={styles.placeholderText}>Order</Text>
  </View>
);

const FavoritesScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={styles.placeholderText}>Favorites</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={styles.placeholderText}>Màn hình Hồ sơ</Text>
  </View>
);

const { width, height } = Dimensions.get("window");
const isTablet = width > 768;

const TopTab = createMaterialTopTabNavigator();

const TopTabs = ({ promotions }: { promotions: Promotion[] }) => {
  return (
    <TopTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        swipeEnabled: true,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: isTablet ? 18 : 16,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingBottom: height * 0.02,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#8B4513",
          height: 3,
          width: width * 0.2,
          marginLeft: width * 0.15,
        },
      }}
    >
      <TopTab.Screen
        name="Home"
        component={() => <HomeScreen />}
        options={{ tabBarStyle: { backgroundColor: "#fff" } }}
      />
      <TopTab.Screen
        name="Category"
        component={Category}
        options={{ tabBarStyle: { backgroundColor: "#fff" } }}
      />
    </TopTab.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const MainTabs = () => {
  const [currentTab, setCurrentTab] = useState("HomeTab");
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      {currentTab === "HomeTab" && (
        <View style={styles.headerContainer}>
          <Header />
        </View>
      )}
      <BottomTab.Navigator
        initialRouteName="HomeTab"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#8B4513",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff",
            paddingVertical: height * 0.01,
            height: height * 0.1,
          },
          tabBarLabelStyle: {
            fontSize: isTablet ? 14 : 12,
            paddingBottom: height * 0.005,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "HomeTab") {
              iconName = "home";
            } else if (route.name === "MyOrders") {
              iconName = "shopping-cart";
            } else if (route.name === "Favorites") {
              iconName = "heart";
            } else if (route.name === "Profile") {
              iconName = "user";
            } else {
              iconName = "circle";
            }

            return <Icon name={iconName} size={isTablet ? 30 : 24} color={color} />;
          },
        })}
      >
        <BottomTab.Screen
          name="HomeTab"
          component={() => <TopTabs promotions={promotions} />}
          options={{
            title: "Home",
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#8B4513" : "#888" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Home
              </Text>
            ),
          }}
          listeners={{
            tabPress: () => setCurrentTab("HomeTab"),
          }}
        />
        <BottomTab.Screen
          name="MyOrders"
          component={MyOrdersScreen}
          options={{
            title: "Orders",
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#8B4513" : "#888" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Orders
              </Text>
            ),
          }}
          listeners={{
            tabPress: () => setCurrentTab("MyOrders"),
          }}
        />
        <BottomTab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: "Favorites",
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#8B4513" : "#888" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Favorites
              </Text>
            ),
          }}
          listeners={{
            tabPress: () => setCurrentTab("Favorites"),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#8B4513" : "#888" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Profile
              </Text>
            ),
          }}
          listeners={{
            tabPress: () => setCurrentTab("Profile"),
          }}
        />
      </BottomTab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: height * 0.01,
  },
  placeholderText: {
    fontSize: isTablet ? 20 : 16,
    textAlign: "center",
  },
  tabLabel: {
    fontSize: isTablet ? 14 : 12,
    textAlign: "center",
  },
});

export default MainTabs;