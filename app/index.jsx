import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Link } from 'expo-router';

export default function Page() {
  return (
  <View>
    <Text>BottleBuddy</Text>
    <Link href="/app" asChild>
        <Button title="Image Picker soft"/>
    </Link>

    <Link href="/bottleSelect" asChild>
        <Button title='Give Bottles!'/>
    </Link>

    <Link href="/bottlePickUp" asChild>
        <Button title="Pick Up Bottles!"/>
    </Link>
    <ScrollView>
      <MapView style={styles.map} />
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