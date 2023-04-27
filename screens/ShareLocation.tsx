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

type loginScreenProp = StackNavigationProp<RootStackParamList, 'ShareLocation'>;


function ShareLocation() { 
    const navigation = useNavigation<loginScreenProp>();

    return (  
        <View>  
            <Text style={styles.HomeText}>Share Location</Text>

            <View style={{flexDirection:'row', flexWrap:'nowrap', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <PurpleButton label="Available" buttonWidth='48%' buttonMarginHorizontal={1} />
                <PurpleButton label="Busy" buttonWidth='48%' buttonMarginHorizontal={1} buttonBackgroundColor='white' buttonTextColor='purple' onPress={() => navigation.replace("ShareLocationBusy")}/>
            </View>
            
            <FlatList
                style={styles.flatList}
                data={[
                  {key: 'Devin', pic: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.chatsports.com%2Fthumbnails%2F1561-83718-original.jpeg&f=1&nofb=1&ipt=8a339e76949ef856d094636d737216a81838936a0b0f97d21dea7a856dce2d97&ipo=images"},
                  {key: 'Dan', pic: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww4.pictures.zimbio.com%2Fgi%2FDan%2BWheldon%2BDies%2BLas%2BVegas%2BIndy%2BCrash%2BhKLkNJ9NXR5x.jpg&f=1&nofb=1&ipt=0222342c1fb7f81c380ab9826f2c37663bc80c18fd379b9d54f7697cd88b0c0c&ipo=images"},
                  {key: 'Dominic', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.popsugar-assets.com%2Ffiles%2Fthumbor%2FLpLmieDTAxgG2M3xCYobmoCvUQc%2Ffit-in%2F1024x1024%2Ffilters%3Aformat_auto-!!-%3Astrip_icc-!!-%2F2019%2F04%2F12%2F804%2Fn%2F1922283%2Fcfbfb77aa5344fe8_GettyImages-961485694%2Fi%2FDominic-Monaghan.jpg&f=1&nofb=1&ipt=2f92a05ecd77b3cc3dbf0c87acafdedac37e30bcfa9288a903dfda2a72674908&ipo=images"},
                  {key: 'James', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstaticg.sportskeeda.com%2Fwp-content%2Fuploads%2F2014%2F06%2Fjames-rodriugez-1404113987.jpg&f=1&nofb=1&ipt=918673eda24a94a585e192c93e06d52cc3843469fe19b420e14cf171a07171b4&ipo=images"},
                  {key: 'Joel', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcelebritieshairtransplants.com%2Fwp-content%2Fuploads%2F2019%2F03%2Fjoel_mchale_2012.jpg&f=1&nofb=1&ipt=ee7ea5682bbcdfc2c742ecd6a01497bc77ae1d158ad1161d7ffdbb4e2dd31770&ipo=images"},
                  {key: 'Jillian', pic: "http://www.toledoblade.com/image/2014/06/25/800x_b1_cCM_z_ca1206,138,2334,1740/TV-Jillian-Michaels-Biggest-Loser.jpg"},
                  {key: 'Julie', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-L0MmvUpa-gk%2FUindNDE8A8I%2FAAAAAAAAJs8%2FqD9UrwPeWIg%2Fs1600%2FJulie%2BGonzalo%2Bphoto-008.jpg&f=1&nofb=1&ipt=226d19a4283135857120b22e6a29cae6a7a504af5b586d9e8270a6ad876716b9&ipo=images"},
                ]}
                renderItem={({item}) => 
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            <Image
                                style={styles.tinyLogo}
                                source={{uri: item.pic}}
                                alt="Profile Picture"
                            />
                            <Text style={styles.item}>{item.key}</Text>
                            <PurpleButton label="Invite" onPress={()=> navigation.navigate("EventDetails")} buttonWidth="30%" marginLeftAuto={true} buttonTextColor='purple' buttonBackgroundColor='white' />
                        </View>
                }
            />
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
        
            <ShareLocation />
        
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