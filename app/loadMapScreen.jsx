import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [markers, setMarkers] = useState([]);

  const findOrders = () => {
    // Example array of JSON objects with longitude and latitude
    const orders = [
      { longitude: -122.4324, latitude: 37.78825 },
      { longitude: -122.4325, latitude: 37.78835 },
      { longitude: -122.4326, latitude: 37.78845 },
    ];

    // Set markers based on received orders
    setMarkers(orders);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Find Orders" onPress={findOrders} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default MapScreen;
