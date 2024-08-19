import React, {useState, select, option} from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import BouncyCheckbox from "react-native-bouncy-checkbox";
//import MapView, { Marker } from 'react-native-maps';

import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');


import { Link } from "expo-router"

export default function App() {
  const {
    control,
    handleSubmit,
    register,
    resetField,
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

  const [selectedValue, setSelectedValue] = useState('false');

  const handleSelectChange = (event) => {
    setSelectedValue(!selectedValue);
    resetField('pricePerBottle')
  };

  const isShowed = (selectedValue === 'true');

  const [wasAuthed, setWasAuthed] = useState("false");
  const isAuthed = (wasAuthed === 'true');

  const onPressThirdButton = () => {
    if (pb.authStore.token == "") {
      setTitleText("false")
    } else {
      setWasAuthed("true")
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
        
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            Send Bottles!
          </Text>
          <Controller 
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.formField}
                placeholder="how many bottles?"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="numOfBottles"
          />
          {errors.numOfBottles && <Text>This is required.</Text>}
          <Text>For...:</Text>
          
          <View style={styles.formCheckBox}>
            <BouncyCheckbox 
              isChecked={selectedValue} onPress={handleSelectChange}
            />
          </View>
          {selectedValue && <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput {...register('pricePerBottle')}
                style={styles.formField}
                placeholder="for free/ for a fee"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="pricePerBottle"
          />}
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.formButton}>
            <Text>SEND</Text>
          </Pressable>
          <Pressable onPress={() => {
            auth();
            onPressThirdButton();
          }} style={styles.formButton} value={wasAuthed}>
            <Text>Auth</Text>
          </Pressable>
          {isAuthed &&<Text>U can send now</Text>}
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
    width: 100,
    height: 100,
  },
  formContainer: {
    alignItems: 'center',
    
  },
  formTitle: {
    textAlign: 'center',
    fontSize: 36
  },
  formField: {
    width: '60%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  formButton: {
    width: "60%",
    height: 54,
    backgroundColor: '#3377ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 6,
    borderColor: '#000000',
    marginBottom: 30
  },
  formCheckBox: {
    alignSelf: 'center'
  }
})