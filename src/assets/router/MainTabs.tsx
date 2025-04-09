import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen'; // Adjust the path to your HomeScreen file
import Category from '../screens/Category'; // Adjust the path to your Category file

const Tab = createMaterialTopTabNavigator();

const MainTabs = () => {
    return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Category" component={Category} />
      </Tab.Navigator>
    );
  };

export default MainTabs;