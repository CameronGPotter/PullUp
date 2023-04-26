import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native';
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

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

let position = [33.7747054, -84.3962344];

function Home() {
    const { currentUser } = auth; //we are getting the user from Firebase
    const markers = [
        { lat: 33.7729036, long: -84.3963336, user: 'Chris' },
        // { lat: 33.7747054, long: -84.3962344, user: 'Cameron' },;
        { lat: 33.7754311, long: -84.4034438, user: 'Chenyu' },
    ];
    const navigation = useNavigation<loginScreenProp>();
    const [errorMessages, setErrorMessages] = useState<string | null>(null)
    const [locations, setLocations] = useState<any[]>([]);
    
    
    
    useEffect(() => {

        load();
        storeData(33.7754311, -84.3962344, currentUser?.email);
        loadData();
    }, [])
    
    async function load() {
        
        setErrorMessages(null)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            
            if (status !== 'granted') {
                setErrorMessages('Location permission not granted')
                return
            }
            
            const location = await Location.getCurrentPositionAsync({})
            
            const { latitude, longitude } = location.coords
            
            position[0] = latitude
            position[1] = longitude
            
        } catch (error: any) {
            setErrorMessages(error.message) //must be string or null? careful with any type 
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

    async function getLocation() {
        let lArray = locations
        let name = 'You'
        if (position[0] == 33.7747054 && position[1] == -84.3962344) {
            name = 'Default'
        }
        lArray.push({lat: position[0], long: position[1], user: name});
        setLocations(lArray)
    }
    
    async function loadData() {
        let lArray:any[] = [];
        const querySnapshot = await getDocs(collection(db, "locations"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // if (currentUser !== null && doc.data().user === currentUser.email) {
            //     lArray.push({lat: doc.data().lat, long: doc.data().long, user: 'You'});
            // } else {
            //     lArray.push(doc.data());
            // }
            lArray.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });        
        setLocations(lArray);
        //   console.log("HERE");
    }

    // async function getPins() {
    //     await loadData();
    //     await getLocation();
    // }
    
    async function deleteData() {
      const querySnapshot = await getDocs(collection(db, "locations"));
    
      const deleteOps:any[] = [];
    
      querySnapshot.forEach((doc) => {
        deleteOps.push(deleteDoc(doc.ref));      
      });
    
      Promise.all(deleteOps).then(() => console.log('documents deleted'))
    }
    
    
    
    // loadData();
    // console.log(position[0] == 33.7747054 && position[1] === -84.3962344);
    // storeData(position[0], position[1], 'camerongpotter@gmail.com');
    // deleteData();
    // getPins();
    
    
    
    let mapHtml = `
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

${locations.map((marker) => `
L.marker([${marker.lat}, ${marker.long}])
.bindPopup('${marker.user}')
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

    <View style={whiteButtonStyle.buttonContainer}>
      <Pressable style={whiteButtonStyle.button} onPress={()=>navigation.navigate('Friends')} placeholder="Find your friends">
        <Text style={whiteButtonStyle.buttonLabel}>See Friends</Text>
      </Pressable>
    </View>

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
            alignItems: 'centeStyleSr',
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
        fontWeight: "bold"
      },
    });