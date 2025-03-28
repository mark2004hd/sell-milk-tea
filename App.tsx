import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './src/assets/screens/Signup';// Đường dẫn tới file Signup.js

import Gif from './src/assets/screens/Gif';// Giả sử bạn có màn hình Gift

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Gift" component={Gif} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}