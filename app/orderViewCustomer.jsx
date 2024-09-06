import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

import MapView, { Marker } from 'react-native-maps';


const ExpandableTabsScreen = () => {
  // Manage the state for each tab's collapsed status
  const [activeTab, setActiveTab] = useState(null);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // Toggle the collapse state of the tab
  const toggleTab = (tabIndex) => {
    setActiveTab(activeTab === tabIndex ? null : tabIndex);
  };

  return (
    <View style={styles.main}>
        <ScrollView style={styles.container}>
        {/** Tab 1 */}
        <TouchableOpacity onPress={() => toggleTab(1)} style={styles.header}>
            <Text style={styles.headerText}>Tab 1</Text>
        </TouchableOpacity>
        <Collapsible collapsed={activeTab !== 1}>
            <View style={styles.content}>
            <Text>This is content for Tab 1.</Text>
            </View>
        </Collapsible>

        {/** Tab 2 */}
        <TouchableOpacity onPress={() => toggleTab(2)} style={styles.header}>
            <Text style={styles.headerText}>Tab 2</Text>
        </TouchableOpacity>
        <Collapsible collapsed={activeTab !== 2}>
            <View style={styles.content}>
            <Text>This is content for Tab 2.</Text>
            </View>
        </Collapsible>

        {/** Tab 3 */}
        <TouchableOpacity onPress={() => toggleTab(3)} style={styles.header}>
            <Text style={styles.headerText}>Tab 3</Text>
        </TouchableOpacity>
        <Collapsible collapsed={activeTab !== 3}>
            <View style={styles.content}>
            <Text>This is content for Tab 3.</Text>
            </View>
        </Collapsible>

        {/** Tab 4 */}
        <TouchableOpacity onPress={() => toggleTab(4)} style={styles.header}>
            <Text style={styles.headerText}>Tab 4</Text>
        </TouchableOpacity>
        <Collapsible collapsed={activeTab !== 4}>
            <View style={styles.content}>
            <Text>This is content for Tab 4.</Text>
            </View>
        </Collapsible>
        </ScrollView>
        <MapView initialRegion={region} scrollEnabled={false} zoomEnabled={false} style={styles.map}/>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex:1,
    justifyContent: "space-between"
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
