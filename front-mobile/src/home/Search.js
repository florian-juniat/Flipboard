import React, {useState} from 'react';
import { Dimensions ,View, StyleSheet, Text, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground} from 'react-native';

import Footer from '../../components/Footer'

import Colors from '../../constants/Colors'

import ImageSearch from '../../images/icon/search2.png'
import { setAutoFocusEnabled } from 'expo/build/AR';

import First from '../../images/paysage/first.jpg'
import Second from '../../images/paysage/second.jpg'
import Third from '../../images/paysage/third.jpg'

import Weather1 from '../../images/paysage/weather.jpg'
import Weather2 from '../../images/paysage/weather2.jpg'
import Weather3 from '../../images/paysage/weather3.jpg'

import Deco1 from '../../images/paysage/deco1.jpg'
import Deco2 from '../../images/paysage/deco2.jpg'
import Deco3 from '../../images/paysage/deco3.jpg'

import axios from "axios";


const Search = props => {
    const screenWidth = Math.round(Dimensions.get('window').width);


    const [info, setInfo] = useState([])
    const [getInfo, setGetInfo] = useState(false)
    const [indice, setIndice] = useState(0)

    if (getInfo === false) {
        setGetInfo(true)
        axios.get("http://192.168.1.30:8080/search/explorer",{ headers: { Authorization: props.token } }
         ).then(response => {

            if (response.status == 200) {
                var res = response.data
                console.log("====\n", res)
                setInfo(res)
            } else {
                console.log("pb")
            }
        })
    }

    var body = null

    if (info.length > 0 && getInfo === true) {
        body = <View style={style.body}>
            <ScrollView>
                <ScrollView style={{marginBottom: 50, marginHorizontal: 5}}
                    horizontal={true}
                    contentContainerStyle={{ width: `${100 * (info[indice].inedit.length)}%` }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    decelerationRate="normal"
                    pagingEnabled
                    >
                        {info[indice].inedit.map(item => 

                        <TouchableOpacity activeOpacity={1}
                        key={item.id}
                        style={{
                            height: 200,
                            flex: 1
                        }}
                        onPress={() => {
                            props.setUrlWebView(item.url)
                            props.setPage("webview")
                        }}
                        >
                            <ImageBackground
                            source={{uri : item.image}}
                            style={{
                                height: 200,
                                flex: 1
                            }}
                            >
                                <Text style={{
                                    color: "white",
                                    fontSize: 25,
                                    margin: 10,
                                    fontWeight: "bold"
                                }}>{item.title}</Text>

                            </ImageBackground>   
                        </TouchableOpacity> 
                        )}
                    

                </ScrollView>
                <View style={{
                    marginTop: 20,
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: 'wrap',
                    width: "100%",
                }}>
                    {
                        info[indice].info.map(item => 

                            <TouchableOpacity key={item.id} style={{
                                width: "50%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => {
                                props.setUrlWebView(item.url)
                                props.setPage("webview")
                            }}
                            >
                                <ImageBackground 
                                source={{uri: item.image}}
                                style={{
                                    width: screenWidth / 2 - 10,
                                    height: screenWidth / 2 - 10,
                                    marginBottom: 40
                                }}>
                                    <Text style={{
                                        color: "white",
                                        margin: 5,
                                        fontSize: 15,
                                        fontWeight: "bold"
                                    }}>{item.title}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }

                </View>
            </ScrollView>
        </View>
    }

    return (
        <View style={style.container}>
            <View style={style.bar}>
                <Text style={style.title}>Explore</Text>
                <TouchableOpacity style={style.input} activeOpacity={1} onPress={() => props.setPage("searchsecond")}>
                    <Image source={ImageSearch} style={{
                        width: 25, height: 25, opacity: 0.2, marginRight: 20
                    }} />
                    <Text style={{
                        color: "#BBBBBB"
                    }}>
                        Search iFlipboard
                    </Text>
                </TouchableOpacity>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="normal"
                    pagingEnabled
                    >
                    {info.map(item => 
                    <TouchableOpacity key={item.id} style={{
                        marginRight: 20,
                        marginTop: 20
                    }}
                    onPress={() => setIndice(item.indice)}
                    >
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: "bold",
                            color: item.indice === indice ? Colors.red : Colors.littlegrey
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
            {body}
            <Footer setPage={props.setPage} page="search" />
        </View>
    )
};

const style = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
    },
    bar: {
        flex: 3,
        paddingTop: 50,
        marginHorizontal: 20,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 3
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
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        marginTop: 20,
        height: 50,
        backgroundColor: Colors.grey,
        alignItems: "center",
        paddingLeft: 20,
        flexDirection: "row"
    }
});

export default Search;