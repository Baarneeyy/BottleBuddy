import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import MapView from 'react-native-maps';

import pb from '../lib/pocketbase';
import CollapsibleTab from '../components/userCollapsibleOrder';

const ExpandableTabsScreen = () => {
  // Manage the state for each tab's collapsed status
  const [activeTab, setActiveTab] = useState(null);
  const [results, setResults] = useState({ items: [] }); // Ensure initial state has an empty items array
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Function to load orders
  const loadOrders = async () => {
    try {
      const resultList = await pb.collection('orders').getList(1, 50, {
        filter: 'orderPicker != ""',
      });
      setResults(resultList); // Set the results to the fetched data
      console.log(resultList.items.length)
    } catch (error) {
      console.error(error);
    }
  };

  // Load orders once when the component is mounted
  useEffect(() => {
    loadOrders();
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <View style={styles.main}>
      <ScrollView style={styles.container}>
        {/* Map through results and render CollapsibleTab for each item */}
        {results.items.length > 0 ? (
          results.items.map((result, index) => (
            <CollapsibleTab name={result["created"]} orderID={result["id"]} key={index} />
          ))
        ) : (
          <Text>No orders available</Text>
        )}
      </ScrollView>

      {/* Map at the bottom */}
      <MapView initialRegion={region} scrollEnabled={false} zoomEnabled={false} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  map: {
    width: '100%',
    height: '35%',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
    backgroundColor: '#e6e6e6',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ExpandableTabsScreen;
