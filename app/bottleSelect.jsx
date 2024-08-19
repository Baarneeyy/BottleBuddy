import * as React from "react";
import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import MapView, { Marker } from 'react-native-maps';

import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');


import { Link } from "expo-router"

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numOfBottles: "",
      pricePerBottle: "",
    },
  })

 
  const getMoviesFromApi = () => {
    return fetch('http://127.0.0.1:8090/api/collections/orders/records')
      .then(response => response.json())
      .then(json => {
        return json.movies;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const bottleOrder = {
    "numOfBottles": parseInt(data["numOfBottles"]),
    "pricePerBottle": parseInt(data["pricePerBottle"])
  }
  
  ///api/collections/orders/records

  const onSubmit = (data) => console.log(data);

  const record = pb.collection('orders').create(bottleOrder);
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    
    <View>
        <Link href="/" asChild>
            <Button title="Go to Menu"/>
        </Link>
        
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="how many bottles?"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="numOfBottles"
          />
          {errors.numOfBottles && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="for free/ for a fee"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="pricePerBottle"
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
        
        <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
        </Text>
        <MapView style={styles.map} />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})