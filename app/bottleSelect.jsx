import React, {useState, select, option} from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MapView, { Marker } from 'react-native-maps';

import PocketBase from 'pocketbase';
const pb = new PocketBase('https://ce67-46-229-238-250.ngrok-free.app');


import { Link } from "expo-router"

export default function App() {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numOfBottles: "",
      pricePerBottle: "",
      orderPlace: ""
    },
  })  
  ///api/collections/orders/records

  const onSubmit = (data) => console.log(data)


  const auth = async () => {
    try {
      pb.autoCancellation(false);
      await pb.admins.authWithPassword('tom.vseteckaa@gmail.com', 'ZtudZw9x1xGV7k');
    } catch (error) {
      console.log(error);
      console.log(error.originalError); // true
    }
    console.log(pb.authStore.token)
    if (pb.authStore.token == "") {
      setWasAuthed("false")
    } else {
      setWasAuthed("true")
    }
    

    //pb.authStore.clear();
  };

  const print = () => {
    alert(pb.authStore.token)
    pb.authStore.clear();
  }

  const [selectedValue, setSelectedValue] = useState('false');

  const handleSelectChange = (event) => {
    setSelectedValue(!selectedValue);
    resetField('pricePerBottle')
  };

  const [wasAuthed, setWasAuthed] = useState("false");
  const isAuthed = (wasAuthed === 'true');

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [orderPlace, setOrderPlace] = useState()

  const handleConfirm = () => {
      setOrderPlace(region)
  }

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const sendOrder = async () => {
    const bottleOrder1 = {
      "numOfBottles": parseInt(data["numOfBottles"]),
      "pricePerBottle": parseInt(data["pricePerBottle"]),
      "orderPlace": data["orderPlace"],
      "orderMaker": "dzjqyfhenbxmk7g"
    };
  
    const record = await pb.collection('orders').create(bottleOrder1);
  }
  
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
              <TextInput
                style={styles.formField}
                placeholder="how many bottles?"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="numOfBottles"
          />
          {errors.numOfBottles && <Text>This is required.</Text>}
          <Text>For a fee?</Text>
          
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
              <TextInput
                style={styles.formField}
                placeholder="price per bottle"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="pricePerBottle"
          />}
          <Pressable onPress={() => {
            auth();
          }} style={styles.formButton} value={wasAuthed}>
            <Text>Auth</Text>
          </Pressable>
          {isAuthed &&<Text>U can send now</Text>}
        </View>
        <View style={styles.formContainer}>
          <Controller 
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formField}
                  placeholder="where bottles at?"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={JSON.stringify(orderPlace)}
                />
              )}
              name="placeOfOrder"
            />
          <Pressable onPress={handleConfirm} style={styles.formButton}>
            <Text>
              Set Pick-Up Point
            </Text>
          </Pressable>
          <Pressable title="Submit" onPress={handleSubmit()} style={styles.formButton}>
            <Text>SEND</Text>
          </Pressable>
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
        
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '35%',
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