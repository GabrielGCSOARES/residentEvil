import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import GameSummaries from '../screens/GameSummaries';
import FullLore from '../screens/FullLore';
import BioweaponsList from '../screens/BioweaponsList';
import BioweaponDetail from '../screens/BioweaponDetail';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setInitialRoute(token ? 'Home' : 'Login');
    };

    checkAuth();
  }, []);

  if (!initialRoute) {
    return null; // ou um loading spinner
  }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="GameSummaries" component={GameSummaries} options={{ headerShown: false }} />
        <Stack.Screen name="FullLore" component={FullLore} options={{ headerShown: false }} />
        <Stack.Screen name="BioweaponsList" component={BioweaponsList} options={{ headerShown: false }} />
        <Stack.Screen name="BioweaponDetail" component={BioweaponDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
