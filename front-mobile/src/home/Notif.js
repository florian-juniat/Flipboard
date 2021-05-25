import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import Footer from '../../components/Footer'


const Notification = props => {
    return (
        <View style={style.container}>
            <View style={style.bar}>
            </View>
            <View style={style.body}>
                <Text>notif</Text>
            </View>
            <Footer setPage={props.setPage} page="notif" />
        </View>
    )
};

const style = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
    },
    bar: {
        flex: 1,
        paddingTop: 50,
    },
    footer: {
        flex: 1,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Notification;