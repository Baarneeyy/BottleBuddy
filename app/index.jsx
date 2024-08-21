import { View, Text, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
//import MapView from 'react-native-maps';
//<MapView style={styles.map} />
import { Link } from 'expo-router';

import PocketBase from 'pocketbase';
const pb = new PocketBase('https://ce67-46-229-238-250.ngrok-free.app');

export default function Page() {

  const auth = async (e) => {
    //e.preventDefault()
    try {
      //pb.autoCancellation(false)
      const authData = await pb.collection('users').authWithPassword('vsetotv@gmail.com', 'ZtudZw9x1xGV7k');
      console.log(authData)
    } catch (error) {
      console.error(error);
      console.log(error.originalError); // true
    }
    //pb.authStore.clear();
  };

  const print = () => {
    alert(pb.authStore.token)
    pb.authStore.clear();
  }

  return (
  <View style={styles.homeMenuContainer}>
    <Text>BottleBuddy</Text>
    <Link href="/exampleForm" asChild>
      <Pressable style={styles.homeMenuItem}>
        <Text>Image Picker soft</Text>
      </Pressable>
    </Link>

    <Link href="/bottleSelect" asChild>
        <Pressable style={styles.homeMenuItem}>
          <Text>Create an Order!</Text>
        </Pressable>
    </Link>
    <Link href="/bottlePickUp" asChild>
      <Pressable style={styles.homeMenuItem}>
        <Text>Pick Up Bottles!</Text>
      </Pressable>
    </Link> 
    <Link href="/userRegistration" asChild>
      <Pressable style={styles.homeMenuItem}>
        <Text>Join!</Text>
      </Pressable>
    </Link> 
    <ScrollView>
      <Text>
          Currently in active development!{'\n'}{'\n'}
          Made by Tomas Vsetecka
      </Text>
    </ScrollView>
    <Pressable style={styles.homeMenuItem} onPress={auth}>
      <Text>Auth!</Text>
    </Pressable>
    <Pressable style={styles.homeMenuItem} onPress={print}>
      <Text>DeAuth!</Text>
    </Pressable>     
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