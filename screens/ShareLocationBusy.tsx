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

type loginScreenProp = StackNavigationProp<RootStackParamList, 'ShareLocationBusy'>;


function ShareLocationBusy() {
    const navigation = useNavigation<loginScreenProp>();  

    return (  
        <View>  
            <Text style={styles.HomeText}>Share Location</Text>

            <View style={{flexDirection:'row', flexWrap:'nowrap', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <PurpleButton label="Available Friends" buttonWidth='48%' buttonMarginHorizontal={1} buttonBackgroundColor='white' buttonTextColor='purple' onPress={() => navigation.replace('ShareLocation')}/>
                <PurpleButton label="Busy Friends" buttonWidth='48%' buttonMarginHorizontal={1} />
            </View>
            
            <FlatList
                style={styles.flatList}
                data={[
                  {key: 'Jackson', pic: "https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/39/2014/11/05185626/Jesse-Jackson-Brown-Background-1140x1517.jpg"},
                  {key: 'John', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1574435%2Fjohn-legend.jpg&f=1&nofb=1&ipt=9b33e565b455a5a878890097a71f9096b18fb389a9f328afb24df1889d5d394a&ipo=images"},
                  {key: 'Jimmy', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Faltoday.com%2Fwp-content%2Fuploads%2F2019%2F07%2FJimmy-Carter.jpg%3Ffit%3D2400%252C1896&f=1&nofb=1&ipt=48ec5afca7f1e4a7bf0942ebae99ac0253ba98ab316f24e5ece1e6822eb51cc0&ipo=images"},
                  {key: 'Julie', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-L0MmvUpa-gk%2FUindNDE8A8I%2FAAAAAAAAJs8%2FqD9UrwPeWIg%2Fs1600%2FJulie%2BGonzalo%2Bphoto-008.jpg&f=1&nofb=1&ipt=226d19a4283135857120b22e6a29cae6a7a504af5b586d9e8270a6ad876716b9&ipo=images"},
                  {key: 'Joel', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcelebritieshairtransplants.com%2Fwp-content%2Fuploads%2F2019%2F03%2Fjoel_mchale_2012.jpg&f=1&nofb=1&ipt=ee7ea5682bbcdfc2c742ecd6a01497bc77ae1d158ad1161d7ffdbb4e2dd31770&ipo=images"},

                ]}
                renderItem={({item}) => 
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            <Image
                                style={styles.tinyLogo}
                                source={{uri: item.pic}}
                                alt="Profile Picture"
                            />
                            <Text style={styles.item}>{item.key}</Text>
                        </View>
                }
            />
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
        
            <ShareLocationBusy />
        
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