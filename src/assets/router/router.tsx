import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AudioProvider } from "../context/AudioContext";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { PromotionsProvider } from "../context/PromotionsContext";
import CartScreen from "../screens/CartScreen";
import Introduce from "../screens/IntroduceScreen";
import Login from "../screens/LoginScreen";
import Product from "../screens/ProductScreen";
import Search from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingScreen";
import Signup from "../screens/SignupScreen";
import MainTabs from "./MainTabs";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import NotificationScreen from "../components/NotificationScreen";

export type RootStackParamList = {
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
  ChangePassword: undefined;
  Notification: undefined;
  Security: undefined;
  Language: undefined;
  LawAndPolicy: undefined;
  HelpAndSupport: undefined;
  Profile: undefined;
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
      ChangePassword: "change-password",
    },
  },
};

const Router = () => {
  return (
    <AudioProvider>
      <PromotionsProvider>
        <CartProvider>
          <FavoritesProvider>
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
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                <Stack.Screen name="Notification" component={NotificationScreen} />

            </Stack.Navigator>
            </NavigationContainer>
            </FavoritesProvider>
        </CartProvider>
      </PromotionsProvider>
    </AudioProvider>
  );
};

export default Router;