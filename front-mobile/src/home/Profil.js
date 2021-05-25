import React, {useState} from 'react';
import { Dimensions ,View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';

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

import Bin from '../../images/icon/bin.jpg'

import axios from "axios";


const Profil = props => {

    const screenWidth = Math.round(Dimensions.get('window').width);

    const [choiceDisplay, setChoiceDisplay] = useState("likes")
    const [urlTags, setUrlTags] = useState([])

    const [info, setInfo] = useState({
        likes: [],
        tags: [],
        ajout: []
    })

    const [getInfo, setGetInfo] = useState(false)

    if (getInfo === false) {
        setGetInfo(true)
        axios.get("http://192.168.1.30:8080/profil/",{ headers: { Authorization: props.token } }
         ).then(response => {
            if (response.status == 200) {
                var res = response.data
                console.log("===> res : ", res)
                var newTags = []
                for (var i = 0; i < res.tags.length; i++) {
                    axios.get("https://pixabay.com/api/?key=16525019-19dc27e6c12308ff23c7d6fc6&q=" + res.tags[i].tag + "&image_type=photo&pretty=true"
                    ).then(response2 => {
                       if (response2.status == 200) {
                           var newUrlTags = urlTags
                           newUrlTags.push(response2.data.hits[0].largeImageURL)
                            setUrlTags(newUrlTags)
                       } else {
                           console.log("test : ", res.tags[i].tag)
                       }
                    })
                }
                setInfo(res)
            } else {
                console.log("problem")
            }
        })
    }


    const [deleteVisible, setDeleteVisible] = useState("")

    var del = null

    if (deleteVisible != "") {
        del = <View style={{
            position: "absolute",
            width: "70%",
            left: "15%",
            top: "10%",
            height: "50%",
            alignItems: "center",
            elevation: 10,
            backgroundColor: "white"
        }}>
            <View style={style.barTitle}>
                <Text style={{
                    width: "20%",
                }}>
                </Text>
                <Text style={{
                    textAlign: "center",
                    width: "60%",
                    fontSize: 15,
                }}> options </Text>
                <TouchableOpacity style={{width: "20%",  textAlign: "center", }}
                    onPress={() => setDeleteVisible("")}
                >
                    <Text style={{fontSize: 20}}> &times; </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    backgroundColor: Colors.red,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginBottom: 60
                }}
                onPress={() => {
                    axios.post("http://192.168.1.30:8080/home/remove-tags",{
                        removetags: deleteVisible
                    },
                    { headers: { Authorization: props.token } }
                    ).then(response3 => {

                        if (response3.status == 200) {
                            setDeleteVisible("")
                            axios.get("http://192.168.1.30:8080/profil/",{ headers: { Authorization: props.token } }
                            ).then(response => {
                                if (response.status == 200) {
                                    var res = response.data
                                    var newTags = []
                                    setUrlTags([])
                                    for (var i = 0; i < res.tags.length; i++) {
                                        axios.get("https://pixabay.com/api/?key=16525019-19dc27e6c12308ff23c7d6fc6&q=" + res.tags[i].tag + "&image_type=photo&pretty=true"
                                        ).then(response2 => {
                                        if (response2.status == 200) {
                                            var newUrlTags = urlTags
                                            newUrlTags.push(response2.data.hits[0].largeImageURL)
                                                setUrlTags(newUrlTags)
                                                console.log(response2.data.hits[0])
                                        } else {
                                            console.log("test : ", res.tags[i].tag)
                                        }
                                        })
                                    }
                                    setInfo(res)
                                } else {
                                    console.log("problem")
                                }
                        })
                        } else {
                            console.log("probleme")
                        }
                    })
                }}
                >
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>{("Supprimé : " + deleteVisible + " ?")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }


    var body = <View style={style.bodyBody}>
    </View>

    if (choiceDisplay == "ajout") {
        body = <View style={style.bodyBody}>
            <ScrollView>
            {info.ajout.map(item => 
                <TouchableOpacity key={item.id} style={{
                    marginVertical: 5,
                    paddingVertical: 10,
                    width: 350,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 10
                }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={{uri: item.image}} style={{
                        height: 60,
                        width: 60,
                        marginRight: 20
                    }} />
                    <Text style={{
                        color: "black",
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>{item.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        console.log("id : ", item.id)
                        axios.post("http://192.168.1.30:8080/home/" + item.id.toString() + "/delete-article",{},
                        { headers: { Authorization: props.token } }
                        ).then(response3 => {
    
                            if (response3.status == 200) {
                                setDeleteVisible("")
                                axios.get("http://192.168.1.30:8080/profil/",{ headers: { Authorization: props.token } }
                                ).then(response => {
                                    if (response.status == 200) {
                                        var res = response.data
                                        var newTags = []
                                        setUrlTags([])
                                        for (var i = 0; i < res.tags.length; i++) {
                                            axios.get("https://pixabay.com/api/?key=16525019-19dc27e6c12308ff23c7d6fc6&q=" + res.tags[i].tag + "&image_type=photo&pretty=true"
                                            ).then(response2 => {
                                            if (response2.status == 200) {
                                                var newUrlTags = urlTags
                                                newUrlTags.push(response2.data.hits[0].largeImageURL)
                                                    setUrlTags(newUrlTags)
                                                    console.log(response2.data.hits[0])
                                            } else {
                                                console.log("test : ", res.tags[i].tag)
                                            }
                                            })
                                        }
                                        setInfo(res)
                                    } else {
                                        console.log("problem")
                                    }
                            })
                            } else {
                                console.log("probleme")
                            }
                        })
                    }}>
                        <Image source={Bin} style={{width: 30, height: 40}} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
            </ScrollView>
        </View>
    }

    if (choiceDisplay == "likes") {
        body = <View style={style.bodyBody}>
        <ScrollView>
        {info.likes.map(item => 
            <TouchableOpacity key={item.id} style={{
                marginVertical: 5,
                paddingVertical: 10,
                width: 350,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10
            }}
            onPress={() => {
                props.setUrlWebView(item.url)
                props.setPage("webview")
            }}
            >
                <Image source={{uri: item.image}} style={{
                    height: 60,
                    width: 60,
                    marginRight: 20
                }} />
                <Text style={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold"
                }}>{item.title}</Text>
            </TouchableOpacity>
        )}
        </ScrollView>
    </View>
    }
    if (choiceDisplay == "tags") {
        body = <View style={style.bodyBody}>
            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    flex: 1,
                    flexWrap: 'wrap',
                    width: "100%"
                }}>
                    {info.tags.map(item => 
                        <TouchableOpacity onPress={() => {
                            props.setNameArticle(item.tag)
                            props.setPage("articles")
                        }} key={item.id} style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50%",
                            marginBottom: 10
                        }}
                        onPress={() => {
                            props.setUrlWebView(item.url)
                            props.setPage("webview")
                        }}
                        >
                            <ImageBackground source={{uri : urlTags[item.id]}} style={{
                                width: screenWidth / 2 - 10,
                                height: screenWidth / 2 - 10,
                                
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginHorizontal: 10
                                }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 20,
                                        fontWeight: "bold"
                                    }}>{item.tag}</Text>
                                    <TouchableOpacity onPress={() => setDeleteVisible(item.tag)}>
                                        <Text style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: 25,
                                            marginBottom: 10
                                        }}>...</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                </View>

            </ScrollView>
            {del}

        </View>
    }




    return (
        <View style={style.container}>
            <View style={style.bar}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>
                    Profil
                </Text>
                <TouchableOpacity onPress={() => props.setPage("intro")}
                    style={{
                        backgroundColor: Colors.red,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderRadius: 10
                    }}>
                    <Text style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <View style={style.body}>
                <View style={style.barBody}>
                    <TouchableOpacity style={{...style.change,
                    }}
                    onPress={() => setChoiceDisplay("likes")}
                    >
                        <Text style={{
                            color: choiceDisplay != "likes" ? "grey" : "black",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>{info.likes.length}</Text>
                        <Text style={{
                            color: choiceDisplay != "likes" ? "grey" : "black",
                            fontWeight: "bold",
                            fontSize: 13
                        }}>LIKES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...style.change,
                    }}
                    onPress={() => setChoiceDisplay("tags")}
                    >
                        <Text style={{
                            color: choiceDisplay == "tags" ? "black" : "grey",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>{info.tags.length}</Text>
                        <Text style={{
                            color: choiceDisplay == "tags" ? "black" : "grey",
                            fontWeight: "bold",
                            fontSize: 13
                        }}>TAGS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...style.change,
                    }}
                    onPress={() => setChoiceDisplay("ajout")}
                    >
                        <Text style={{
                            color: choiceDisplay == "ajout" ? "black" : "grey",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>{info.ajout.length}</Text>
                        <Text style={{
                            color: choiceDisplay == "ajout" ? "black" : "grey",
                            fontWeight: "bold",
                            fontSize: 13
                        }}>ADD</Text>
                    </TouchableOpacity>
                </View>
                {body}
            </View>
            <Footer setPage={props.setPage} page="profil" />
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
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        alignItems: "center",
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
        alignItems: "center",
    },
    barBody: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bodyBody: {
        flex: 6,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    change: {
        alignItems: "center",
        justifyContent: "center"
    },
    barTitle: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 15
    },
});

export default Profil;