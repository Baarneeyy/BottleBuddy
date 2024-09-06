import { View, Text, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

import LoginForm from '../components/userLogin';

import AsyncStorage from '@react-native-async-storage/async-storage';

import pb from '../lib/pocketbase';

export default function Page() {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [isAuthing, setIsAuthing] = useState('true');
  const [isAuthed, setIsAuthed] = useState('false')

  const getData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      console.log(value)
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  const print = () => {
    setIsAuthing(!isAuthing)
  }

  return (
  <View style={styles.homeMenuContainer}>
    <Text>BottleBuddy</Text>
    <Link href="/userRegistration" asChild>
      <Button title="Join Up" />
    </Link>

    {!isAuthing && <Link href="/createOrder" asChild>
        <Pressable style={styles.homeMenuItem}>
          <Text>Create an Order!</Text>
        </Pressable>
    </Link>}
    {!isAuthing && <Link href="/bottlePickUp" asChild>
      <Pressable style={styles.homeMenuItem}>
        <Text>Pick Up Bottles!</Text>
      </Pressable>
    </Link>}
    {!isAuthing && <Link href="/orderViewFinal" asChild>
      <Pressable style={styles.homeMenuItem}>
        <Text>OrderView</Text>
      </Pressable>
    </Link>}
    {!isAuthing && <Link href="/orderViewCustomer" asChild>
      <Pressable style={styles.homeMenuItem}>
        <Text>Collapsible</Text>
      </Pressable>
    </Link>}
    <View>
      <Text>
          Currently in active development!{'\n'}{'\n'}
          Made by Tomas Vsetecka
      </Text>
    </View>
    <Pressable style={styles.homeMenuItem} onPress={print}>
      <Text>Login</Text>
    </Pressable>     
    {isAuthing && <LoginForm />}
  </View>
)}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  homeMenuContainer: {
    alignItems: 'center'
  },
  homeMenuItem: {
    marginBottom: 16,
    borderColor: 'black',
    borderWidth: 3,
  }
})