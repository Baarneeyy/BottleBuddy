import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Link } from "expo-router"
import pb from '../lib/pocketbase';

const pickerScreen = () => {
  const [orders, setOrders] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const profileButtonHandler = () => {
    setShowProfile(current => !current)
  }

  const loadOrders = async () => {
    try {
        const response = await pb.collection('orders').getList(1, 50, {
            fields: 'orderPlaceLongitude,orderPlaceLatitude'
        });
      setOrders(response.items);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show Picker Profile" onPress={profileButtonHandler}/>
      
      {/*Picker Info */}
      {showProfile && (<View>
          <Text>My completed orders:</Text>
          <Text>Money made:</Text>
          <Text>Current Rating:</Text>
          <Link href="/test" asChild>
            <Button title="Select This?"/>
          </Link>
        </View>)}

      <Link href="/" asChild>
        <Button title="Main Menu"/>
      </Link>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {orders.map((order, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: order.orderPlaceLatitude,
              longitude: order.orderPlaceLongitude
            }}
            onSelect={() => {
              profileButtonHandler()
            }}
          >
            {/* Optional: Add a custom marker view */}
          </Marker>
        ))}
      </MapView>
      <Button title="Load Orders" onPress={loadOrders} />
    </View>
  );
};

export default pickerScreen;