import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Platform } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import * as Location from 'expo-location'
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { app, auth, db } from '../firebaseConfig'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { WebView } from 'react-native-webview';

import PurpleButton from '../components/PurpleButton'

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

let position = [33.7747054, -84.3962344];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let notify = true;

function Home() {
    const { currentUser } = auth; //we are getting the user from Firebase
    const markers = [
        { lat: 33.772, long: -84.396, user: '<b>Chris</b><br>Working on spaceships.', pic: 'https://media.licdn.com/dms/image/C4D03AQExwpzhlCbJYA/profile-displayphoto-shrink_400_400/0/1575300073772?e=1688601600&v=beta&t=4Az1EBrJmmeZz204kYg8L67o2atcYKMeLdBz2WFQCWM'},
        { lat: 33.779, long: -84.393, user: '<b>Cameron</b><br>Playing baseball! ⚾', pic: 'https://media.licdn.com/dms/image/C4E03AQHqRKD011Awbw/profile-displayphoto-shrink_800_800/0/1627954381811?e=2147483647&v=beta&t=XNnGXAounLCfrVrD9mLJ0s0jtc6lFMZgnE-DkiQz9fw' },
        { lat: 33.7755, long: -84.4032, user: '<b>Chenyu</b><br>Gettin gainzzz 💪', pic: 'https://media.licdn.com/dms/image/C4D03AQEvjzP_RTPLDg/profile-displayphoto-shrink_800_800/0/1590116917483?e=2147483647&v=beta&t=W_ugRAzK3Yg94WoHADhFVixeJNIAjOpMHcyyDXARbvY'},
    ];

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    if (notify) {
      (async () => {
        await schedulePushNotification();
      })()
      notify = false;
    }

    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Chenyu wants to hang out! 📬",
          body: 'Open the app to see location',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
      });
    }

    async function registerForPushNotificationsAsync() {
      let token;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      return token;
    }

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
        <style>
          .leaflet-popup-content {
            font-size: 25px;
          }

          .leaflet-marker-icon {
            border-radius: 50%;
          }
        </style>
        </head>
        <body>
        <div id="map" style="height: 100%;" style="scale: 2"></div>
        <script>
        var map = L.map('map', {zoomSnap: 0}).setView([33.775, -84.40], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 20
    }).addTo(map);

    var LeafIcon = L.Icon.extend({
      options: {
          iconSize:     [60, 60],
          iconAnchor:   [22, 94],
          popupAnchor:  [-3, -76]
      }
    });

    ${locations.map((marker) => `
    var marker = L.marker([${marker.lat}, ${marker.long}])
    .bindPopup('${marker.user}')
    .addTo(map);
    marker._icon.style.filter = "hue-rotate(120deg)"
    `).join('')}

    ${markers.map((marker) => `
    var icon = new LeafIcon({iconUrl: '${marker.pic}'})
    var marker = L.marker([${marker.lat}, ${marker.long}], {icon: icon})
    .bindPopup('${marker.user}')
    .addTo(map);
    `).join('')}

    map.on('zoomstart', function () {
      var zoomLevel = map.getZoom();
      if (zoomLevel > 17) {
        for (var iconThing of document.getElementsByClassName('leaflet-marker-icon')) {
          iconThing.style.width = 100;
          iconThing.style.height = 100;
        }
      } else {
        for (var iconThing of document.getElementsByClassName('leaflet-marker-icon')) {
          iconThing.style.width = 60;
          iconThing.style.height = 60;
        }
      }
    });

    </script>
    </body>
    </html>
    `;

if (Platform.OS === "web") {

  return (
        
    <View style={styles.container}>
    
    <iframe src="https://www.espn.com/" height={'100%'} width={'100%'} />

    <View style={whiteButtonStyle.buttonContainer}>
      <Pressable style={whiteButtonStyle.button} onPress={()=>navigation.navigate('Friends')} placeholder="Find your friends">
        <Text style={whiteButtonStyle.buttonLabel}>See Friends</Text>
      </Pressable>
    </View>

    <View style={styles.button}>
    <PurpleButton label="Share My Location" onPress={() => navigation.navigate('ShareLocation')}/>
    </View>
    </View>
    )

} 

return (
        
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
    <PurpleButton label="Share My Location" onPress={() => navigation.navigate('ShareLocation')}/>
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