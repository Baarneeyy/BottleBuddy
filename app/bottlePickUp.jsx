import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Link } from "expo-router"

const MapViewExample = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleSelect = () => {
    setSelectedCoordinates(region);
  };

  return (
    <View style={{ flex: 1 }}>
      <Link href="/" asChild>
        <Pressable>
          <Button title="Go to Menu"/>
        </Pressable>
      </Link>
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        placeholder="Search"
        value={JSON.stringify(selectedCoordinates)}
      />
      <Button title="Select this" onPress={handleSelect} />
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      {selectedCoordinates && (
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Selected Coordinates: {JSON.stringify(selectedCoordinates)}
        </Text>
      )}
    </View>
  );
};

export default MapViewExample;
