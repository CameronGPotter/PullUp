import React from 'react';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Friends from './screens/Friends';
import ShareLocation from './screens/ShareLocation';
import ShareLocationBusy from './screens/ShareLocationBusy';

import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
    Login: undefined,
    Signup: undefined,
    Home: undefined,
    Friends: undefined,
    ShareLocation: undefined,
    ShareLocationBusy: undefined;
    Profile: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



function App() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="ShareLocation" component={ShareLocation} />
            <Stack.Screen name="ShareLocationBusy" component={ShareLocationBusy} />
        </Stack.Navigator>
    );
}


export default () => {
    return (
        <NavigationContainer>

            <App />

        </NavigationContainer>
    )
}