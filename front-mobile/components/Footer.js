import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import ImageHome from '../images/icon/home.png'
import ImageSquare from '../images/icon/square.png'
import ImageSearch from '../images/icon/search.png'
import ImageNotif from '../images/icon/notif.png'
import ImageProfil from '../images/icon/profil.png'

import Colors from '../constants/Colors'

const Footer = props => {

    /*
    <TouchableOpacity style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.red,
                borderBottomWidth: props.page === "notif" ? 4 : 0,
            }}
            onPress={() => props.setPage("notification")}
            >
                <Image source={ImageNotif} style={{
                    width: 30,
                    height: 30,
                    marginBottom: 10,
                    opacity: props.page === "notif" ? 1 : 0.4
                }} />
            </TouchableOpacity>
            */


    return (
        <View style={style.footer}>
            <TouchableOpacity style={{
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.red,
                borderBottomWidth: props.page === "home" ? 4 : 0,
            }}
            onPress={() => props.setPage("home")}
            >
                <Image source={ImageHome} style={{
                    width: 25,
                    height: 25,
                    marginBottom: 10,
                    opacity: props.page === "home" ? 1 : 0.4
                }} />
            </TouchableOpacity>
            <TouchableOpacity style={{
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.red,
                borderBottomWidth: props.page === "subscribe" ? 4 : 0,
            }}
            onPress={() => props.setPage("subscribe")}
            >
                <Image source={ImageSquare} style={{
                    width: 25,
                    height: 25,
                    marginBottom: 10,
                    opacity: props.page === "subscribe" ? 1 : 0.4
                }} />
            </TouchableOpacity>
            <TouchableOpacity style={{
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.red,
                borderBottomWidth: props.page === "search" ? 4 : 0,
            }}
            onPress={() => props.setPage("search")}
            >
                <Image source={ImageSearch} style={{
                    width: 40,
                    height: 40,
                    marginBottom: 10,
                    opacity: props.page === "search" ? 1 : 0.4
                }} />
            </TouchableOpacity>
            
            <TouchableOpacity style={{
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.red,
                borderBottomWidth: props.page === "profil" ? 4 : 0,
            }}
            onPress={() => props.setPage("profil")}
            >
                <Image source={ImageProfil} style={{
                    width: 25,
                    height: 25,
                    marginBottom: 10,
                    opacity: props.page === "profil" ? 1 : 0.4
                }} />
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    footer: {
        height: "10%",
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30
    },
});

export default Footer;