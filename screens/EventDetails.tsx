import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, FlatList } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import * as Location from 'expo-location'
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { app, auth, db } from '../firebaseConfig'

import { WebView } from 'react-native-webview';

import PurpleButton from '../components/PurpleButton'

type loginScreenProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;

function EventDetails() { 
    const navigation = useNavigation<loginScreenProp>();
    const [description, setDescription] = useState('');

    return (  
        <View>  
            <Text style={styles.HomeText}>Description</Text>

            <View style={{marginLeft: 10, marginRight: 'auto', marginTop: 20, width: '95%', marginBottom: 20}}>
                <Input
                    value={description}
                    onChangeText={(description) => setDescription(description)}
                    placeholder={'Let others know why you want to hang'}
                />
            </View>

            <PurpleButton label="Share" onPress={() => navigation.replace("Home")} marginRightAuto={true} marginLeftAuto={true} />
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
        
            <EventDetails />
        
        </NativeBaseProvider>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        HomeText: {
            marginTop: 50,
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 10
        },
        Middle: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        mapView: {
            transform: [{scale: 2}]
        },
        inputContainer: {
            position: 'absolute',
            top: 50,
            left: 10,
            right: 10,
            width: 365,
            height: 50,
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 5,
            paddingLeft: 15
        },
        button: {
            position: 'absolute',
            bottom: 100,
            left: 10,
            right: 10,
            width: 365,
            height: 50
        },
        item: {
            marginTop: 20,
            paddingLeft: 10,
            fontSize: 18,
            height: 44,
        },
        flatList: {
            marginTop: 20
        },
        tinyLogo: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginLeft: 10
        },
    });

    const whiteButtonStyle = StyleSheet.create({
      buttonContainer: {
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      },
      button: {
        borderRadius: 50,
        width: '80%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 320,
        height: 68,
        textAlign: 'center'
      },
      buttonIcon: {
        paddingRight: 8,
      },
      buttonLabel: {
        color: '#000000',
        fontSize: 16,
      },
    });