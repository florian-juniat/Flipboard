import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, TouchableOpacityComponent} from 'react-native';


import Colors from '../../constants/Colors'
import First from '../../images/paysage/first.jpg'
import Second from '../../images/paysage/second.jpg'

import Like from '../../images/icon/like.png'
import LikeRed from '../../images/icon/like_red.png'


import Weather1 from '../../images/paysage/weather.jpg'
import Weather2 from '../../images/paysage/weather2.jpg'
import Weather3 from '../../images/paysage/weather3.jpg'

import Deco1 from '../../images/paysage/deco1.jpg'
import Deco2 from '../../images/paysage/deco2.jpg'
import Deco3 from '../../images/paysage/deco3.jpg'

import axios from "axios";

const Articles = props => {

    const [info, setInfo] = useState({
        title: "",
        articles: []
    })

    const [like, setLike] = useState(Like)

    const [getOnce, setGetOnce] = useState(false)

    if (getOnce == false) {
        setGetOnce(true)

        axios.get("http://192.168.1.30:8080/home/articles/" + props.nameArticle,{ headers: { Authorization: props.token } }
         ).then(res => {

            if (res.status == 200) {
                res.data.articles = res.data.articles.filter(item => item.picture.length > 0)
                setInfo(res.data)
            } else {
                console.log("pb")
            }
        })
    }

    const handleLikePress = (id, like) => {
        if (like) {
            axios.post("http://192.168.1.30:8080/home/unlike", {
                id_article: id
            }, {headers: { Authorization: props.token } }).then(function(res) {
                if (res.status == 200) {
                    axios.get("http://192.168.1.30:8080/home/articles/" + props.nameArticle,{ headers: { Authorization: props.token } }
                    ).then(response => {
                        if (response.status == 200) {
                            response.data.articles = response.data.articles.filter(item => item.picture.length > 0)
                            setInfo(response.data)
                        } else {
                            console.log("pb")
                        }
                    })
                } else {
                    console.log("pb")
                }
            })
        } else {
            axios.post("http://192.168.1.30:8080/home/like", {
                id_article: id
            }, {headers: { Authorization: props.token } }).then(function(res) {
                if (res.status == 200) {
                    axios.get("http://192.168.1.30:8080/home/articles/" + props.nameArticle,{ headers: { Authorization: props.token } }
                    ).then(response => {
                        if (response.status == 200) {
                            response.data.articles = response.data.articles.filter(item => item.picture.length > 0)
                            setInfo(response.data)
                        } else {
                            console.log("pb")
                        }
                    })
                } else {
                    console.log("pb")
                }
            })
        }
    }

    return (
        <View style={style.container}>
            <View style={style.bar}>
                <TouchableOpacity style={{
                    alignItems: "center",
                    width: 100
                }} onPress={() => props.setPage("home")}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        color: Colors.red,
                    }}>&larr;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 300, alignItems: "center"}} onPress={() => console.log("test : ", info.articles.length)}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>
                        {props.nameArticle}
                    </Text>
                </TouchableOpacity>
                <Text style={{width: 100}}></Text>
            </View>
            <View style={style.body}>
                <ScrollView
                    style={style.body}
                    horizontal={false}
                    contentContainerStyle={{ height: `${100 * (info.articles.length)}%` }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    decelerationRate="normal"
                    pagingEnabled
                    >
                        {info.articles.map(item =>
                            
                            <TouchableOpacity activeOpacity={1} key={item.id} style={style.element}
                            onPress={() => {
                                props.setUrlWebView(item.url)
                                props.setPage("webview")
                            }}>
                                <Image source={{uri : item.picture}} style={{
                                    width: "100%",
                                    height: "45%",
                                }}/>
                                <View style={{
                                    height: "45%",
                                    width: "100%",
                                    backgroundColor: "white"
                                }}>
                                    <Text style={style.title}> {item.title} </Text>
                                    <Text style={style.textBody}> {item.snippet} </Text>
                                </View>
                                <View style={{
                                    height: "10%",
                                    backgroundColor: "black",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20
                                }}>
                                    <Text style={{color: "white",
                                    fontSize: 15,
                                    fontWeight: "bold"
                                }}></Text>
                                    <TouchableOpacity onPress={() => handleLikePress(item.id, item.like)}>
                                        <Image style={{
                                            width: 30,
                                            height: 30
                                        }} source={item.like ? LikeRed : Like} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                </ScrollView>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    bar: {
        marginTop: 30,
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20
    },
    body: {
        flex: 10,
        width: "100%"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 40,
        marginHorizontal: 20,
        textAlign: "center"
    },
    element: {
        width: "100%",
        flex: 1,
        marginBottom: 20,
        backgroundColor: "black"
    },
    textBody: {
        marginTop: 20,
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default Articles;