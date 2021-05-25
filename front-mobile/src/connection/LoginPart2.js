import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Image} from 'react-native';

import Colors from '../../constants/Colors'

import Visibility from '../../images/icon/visibility.png'
import VisibilityOff from '../../images/icon/visibility_off.png'


import axios from "axios";


const LoginPart2 = props => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visi, setVisi] = useState(VisibilityOff)


    const handleVisiblePassword = () => {
        setVisi(visi === VisibilityOff ? Visibility : VisibilityOff)
    }

    const handleLogin = () => {
        axios.post("http://192.168.1.30:8080/auth/login", {
            email: email,
            password: password,
        }).then(function(res) {
            if (res.status == 200) {
               props.setToken(res.data.token)
               props.setPage("home")
            } else {
                console.log("probleme")
            }
        })
    }

    return (
        <View style={style.container}>
            <View style={style.top}>
                <TouchableOpacity onPress={() => props.setPage("login")}>
                    <Text style={style.arrow}> &larr;</Text>
                </TouchableOpacity>
            </View>
            <View style={style.body}>
                <Text style={style.title}>Log in</Text>
                <Text style={style.text}>to your existing account</Text>
                <TextInput placeholder="Email" style={style.textinput} 
                value={email}
                onChangeText={text => setEmail(text)}
                />
                <View style={{...style.textinput, justifyContent: "space-between", flexDirection: "row"}}>
                    <TextInput placeholder="Password"  
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={visi === VisibilityOff ? true : false}
                    />
                    <TouchableOpacity onPress={handleVisiblePassword}>
                        <Image style={{
                            marginRight: 20,
                            width: 30,
                            height: 30,
                            marginTop: 10
                        }} source={visi} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={handleLogin}
             disabled={password.length > 0 && email.length > 0 ? false : true} style={style.button}>
                <Text style={{...style.textButton, 
                    opacity: password.length > 0 && email.length > 0 ? 1 : 0.5
                    }}>LOG IN</Text>
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    top: {
        marginTop: 50,
        flex: 1
    },
    arrow: {
        marginLeft: 30,
        fontSize: 30,
        color: Colors.red
    },
    body: {
        flex: 8,
        width: "80%",
        marginHorizontal: "10%",
        marginTop: "10%"
    },
    button : {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignItems: "center",
    },
    textButton : {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10
    },
    text: {
        color: Colors.littlegrey,
        marginBottom: 40
    },
    textinput: {
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        marginTop: 10,
        marginBottom: 30,
        paddingLeft: 20
    }
});

export default LoginPart2;