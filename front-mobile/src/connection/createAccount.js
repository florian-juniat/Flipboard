import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import Colors from '../../constants/Colors'

import Google from '../../images/icon/google.png'
import Mail from '../../images/icon/mail.png'


import axios from "axios";

const createAccount = props => {

    console.log(props.subjectStart)

    

    return (
        <View style={style.container}>
            <View style={style.top}>
                <TouchableOpacity onPress={() => props.setPage("start")}>
                    <Text style={style.arrow}> &larr;</Text>
                </TouchableOpacity>
            </View>
            <View style={style.body}>
                <Text style={style.title}>{("Create an account to save and share stories").toUpperCase()}</Text>
                <Text style={style.text}>Get the most out of iFlipboard</Text>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "black",
                    marginTop: 70,
                    height: 50
                    }}
                    onPress={() => props.setPage("register")}
                    >
                    <View style={{width:70}}>
                        <Image style={{width: 25, height: 25}} source={Mail} />
                    </View>
                    <Text style={{width:70, color: "white", fontSize: 15,
                    fontWeight: "bold"
                }}>Email</Text>
                    <Text style={{width:70, color: "white"}}></Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: Colors.red,
                    marginTop: 20,
                    height: 50
                    }}>
                    <View style={{width:70}}>
                        <Image style={{width: 25, height: 25}} source={Google} />
                    </View>
                    <Text style={{width:70, color: "white", fontSize: 15,
                    fontWeight: "bold"
                }}>Google</Text>
                    <Text style={{width:70, color: "white"}}></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    top: {
        marginTop: 50,
        flex: 1
    },
    body: {
        flex: 8,
        marginHorizontal: 30,
        paddingTop: 40
    },
    arrow: {
        marginLeft: 30,
        fontSize: 30,
        color: Colors.red
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    text: {
        marginTop: 10,
        fontSize: 15,
        color: Colors.littlegrey
    }
});

export default createAccount;