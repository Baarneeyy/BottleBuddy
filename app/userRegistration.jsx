import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import pb from '../lib/pocketbase';
import NavBtn from '../components/navBtn';

export default function App() {
  const { control, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    const fullData = {
      "username": data["username"],
      "email": data["email"],
      "emailVisibility": true,
      "password": data["password"],
      "passwordConfirm": data["password"],
      "firstName": data["firstName"],
      "lastName": data["lastName"],
      "phoneNumber": data["phoneNum"]
    };
    
    console.log(fullData)
    try {
      const authData = await pb.collection('users').create(fullData);
      console.log(authData)
    } catch (error) {
      console.error(error);
      console.log(error.originalError); // true
    }
  };
  
  return (
    <View>
      <Text style={styles.formTitle}>Join Us</Text>

      {/* First Field */}
      <Controller
        control={control}
        name="firstName"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          
          <TextInput
            style={styles.input}
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* Second Field */}
      <Controller
        control={control}
        name="lastName"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* Third Field */}
      <Controller
        control={control}
        name="phoneNum"
        rules={{ required: true, pattern: /^[0-9]+$/ }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* Fourth Field */}
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="e-mail address"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* First Field */}
      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />

      {/* Fifth Field */}
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />
      <NavBtn text="Submit" onPress={handleSubmit(onSubmit)}/>
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