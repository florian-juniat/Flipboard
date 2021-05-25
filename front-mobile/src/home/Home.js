import React, {useState} from 'react';
import {Dimensions, View, StyleSheet, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ImageBackground} from 'react-native';

import Footer from '../../components/Footer'

import Colors from '../../constants/Colors'

import First from '../../images/paysage/first.jpg'
import Second from '../../images/paysage/second.jpg'
import Third from '../../images/paysage/third.jpg'

import Weather1 from '../../images/paysage/weather.jpg'
import Weather2 from '../../images/paysage/weather2.jpg'
import Weather3 from '../../images/paysage/weather3.jpg'

import Deco1 from '../../images/paysage/deco1.jpg'
import Deco2 from '../../images/paysage/deco2.jpg'
import Deco3 from '../../images/paysage/deco3.jpg'

import FlipCard from 'react-native-flip-card'
import axios from "axios";



const Home = props => {


    const [canFlipCard, setCanFlipCard] = useState(true)
    const [infoArticle, setInfoArticle] = useState([])

    const screenWidth = Math.round(Dimensions.get('window').width);
    const [scroller, setScroller] = useState(null)
    const [scrollerBar, setScrollerBar] = useState(null)


    const [FirstImage, setFirstImage] = useState(First)
    const [SecondImage, setSecondImage] = useState(Second)
    const [ThirdImage, setThirdImage] = useState(Third)

    const [indiceInfo, setIndiceInfo] = useState(0)
    const [getInfo, setGetInfo] = useState(false)
    const [info, setInfo] = useState({
        info: [{
            nom_du_tag: "",
            first: {
                title: "",
                image : "",
                who: ""
            },
            second: {
                title: "",
                image : "",
                who: ""
            }, 
            third: {
                title: "",
                image : "",
                who: ""
            },
            id: "0"
        }],
        themes: []
    })

    if (getInfo === false) {
        setGetInfo(true)
        axios.get("http://192.168.1.30:8080/home/",{ headers: { Authorization: props.token } }
         ).then(response => {

            if (response.status == 200) {

                var res = response.data
                console.log("====\n", res)
                res.tags.sort()

                var newTheme = []

                var newInfoInter = []

                for (var i = 0; i < res.info.length; i++) {
                    newInfoInter.push({...res.info[i], indice: i, id: i.toString()})
                }
                res.info = newInfoInter

                for (var i = 0; i < res.tags.length; i++) {
                    newTheme.push({title: res.tags[i], id: i.toString()})
                }

                var newInfo = {
                    info: res.info,
                    themes: newTheme
                }

                setInfo(newInfo)
            } else {
                console.log("probleme")
            }
        })

    }

    const handlePressElementInBar = item => {
        if (item.indice === indiceInfo) {
            return
        }
        if (scroller === null || scrollerBar === null) {
            return
        }
        scroller.scrollTo({x: item.indice * screenWidth, y: 0,  duration: 500})
    }

    const handleChangeToInfo = () => {

    }

    const handleAddTags = title => {
        axios.post("http://192.168.1.30:8080/home/add-tags", {
            addtags: title
        }, {headers: { Authorization: props.token } }).then(function(response2) {
            if (response2.status == 200) {
                axios.get("http://192.168.1.30:8080/home/",{ headers: { Authorization: props.token } }
                ).then(response => {

                    if (response.status == 200) {

                        var res = response.data
                        res.tags.sort()

                        var newTheme = []

                        var newInfoInter = []

                        for (var i = 0; i < res.info.length; i++) {
                            newInfoInter.push({...res.info[i], indice: i})
                        }
                        res.info = newInfoInter

                        for (var i = 0; i < res.tags.length; i++) {
                            newTheme.push({title: res.tags[i], id: i.toString()})
                        }

                        var newInfo = {
                            info: res.info,
                            themes: newTheme
                        }

                        setInfo(newInfo)
                    } else {
                        console.log("probleme")
                    }
                })
            } else {
                console.log("pb")
            }
        })
    }

    const changeMoveScroll = x => {
        var intvalue = Math.floor( x / screenWidth);
        setIndiceInfo(intvalue)
        scrollerBar.scrollTo({x: intvalue * 170, y: 0, duration: 500, animated: true})
    }

    return (
        <View style={style.container}>
            <View style={style.bar}>
                <ScrollView
                ref={(scroller2) => {
                    setScrollerBar(scroller2)
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >
                    {info.info.map(item => 
                        <TouchableOpacity key={item.id}
                        onPress={() => handlePressElementInBar(item)}
                        style={{
                            borderColor: "red",
                            marginRight: 0,
                            marginLeft: 20,
                            width: 150,
                            paddingBottom: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottomWidth: item.indice === indiceInfo ? 3 : 0
                        }}>
                            <Text style={{...style.barTitle,
                            color: item.indice === indiceInfo ? "black" : "#BBBBBB"
                            }}>{item.nom_du_tag.toUpperCase()}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={{
                            borderColor: "red",
                            marginRight: 0,
                            marginLeft: 20,
                            width: 400,
                            paddingBottom: 10,
                        }}
                        
                        onPress={() => handlePressElementInBar({indice: info.info.length + 1})}

                        >
                            <Text style={{...style.barTitle,
                            color: "#BBBBBB"
                            }}>{"Qu'est ce qui vous intéressent".toUpperCase()}</Text>
                        </TouchableOpacity>
                </ScrollView>
            </View>
            <ScrollView
                ref={(scroller2) => {
                    setScroller(scroller2)
                }}
                onScroll={data => {
                    changeMoveScroll(data.nativeEvent.contentOffset.x);
                }}
                horizontal={true}
                contentContainerStyle={{ width: `${100 * (info.info.length + 1)}%` }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal"
                pagingEnabled
                >



            {info.info.map(item => 
            
                <FlipCard key={item.id}
                    style={{
                        backgroundColor: "white",
                        flex: 1,
                        width: screenWidth,
                    }}
                    friction={10}
                    perspective={8000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                    onFlipEnd={(isFlipStart) => {
                        props.setNameArticle(item.nom_du_tag)
                        props.setPage("articles")
                    }}
                    >
                    <View style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity 
                        onPress={() => {
                            props.setUrlWebView(item.first.url)
                            props.setPage("webview")
                        }}
                        activeOpacity={1}
                        style={{
                            width: screenWidth,
                            height: "50%"
                        }}>
                            <ImageBackground source={{uri: item.first.picture}} style={{
                                width: screenWidth,
                                height: "100%"
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginTop: "45%",
                                    marginHorizontal: 20
                                }}>{item.first.title}</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: "row",
                            height: "30%",
                            justifyContent: "space-between",
                            marginTop: 20,
                            marginHorizontal: 10
                        }}>
                            <TouchableOpacity
                            activeOpacity={1} style={{
                                marginHorizontal: 10,
                                flex: 1,
                                alignItems: "center",
                            }}
                            onPress={() => {
                                props.setUrlWebView(item.second.url)
                                props.setPage("webview")
                            }}
                            >
                                <Image source={{uri: item.second.picture}} style={{
                                    width: screenWidth / 2 - screenWidth / 10,
                                    height: "70%"
                                }} />
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>{item.second.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={{
                                marginHorizontal: 10,
                                flex: 1,
                                alignItems: "center"
                            }}
                            onPress={() => {
                                props.setUrlWebView(item.third.url)
                                props.setPage("webview")
                            }}
                            >
                                <Image source={{uri: item.third.picture}} style={{
                                    width: screenWidth / 2 - screenWidth / 10,
                                    height: "70%"
                                }} />
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>{item.third.title}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Back Side */}
                    <View style={{
                        flex: 1
                    }}>
                        <View style={{flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                        }}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>chargement...</Text>
                        </View>
                    </View>
                </FlipCard>

            )}

            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ScrollView style={{
                    borderColor: Colors.grey,
                    borderTopWidth: 2,
                    flex: 1,
                    width: "100%"
                }}>
                    {info.themes.map(item =>
                        <TouchableOpacity 
                        onPress={() => handleAddTags(item.title)}
                        key={item.id} style={{
                            width: "100%",
                            
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 30
                            }}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>

            </ScrollView>
            <Footer setPage={props.setPage} page="home" />
        </View>
    )
};

const style = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
    },
    bar: {
        paddingTop: 50,
    },
    body: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    barTitle: {
        fontWeight: "bold",
        fontSize: 20,
    }
});

export default Home;