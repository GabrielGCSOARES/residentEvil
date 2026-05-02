// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login'; 
import Register from './src/screens/Register'; 
import LoadingScreen from './src/screens/LoadingScreen'; 
import Home from './src/screens/Home'; 
import GameSummaries from './src/screens/GameSummaries';
import FullLore from './src/screens/FullLore';
import BioweaponsList from './src/screens/BioweaponsList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#0a0a0a' }}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GameSummaries"  component={GameSummaries} />
        <Stack.Screen name="FullLore"       component={FullLore} />
        <Stack.Screen name="BioweaponsList" component={BioweaponsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}