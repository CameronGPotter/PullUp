import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import * as Location from 'expo-location'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebaseConfig'

import { WebView } from 'react-native-webview';

import PurpleButton from '../components/PurpleButton'

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const position = [51.505, -0.09];

function Home() {
    const navigation = useNavigation<loginScreenProp>();
    const [errorMessages, setErrorMessages] = useState<string | null>(null)

    const markers = [
        { lat: 33.7729036, lng: -84.3963336, name: 'Chris' },
        { lat: 33.7747054, lng: -84.3962344, name: 'Cameron' },
        { lat: 33.7754311, lng: -84.4034438, name: 'Chenyu' },
    ];

    useEffect(() => {
        load()
    })

    async function load() {
        
        setErrorMessages(null)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessages('Location permission not granted')
                return
            }

        } catch (error: any) {
            setErrorMessages(error.message)
        }
    }

    async function storeData(latitude:any, longitude:any, email:any) {
        try {
            const docRef = await addDoc(collection(db, "locations"), {
              lat: latitude,
              long: longitude,
              user: email
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.log("Error adding document: ", e);
            // console.error("Error adding document: ", e);
          }
    }

    async function loadData() {
        const querySnapshot = await getDocs(collection(db, "locations"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }

    console.log("HERE");

    storeData(33.7747054, -84.3962344, 'camerongpotter@gmail.com')

    loadData()

    


    const mapHtml = `
    <html>
          <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          </head>
          <body>
            <div id="map" style="height: 100%;" style="scale: 2"></div>
            <script>
              var map = L.map('map').setView([33.75, -84.39], 13);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.o penstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 19,
              }).addTo(map);
              
            ${markers.map((marker) => `
                        L.marker([${marker.lat}, ${marker.lng}])
                          .bindPopup('${marker.name}')
                          .addTo(map);
                      `).join('')}

            </script>
          </body>
        </html>
      `;
    return (
        // <View style={styles.container}>
        //     <LeafletView
        //         style={{ flex: 1 }}
        //         initialRegion={{
        //             latitude: 37.78825,
        //             longitude: -122.4324,
        //             latitudeDelta: 0.0922,
        //             longitudeDelta: 0.0421
        //         }}
        //     />
        //  </View>

        <View style={styles.container}>

              <WebView
                style={styles.mapView}
                source={{ html: mapHtml }}
              />
              <TextInput style={styles.inputContainer} placeholder="Find your friends" />
              <View style={styles.button}>
                <PurpleButton label="Share my location" onPress={() => alert("Button has been pressed")}/>
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
    }
});