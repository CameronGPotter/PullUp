import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

function Home() {
    const navigation = useNavigation<loginScreenProp>();
    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.HomeText}>Home Screen</Text>
            </View>
        </View>
    )

}

export default () => {
    return (
        <NativeBaseProvider>

            <Home />

        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    HomeText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
    },
    Middle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
