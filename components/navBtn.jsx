import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const NavBtn = ({ onPress, text, styles }) => {
    return (
        <Pressable
            onPress={onPress}
            //Gets Button's 'pressed' state -> boolean;
            style={({ pressed }) => [
                style.btn,
                pressed && style.pressed, //dynamically adds the 'pressed' style
                styles, //any additional user-added styles
            ]}
        >

            <Text style={style.text}>{text}</Text>
        </Pressable>
    );
};

const style = StyleSheet.create({
    btn: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    pressed: {
        backgroundColor: '#0056B3',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default NavBtn;