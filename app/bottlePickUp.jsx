import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Link } from "expo-router"

import PocketBase from 'pocketbase';
const pb = new PocketBase('https://2b7c-46-229-238-250.ngrok-free.app');

const MapViewExample = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const [hasCoordsLoaded, setHasCoordsLoaded] = useState('false')

  const recordsToRender = [
    {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    {
      latitude: 37.78825,
      longitude: -122.4354,
    },
    {
      latitude: 37.78825,
      longitude: -122.4364,
    },
    {
      latitude: 37.78825,
      longitude: -122.4394,
    },
  ];

  const handleSelect = () => {
    setSelectedCoordinates(region);
  };

  const findOrders = async () => {
    const records = await pb.collection('orders').getFullList({
      sort: '-created',
    });
    console.log(records)
    //change later to find X numbers
    for (let i = 0; i < 5; i++) {
      const orderPlace = {
        orderPlaceLatitude: records[i].orderPlaceLatitude,
        orderPlaceLatitudeDelta: records[i].orderPlaceLatitudeDelta,
        orderPlaceLongitude: records[i].orderPlaceLongitude,
        orderPlaceLongitudeDelta: records[i].orderPlaceLongitudeDelta
      };
      recordsToRender.push(orderPlace)
    }
    console.log(recordsToRender)
    setHasCoordsLoaded('true')
    console.log(hasCoordsLoaded)
  }

  return (
    <View style={{ flex: 1 }}>
      <Link href="/" asChild>
        <Button title="Go to Menu"/>
      </Link>
      
      {/*Picker Info */}
      <View style={styles.container}>
        <Text>My completed orders:</Text>
        <Text>Money made:</Text>
        <Text>Current Rating:</Text>
      </View>


      <View>
        <Text style={styles.formTitle}>SELECT SUM BOTTLES</Text>
        <Button title="Find Orders" onPress={findOrders}/>
        <TextInput placeholder="Selected Bottles placeholder" />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
          placeholder="Search"
          value={JSON.stringify(selectedCoordinates)}
        />
        <Button title="Select this" onPress={handleSelect} />
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
          {recordsToRender.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.orderPlaceLatitude, longitude: marker.orderPlaceLongitude }}
          />
        ))}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '35%',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  formTitle: {
    fontSize: 34,
    margin: 20,
    marginBottom: 50
  },
  orderPlaceContainer: {
    marginBottom: 20,
  },
  orderPlaceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapViewExample;
