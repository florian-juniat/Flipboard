import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors'

const WebViewPerso = props => {
    return (
    <View style={{flex: 1, width: "100%"}}>
        <View style={style.bar}>
            <TouchableOpacity style={{
                alignItems: "center",
                width: 100
            }} onPress={() => props.setPage("home")}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    color: "white",
                }}>&larr;</Text>
            </TouchableOpacity>
        </View>
        <WebView source={{ uri: props.url }} style={style.body} />
    </View>
    )
};

const style = StyleSheet.create({
    bar: {
        marginTop: 30,
        paddingVertical: 20,
        backgroundColor: "black"
    },
    body: {
        flex: 10
    }
});

export default WebViewPerso;