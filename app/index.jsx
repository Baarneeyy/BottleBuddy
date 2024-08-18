import { View, Text, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
  <View>
    <Text>BottleBuddy</Text>
    <Link href="/app" asChild>
        <Pressable>
            <Text>
                Image Picker soft
            </Text>
        </Pressable>
    </Link>
    <Text>
        Currently in active development!<br/><br/>
        Made by Tomas Vsetecka
    </Text>
  </View>
)}
