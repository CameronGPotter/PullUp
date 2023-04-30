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
                <PurpleButton label="Available Friends" buttonWidth='48%' buttonMarginHorizontal={1} />
                <PurpleButton label="Busy Friends" buttonWidth='48%' buttonMarginHorizontal={1} buttonBackgroundColor='white' buttonTextColor='purple' onPress={() => navigation.replace("ShareLocationBusy")}/>
            </View>
            
            <FlatList
                style={styles.flatList}
                data={[
                  {key: 'Cameron', pic: "https://media.licdn.com/dms/image/C4E03AQHqRKD011Awbw/profile-displayphoto-shrink_800_800/0/1627954381811?e=2147483647&v=beta&t=XNnGXAounLCfrVrD9mLJ0s0jtc6lFMZgnE-DkiQz9fw"},
                  {key: 'Chenyu', pic: "https://media.licdn.com/dms/image/C4D03AQEvjzP_RTPLDg/profile-displayphoto-shrink_800_800/0/1590116917483?e=2147483647&v=beta&t=W_ugRAzK3Yg94WoHADhFVixeJNIAjOpMHcyyDXARbvY"},
                  {key: 'Chris', pic: "https://media.licdn.com/dms/image/C4D03AQExwpzhlCbJYA/profile-displayphoto-shrink_400_400/0/1575300073772?e=1688601600&v=beta&t=4Az1EBrJmmeZz204kYg8L67o2atcYKMeLdBz2WFQCWM"},
                  {key: 'Jillian', pic: "http://www.toledoblade.com/image/2014/06/25/800x_b1_cCM_z_ca1206,138,2334,1740/TV-Jillian-Michaels-Biggest-Loser.jpg"},
                  {key: 'James', pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstaticg.sportskeeda.com%2Fwp-content%2Fuploads%2F2014%2F06%2Fjames-rodriugez-1404113987.jpg&f=1&nofb=1&ipt=918673eda24a94a585e192c93e06d52cc3843469fe19b420e14cf171a07171b4&ipo=images"},

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