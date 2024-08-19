import React, {useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
//import MapView, { Marker } from 'react-native-maps';

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
  ///api/collections/orders/records

  const onSubmit = (data) => {
    let bottleOrder = {
      "numOfBottles": parseInt(data["numOfBottles"]),
      "pricePerBottle": parseInt(data["pricePerBottle"])
    }
    console.log(data, bottleOrder);

    sendOrderRequest(parseInt(data["numOfBottles"]), parseInt(data["pricePerBottle"]))
  };
  
  const auth = async () => {
    try {
      await pb.admins.authWithPassword('tom.vseteckaa@gmail.com', 'ZtudZw9x1xGV7k');
    } catch (error) {
      console.log(error.originalError)
      console.error('Error:', error);
      return null;
    }
    console.log(pb.authStore.token)

    //pb.authStore.clear();
  };

  const print = () => {
    console.log(pb.authStore.token)
    setTitleText(pb.authStore.token)
    pb.authStore.clear();
  }

  const [titleText, setTitleText] = useState("not authed");
  
  const onPressThirdButton = () => {
    if (pb.authStore.token == "") {
      setTitleText("still not authed")
    } else {
      setTitleText(pb.authStore.token)
    }
  }

  const sendOrderRequest = async (numOfBottles, pricePerBottle) => {
    const url = 'http://127.0.0.1:8090/api/collections/orders/records';
    const payload = {
      numOfBottles: numOfBottles,
      pricePerBottle: pricePerBottle,
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': pb.authStore.token,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      console.log('Success:', jsonResponse);
  
      return jsonResponse;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  

  return (
    
    <View>
        <Link href="/" asChild>
          <Pressable>
            <Text>Go to Menu</Text>
          </Pressable>
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
          <Button title="auth" onPress={auth}/>
          <Button title={titleText}onPress={onPressThirdButton}/>
          <Text></Text>
        </View>
        
        <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
        </Text>
        
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})