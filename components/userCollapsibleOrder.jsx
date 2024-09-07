import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import AsyncStorage from '@react-native-async-storage/async-storage';

import pb from '../lib/pocketbase';
import { Link } from 'expo-router';
import { store } from 'expo-router/build/global-state/router-store';

const CollapsibleTab = ({ name, orderID }) => {
    const [activeTab, setActiveTab] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Function to toggle tabs
    const toggleTab = (tabIndex) => {
        setActiveTab(activeTab === tabIndex ? null : tabIndex);
    };

    const handlePickerYes = async () => {
        try {
            const record = await pb.collection('orders').update(orderID, { "hasOrderPicker" : true });
            setIsConfirmed(true);
        } catch (error) {
            console.error(error)
            setIsConfirmed(false)
        }
    }

    const handlePickerNo = async () => {
        try {
            const record = await pb.collection('orders').update(orderID, { "orderPicker" : null });
        } catch (error) {
            console.error(error)
        }
    }
    
    const storeOrderID = async () => {
        try {
          await AsyncStorage.setItem('selectedOrder', orderID);
          console.log('Data successfully saved');
        } catch (e) {
          console.error('Failed to save data', e);
        }
    }

    return (
        <View style={styles.container}>
            {/* Tab 2 */}
            <TouchableOpacity onPress={() => toggleTab(2)} style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={activeTab !== 2}>
                <View style={styles.content}>
                    <Text>Confirm Pickup?</Text>
                    {/* Show Picker Mail */}
                    <Button title="yes" onPress={handlePickerYes}/>
                    <Button title="no" onPress={handlePickerNo}/>
                    {isConfirmed && <Link href="/orderViewFinal" asChild>
                        <Button title="Go To Order Wait Screen" onPress={storeOrderID}/>
                    </Link>}
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginBottom: 5,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        backgroundColor: '#e6e6e6',
    },
});

export default CollapsibleTab;
