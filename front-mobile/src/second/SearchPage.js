import React, {useState} from 'react';
import {ScrollView, Keyboard ,View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Image} from 'react-native';
import Search from '../home/Search';

import Colors from '../../constants/Colors'

import ImageSearch from '../../images/icon/search2.png'
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


const SearchPage = props => {

    const [info, setInfo] = useState([])

    const [search, setSearch] = useState("")


    const handleSearch = () => {
        Keyboard.dismiss()

        axios.post("http://192.168.1.30:8080/search/",{
            search: search
        },
        { headers: { Authorization: props.token } }
         ).then(response => {

            if (response.status == 200) {
                var res = []
                for (var i = 0; i < response.data.length; i++) {
                    res.push({
                        id: response.data[i].id,
                        Image: response.data[i].picture,
                        title: response.data[i].title,
                        who: response.data[i].author,
                        url: response.data[i].url
                    })
                }
                res = res.filter(item => item.Image.length > 0)
                setInfo(res)
            } else {
                console.log("pb")
            }
        })

    }

    return (
        <View style={style.container}>
            <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={0} style={style.bar}>
                <TouchableOpacity onPress={() => props.setPage("search")}>
                    <Text style={{
                        color: Colors.littlegrey,
                        marginLeft: 20,
                        fontSize: 30
                    }}>&larr;</Text>
                </TouchableOpacity>
                <TextInput value={search} onChangeText={text => setSearch(text)} placeholder="Search iFlipboard" autoFocus={true} style={style.input} />
                <TouchableOpacity style={{
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={handleSearch}>
                    <Image source={ImageSearch} style={{
                        width: 20,
                        height: 20
                    }} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={0} style={style.body}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{
                    marginHorizontal: 20,
                    marginTop: 30
                }}>
                    {info.map(item => 
                        <TouchableOpacity key={item.id} style={style.containerArticle}
                        onPress={() => {
                            props.setUrlWebView(item.url)
                            props.setPage("webview")
                        }}
                        >
                            <Image source={{uri :item.Image}} style={{
                                width: 60,
                                height: 60
                            }} />
                            <View style={{marginLeft: 20, marginRight: 70}}>
                                <Text style={style.titleArticle}>{item.title}</Text>
                                <Text style={style.whoArticle}>{item.who}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%"
    },
    bar: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: Colors.grey,
        borderBottomWidth: 3
    },
    body: {
        flex: 10,
        width: "100%"
    },
    input: {
        width: "70%",
        height: 50,
        marginHorizontal: 10,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    containerArticle: {
        flexDirection: "row",
        marginBottom: 20
    },
    titleArticle: {
        fontWeight: "bold",
        fontSize: 15,
    },
    whoArticle: {
        fontSize: 10,
        color: Colors.littlegrey
    }
});

export default SearchPage;