import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AudioProvider } from "../context/AudioContext";
import { CartProvider } from "../context/CartContext";
import { PromotionsProvider } from "../context/PromotionsContext";
import Introduce from "../screens/IntroduceScreen";
import Login from "../screens/LoginScreen";
import Product from "../screens/ProductScreen";
import Search from "../screens/SearchScreen";
import Signup from "../screens/SignupScreen";
import VerificationCode from "../screens/VerificationCode";
import MainTabs from "./MainTabs";
import CartScreen from "../screens/CartScreen";
import SettingsScreen from "../screens/SettingScreen";

type RootStackParamList = {
  Introduce: undefined;
  Signup: undefined;
  Login: undefined;
  VerificationCode: undefined;
  MainTabs: undefined;
  Search: undefined;
  AuthCallback: { code?: string };
  Product: { productId: string };
  CartScreen: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["sell-milk-tea://"],
  config: {
    screens: {
      Introduce: "introduce",
      Signup: "signup",
      Login: "login",
      VerificationCode: "verification",
      MainTabs: "main",
      AuthCallback: "auth-callback",
      Setting: "setting",
    },
  },
};

const Router = () => {
  return (
    <AudioProvider>
      <PromotionsProvider>
        <CartProvider>
          <NavigationContainer linking={linking}>
            <Stack.Navigator
              initialRouteName="Introduce"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Introduce" component={Introduce} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Product" component={Product} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </PromotionsProvider>
    </AudioProvider>
  );
};

export default Router;