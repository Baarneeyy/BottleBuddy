import React, { useState } from 'react';
import { View, Text, TextInput, Slider, Switch } from 'react-native';
import Pocketbase from 'pocketbase';

const OrderPage = () => {
  const [orderPickUpEst, setOrderPickUpEst] = useState('');
  const [pickerPhoneNumber, setPickerPhoneNumber] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [locationLongitude, setLocationLongitude] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleSliderValueChange = (value) => {
    setIsCheckboxChecked(value >= 0.5);
  };

  // ... (PocketBase API calls)

  return (
    <View>
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
      <Slider
        minimumValue={0}
        maximumValue={1}
        value={isCheckboxChecked ? 1 : 0}
        onValueChange={handleSliderValueChange}
      />
      <Switch value={isCheckboxChecked} onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} />
    </View>
  );
};

export default OrderPage;