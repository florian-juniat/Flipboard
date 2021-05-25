import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native';

import Logo from '../../images/flipboard_logo.png'

import Colors from '../../constants/Colors'


import axios from "axios";

const Start = props => {

    const [interessed, setInteressed] = useState([])
    const [requestDone, setRequestDone] = useState(false)
    const [subjects, setSubjects] = useState([{
        tab: [{
            text: "test",
            id: "1",
            validate: false
        }],
        id: "0"
    }])

    if (requestDone == false) {
        setRequestDone(true)
        axios.get("http://192.168.1.30:8080/tags/"
         ).then(response => {

            if (response.status == 200) {

                var res = []
                
                response.data.map(item => res.push(item.tags))


                var info = []
                for (var i = 0; i < res.length; i++) {
                    info.push("#" + res[i].toUpperCase())
                }
                var element = []
                var one = []
                var count = 0
                for (var i = 0; i < info.length; i++) {
                    one.push({text: info[i], validate: false, id: (i + 1).toString()})
                    count = count + info[i].length
                    if (i != info.length - 1 && count + info[i + 1].length > 23) {
                        element.push({tab: one, id: "a" + element.length.toString()})
                        one = []
                        count = 0
                    }
                }
                if (one.length != 0) {
                    element.push({tab: one, id: "a" + element.length.toString()})
                }
                setSubjects(element)
            } else {
                console.log('problem')
            }
         })
        
    }

    const handleClickSubject = (element) => {
        if (interessed.includes(element.text)) {
            var new_element = interessed.filter(item => item != element.text)
            setInteressed(new_element)
        } else {
            interessed.push(element.text)
            setInteressed(interessed)
        }
        var newInfo = []
        for (var i = 0; i < subjects.length; i++) {
            var inter = []
            for (var j = 0; j < subjects[i].tab.length; j++) {
                if (subjects[i].tab[j].text === element.text) {
                    inter.push({text: element.text, validate: element.validate ? false : true, id: element.id})
                } else {
                    inter.push(subjects[i].tab[j])
                }
            }
            var newElement = {
                tab : inter,
                id : "a" + newInfo.length.toString()
            }
            newInfo.push(newElement)
        }
        setSubjects(newInfo)
    }

    const handleValidate = () => {
        props.setSubjectStart(interessed)
        props.setPage("createAccount")
    }


    return (
        <View style={style.container}>
            <View style={style.bar}>
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => props.setPage("intro")}>
                    <Image source={Logo} style={{
                        width: 50,
                        height: 50
                    }} />
                    <Text style={style.title}>IFLIPBOARD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.connect}
                onPress={() => props.setPage("login")}
                >
                    <Text style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>Log In</Text>
                </TouchableOpacity>
            </View>
            <View style={style.body}>
                <Text style={style.titleBody}>
                    What do you love reading about ?
                </Text>
                <ScrollView style={{flex: 1}}
                showsVerticalScrollIndicator={false}>
                    {subjects.map(item =>
                        <View key={item.id} style={{flexDirection: "row"}}>
                            {item.tab.map(element => 
                            <TouchableOpacity key={element.id} onPress={() => handleClickSubject(element)} style={{
                                backgroundColor: element.validate ? Colors.red : Colors.grey,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                borderRadius: 5,
                                marginHorizontal: 10,
                                marginVertical: 5,
                            }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color:element.validate ? "white" : Colors.littlegrey
                                }}>{element.text}</Text>
                            </TouchableOpacity>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={style.end}>
                <TouchableOpacity onPress={handleValidate} disabled={interessed.length >= 3 ? false : true} style={{
                    backgroundColor: interessed.length >= 3 ? Colors.red : "#5A5A5A",
                    paddingHorizontal: 50,
                    paddingVertical: 15,
                    borderRadius: 5
                }}>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15
                    }}> Follow 3 or more Topics </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    bar: {
        width: "100%",
        marginTop: 10,
        flex: 1,
        paddingTop: 10,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#C7C7C7",
        borderBottomWidth: 2
    },
    body: {
        flex: 5,
        marginHorizontal: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10
    },
    connect: {
        backgroundColor: Colors.red,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 3
    },
    end: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopColor: "#C7C7C7",
        borderTopWidth: 2
    },
    titleBody: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5
    }
});

export default Start;