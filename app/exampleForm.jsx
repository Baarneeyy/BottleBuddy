import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import MapView, { Marker } from 'react-native-maps';


import { Link } from "expo-router"

import PocketBase from 'pocketbase';
const pb = new PocketBase('https://ce67-46-229-238-250.ngrok-free.app');

export default function App() {
  const { control, handleSubmit } = useForm();
  const [orderPlace, setOrderPlace] = useState(10);
  const [orderMaker, setOrderMaker] = useState("dzjqyfhenbxmk7g") // Example value for X

  const auth = async () => {
    try {
        const authData = await pb.admins.authWithPassword('tom.vseteckaa@gmail.com', 'ZtudZw9x1xGV7k');
        console.log(authData)
    } catch (error) {
        console.error(error);
        console.log(error.originalError); // true
    }
  }
  const deAuth = () => {
    alert(pb.authStore.token)
    pb.authStore.clear();
  }

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const onSubmit = async (data) => {
    fullData = {...data, orderPlace, orderMaker}
    console.log(fullData);
    // Handle form submission
    const record = await pb.collection('orders').create(fullData);
    console.log(record)
  };
  const handleConfirm = () => {
    setOrderPlace(JSON.stringify(region))
  }

  return (
    
    <View style={styles.container}>
      <View>
      <Text style={styles.formTitle}>Send Bottles</Text>
      <Link href="/" asChild>
          <Button title="Go to Menu" />
      </Link>
      <Button title="Auth" onPress={auth} />
      <Button title="deAuth" onPress={deAuth} />



      </View>
      {/* First Field */}
      <Controller
        control={control}
        name="numOfBottles"
        rules={{ required: true, pattern: /^[0-9]+$/ }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="How many bottles?"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* Second Field */}
      <Controller
        control={control}
        name="pricePerBottle"
        rules={{ required: true, pattern: /^[0-9]+$/ }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="For free/ a fee?"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* Third Non-Selectable Field */}
      <View style={styles.orderPlaceContainer}>
        <Text style={styles.orderPlaceText}>Place of Order: {orderPlace}</Text>
      </View>
      <MapView 
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}>
          <Marker coordinate={{
            latitude: region.latitude, 
            longitude: region.longitude,
          }}/>
      </MapView>
      <Button title="Set Order Place" onPress={handleConfirm} />

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

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
