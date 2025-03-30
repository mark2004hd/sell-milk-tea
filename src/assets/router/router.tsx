import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Signup";
import Gif from "../screens/Gif";
import Introduce from "../screens/Introduce";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Introduce"
        screenOptions={{ headerShown: false }} // Ẩn header mặc định nếu không cần
      >
        <Stack.Screen name="Introduce" component={Introduce} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Gift" component={Gif} />
        <Stack.Screen name="Login" component={Login} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;