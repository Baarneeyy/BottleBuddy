import { View, Text, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

import LoginForm from '../components/userLogin';
import NavBtn from '../components/navBtn';

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
      <NavBtn text="Join Up!"/>
    </Link>
    <NavBtn text="Login" onPress={print}/>
    {!isAuthing && <Link href="/createOrder" asChild>
        <NavBtn text="Create an Order"/>
    </Link>}
    {!isAuthing && <Link href="/bottlePickUp" asChild>
      <NavBtn text="Pick Up Bottles!"/>
    </Link>}
    {!isAuthing && <Link href="/orderViewFinal" asChild>
      <NavBtn text="View your Order"/>
    </Link>}
    {!isAuthing && <Link href="/orderViewCustomer" asChild>
      <NavBtn text="Collapsible"/>
    </Link>}
    <View>
      <Text>
          Currently in active development!{'\n'}{'\n'}
          Made by Tomas Vsetecka
      </Text>
    </View>    
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
  }
})