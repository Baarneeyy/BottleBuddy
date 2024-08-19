import { View, Text, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
//import MapView from 'react-native-maps';
//<MapView style={styles.map} />
import { Link } from 'expo-router';

export default function Page() {


  return (
  <View>
    <Text>BottleBuddy</Text>
    <Link href="/app" asChild>
      <Pressable>
        <Text>Image Picker soft</Text>
      </Pressable>
    </Link>

    <Link href="/bottleSelect" asChild>
        <Pressable>
          <Text>Create an Order!</Text>
        </Pressable>
    </Link>
    <Link href="/bottlePickUp" asChild>
      <Pressable>
        <Text>Pick Up Bottles!</Text>
      </Pressable>
    </Link>
    <ScrollView>
      <Text>
          Currently in active development!{'\n'}{'\n'}
          Made by Tomas Vsetecka
      </Text>
    </ScrollView>
    
  </View>
)}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})