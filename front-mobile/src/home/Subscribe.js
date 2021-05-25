import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';

import Footer from '../../components/Footer'

import axios from "axios";

import Colors from '../../constants/Colors'

const Subscribe = props => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [urlImage, setUrlImage] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")

    const handleNext = () => {
        axios.post("http://192.168.1.30:8080/home/create-article", {
            tags: tags,
            author: author,
            title: title,
            description: description,
            url: url,
            image: urlImage,
            date: date,
            content: content
        }, {headers: { Authorization: props.token } }).then(function(res) {
            if (res.status == 200) {
                props.setPage("home")
            } else {
                console.log("pb")
            }
        })
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>Create an article</Text>
            <ScrollView style={style.body}>

                
                <TextInput value={title} onChangeText={text => setTitle(text)} style={style.inputNom} placeholder="Name"/>
                <TextInput value={description} onChangeText={text => setDescription(text)} style={style.inputDescription} placeholder="Description"/>
                <TextInput value={author} onChangeText={text => setAuthor(text)} style={style.inputDescription} placeholder="Author"/>
                <TextInput value={content} onChangeText={text => setContent(text)} style={style.inputDescription} placeholder="Body"/>
                <TextInput value={urlImage} onChangeText={text => setUrlImage(text)} style={style.inputDescription} placeholder="Url image"/>
                <TextInput value={tags} onChangeText={text => setTags(text)} style={style.inputDescription} placeholder="Tags"/>
                <TextInput value={date} onChangeText={text => setDate(text)} style={style.inputDescription} placeholder="Date"/>
                <TextInput value={url} onChangeText={text => setUrl(text)} style={style.inputDescription} placeholder="Url"/>
                
            </ScrollView>
            <TouchableOpacity style={style.suivant} onPress={handleNext}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>Submit</Text>
                </TouchableOpacity>
            <Footer setPage={props.setPage} page="subscribe" />
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
    },
    footer: {
        flex: 1,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        flex: 5,
    },
    inputNom: {
        fontSize: 25,
        paddingHorizontal: 10,
        marginBottom: 20,

        marginHorizontal: 20
    },
    inputDescription: {
        fontSize: 20,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 20
    },
    suivant: {
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    title: {
        marginHorizontal: 30,
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: "10%",
        marginTop: 150
    }
});

export default Subscribe;