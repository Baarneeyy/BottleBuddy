import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import PocketBase from 'pocketbase';
const pb = new PocketBase('https://2b7c-46-229-238-250.ngrok-free.app');

const LoginForm = ( { onSubmit: parentOnSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
        //pb.autoCancellation(false)
        //passwordOLD is 'ZtudZw9x1xGV7k'
        const authData = await pb.collection('users').authWithPassword(data['email'], data['password']);
        console.log(authData['token'])
      } catch (error) {
        console.error(error);
        console.log(error.originalError); // true
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginForm;
