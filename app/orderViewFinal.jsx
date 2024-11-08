import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button } from 'react-native';
import Slider from '@react-native-community/slider';

import AsyncStorage from '@react-native-async-storage/async-storage';

import pb from '../lib/pocketbase';
import NavBtn from '../components/navBtn';

export default OrderPage = () => {
  const [orderPickUpEst, setOrderPickUpEst] = useState('');
  const [pickerPhoneNumber, setPickerPhoneNumber] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [locationLongitude, setLocationLongitude] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);

  const [orderID, setOrderID] = useState("");
  
  const handleSliderValueChange = (value) => {
    setIsCheckboxChecked(value >= 0.5);
  };

  const getOrderConfirm = async () => {
    try {
      const record = await pb.collection('orders').getOne(orderID, {
        fields: 'orderConfirmPicker'
      });
      setIsSecondCheckboxChecked(record['orderConfirmPicker'])
      //will handle getting order picker's info too
      console.log(record)

    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedOrder');
      if (value !== null) {
        console.log('Retrieved data:', value);
        setOrderID(value)
      }
    } catch (e) {
      console.error('Failed to fetch data', e);
    }
  };  

  useEffect(() => {
    getOrderConfirm();
  })
  // ... (PocketBase API calls)

  return (
    <View>
      <Text style={styles.screenTitle}>Let's get your bottles :3</Text>
      <View
        style={styles.infoContainer}>
        <TextInput
          placeholder="Order Pick-Up Estimate"
          value={orderPickUpEst}
          onChangeText={setOrderPickUpEst}
        />
        <TextInput
          placeholder="Picker Phone Number"
          value={pickerPhoneNumber}
          onChangeText={setPickerPhoneNumber}
        />
        <TextInput
          placeholder="Location Latitude"
          value={locationLatitude}
          onChangeText={setLocationLatitude}
        />
        <TextInput
          placeholder="Location Longitude"
          value={locationLongitude}
          onChangeText={setLocationLongitude}
        />
      </View>
      <Slider
        minimumValue={0}
        maximumValue={1}
        value={isCheckboxChecked ? 1 : 0}
        onValueChange={handleSliderValueChange}
      />
      <Switch value={isCheckboxChecked} onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} />
      <Text>Picker Confirmation:</Text>
      <Switch disabled={true} value={isSecondCheckboxChecked} onChange={() => setIsSecondCheckboxChecked(!isSecondCheckboxChecked)} />
      <NavBtn text="Jeb" onPress={getData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    margin: 20,
    marginBottom: 50
  },
  infoContainer: {
    marginBottom: 160,
    borderColor: "black",
    borderWidth: 6,
  }
});
