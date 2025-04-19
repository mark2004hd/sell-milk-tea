import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import Category from "../screens/CategoryCreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen"; // Import đúng ProfileScreen
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/CartScreen";

interface Promotion {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  tag?: string;
  tagColor?: string;
  product?: string;
}

const MyOrdersScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={styles.placeholderText}>Đơn hàng</Text>
  </View>
);

const FavoritesScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={styles.placeholderText}>Yêu thích</Text>
  </View>
);

const { width, height } = Dimensions.get("window");
const isTablet = width > 768;

// Static component to avoid inline function warning
const HomeScreenComponent = () => <HomeScreen />;

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
        component={HomeScreenComponent}
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

// Static component for HomeTab
const HomeTabComponent = ({ promotions }: { promotions: Promotion[] }) => (
  <TopTabs promotions={promotions} />
);

const BottomTab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  // Animated value to track the active tab index
  const animatedValue = React.useRef(new Animated.Value(state.index)).current;

  // Animate the value when the tab index changes
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: state.index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        // Create animated values for scale and shadow
        const inputRange = state.routes.map((_, i) => i);
        const scale = animatedValue.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1.2 : 1)),
          extrapolate: "clamp",
        });
        const shadowOpacity = animatedValue.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 0.3 : 0)),
          extrapolate: "clamp",
        });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === "HomeTab") iconName = "home";
        else if (route.name === "MyOrders") iconName = "shopping-cart";
        else if (route.name === "Favorites") iconName = "heart";
        else if (route.name === "Profile") iconName = "user";
        else iconName = "circle";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <Animated.View
              style={[
                {
                  transform: [{ scale }],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity,
                  shadowRadius: 4,
                  elevation: isFocused ? 5 : 0, // Android elevation
                },
                Platform.OS === "ios" && { overflow: "visible" }, // Ensure shadow is visible on iOS
              ]}
            >
              <Icon
                name={iconName}
                size={isTablet ? 30 : 24}
                color={isFocused ? "#8B4513" : "#888"}
              />
            </Animated.View>
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? "#8B4513" : "#888" },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
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
        }}
      >
        <BottomTab.Screen
          name="HomeTab"
          options={{
            title: "Home",
          }}
          listeners={{
            tabPress: () => setCurrentTab("HomeTab"),
          }}
        >
          {() => <HomeTabComponent promotions={promotions} />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="MyOrders"
          options={{
            title: "Order",
          }}
          listeners={{
            tabPress: () => setCurrentTab("MyOrders"),
          }}
        >
          {() => <CartScreen />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="Favorites"
          options={{
            title: "Favorites",
          }}
          listeners={{
            tabPress: () => setCurrentTab("Favorites"),
          }}
        >
          {() => <FavoritesScreen />}
        </BottomTab.Screen>

        <BottomTab.Screen
          name="Profile"
          options={{
            title: "Profile",
          }}
          listeners={{
            tabPress: () => setCurrentTab("Profile"),
          }}
        >
          {() => <ProfileScreen />}
        </BottomTab.Screen>
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
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: height * 0.01,
    height: height * 0.1,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: isTablet ? 14 : 12,
    textAlign: "center",
    marginTop: 4,
  },
});

export default MainTabs;