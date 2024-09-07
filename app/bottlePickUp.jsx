import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Link } from "expo-router"
import pb from '../lib/pocketbase';

const pickerScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");
  const markerOrderSelect = async (orderID) => {
    setShowProfile(current => !current)
    setSelectedOrder(orderID)
    console.log(selectedProfile)
  }
  const profileButtonHandler = () => {
    //
  }

  const confirmPickup = async () => {
    try {
      const record = await pb.collection('orders').update(selectedOrder, { "orderPicker": selectedProfile});
      console.log(record)
    } catch (error) {
      console.error(error)
    }
  }

  //WOOOOOOOOOOOOOOOOOOOORK
  const selectOrder = async () => {
    try {
      const mail = await pb.collection('users').getList(1,1,{
        filter: 'username = "testNativeUser"',
        fields: 'id',
      });
      console.log(mail)
      const items = mail["items"];
      const item = items[0]
      const profile = item["id"]
      console.log(profile)
      setSelectedProfile(profile)
    } catch (error) {
      console.error(error)
    }
  }

  const loadOrders = async () => {
    try {
        const response = await pb.collection('orders').getList(1, 50, {
          fields: 'id, orderPlaceLongitude, orderPlaceLatitude'
        });
      setOrders(response.items);
      console.log(response)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show Picker Profile" onPress={selectOrder}/>
      
      {/*Picker Info */}
      {showProfile && (<View>
          <Text>My completed orders:</Text>
          <Text>Money made:</Text>
          <Text>Current Rating:</Text>
          <Button title="Select This" onPress={confirmPickup}/>
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
              markerOrderSelect(order.id)
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