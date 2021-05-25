import React, {useState} from 'react';
import {Dimensions, View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';

import MyBackground from '../../images/concert.jpg'
import Logo from '../../images/flipboard_logo.png'

import Colors from '../../constants/Colors'

const Intro = props => {

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);


    return (
        <View style={style.container}>
            <ImageBackground style={style.containerImage} source={MyBackground}>
            </ImageBackground>
            <View style={style.containerTitle}>
                <Text style={style.title}>NEWS FOR</Text>
                <Text style={style.title}>OUR TIME</Text>
                <Text style={style.text}>Personalised for any interest</Text>
                <TouchableOpacity style={style.touchable} onPress={
                    () => props.setPage("start")
                }>
                    <Text style={style.textButton}>Get started</Text>
                </TouchableOpacity>
            </View>
            <View style={{...style.block,
                width: screenWidth / 3,
                height: screenWidth / 3,
                left: screenWidth / 3,
                top: screenHeight / 3 * 2 - 1 / 3 * screenHeight / 3 * 2
                }}></View>
            <View style={{...style.block,
                width: screenWidth / 3,
                height: screenWidth / 3,
                left: screenWidth / 3 * 2,
                top: screenHeight / 3 * 2 - 1 / 3 * screenHeight / 3 * 2
            }}></View>
            <View style={{...style.block,
                width: screenWidth / 3,
                height: screenWidth / 3,
                left: screenWidth / 3 * 2,
                top: screenHeight / 3 * 2 - 1 / 3 * screenHeight / 3 * 2 - screenWidth / 3
            }}></View>
            
            <View style={{...style.flipboard,
                width: "60%",
                left: "20%",
                top: "15%"
            }}>
                <Image source={Logo} style={{width: 50, height: 50}}/>
                <Text style={{
                    color:"white",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: 10
                }}>IFLIPBOARD</Text>
            </View>

        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    containerImage: {
        flex: 3,
        width: "100%"
    },
    containerTitle: {
        flex: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    touchable: {
        backgroundColor: Colors.red,
        paddingHorizontal: 100,
        paddingVertical: 20,
        borderRadius: 5,
        marginTop: 30
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,
        marginTop: 5,
        fontWeight: "bold"
    },
    textButton: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    block: {
        backgroundColor: "white",
        position: "absolute",
    },
    flipboard: {
        flexDirection: "row",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Intro;