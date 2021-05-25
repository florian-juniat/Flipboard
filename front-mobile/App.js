import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Intro from './src/start/Intro'
import Start from './src/start/Start'
import Login from './src/connection/Login'
import LoginPart2 from './src/connection/LoginPart2'
import CreateAccount from './src/connection/createAccount'
import Register from './src/connection/Register'
import Home from './src/home/Home'
import Subscribe from './src/home/Subscribe'

import Search from './src/home/Search'
import Notification from './src/home/Notif'
import Profil from './src/home/Profil'

import Articles from './src/home/Articles'

import SearchPage from './src/second/SearchPage'
import WebViewPerso from './src/home/WebViewPerso'

export default function App() {

  const [page, setPage] = useState("intro")
  const [token, setToken] = useState("")
  const [subjectStart, setSubjectStart] = useState([])
  const [nameArticle, setNameArticle] = useState("")
  const [urlWebView, setUrlWebView] = useState("")

  var display = <Intro setPage={setPage}/>

  if (page == "start") {
    display = <Start setSubjectStart={setSubjectStart} setPage={setPage}/>
  }
  if (page == "login") {
    display = <Login setPage={setPage} setToken={setToken} />
  }
  if (page == "login2") {
    display = <LoginPart2 setPage={setPage} setToken={setToken} />
  }
  if (page == "createAccount") {
    display = <CreateAccount subjectStart={subjectStart} setPage={setPage} setToken={setToken} />
  }
  if (page == "register") {
    display = <Register subjectStart={subjectStart} setPage={setPage} setToken={setToken} />
  }
  if (page == "home") {
    display = <Home setPage={setPage} token={token} setNameArticle={setNameArticle}  setUrlWebView={setUrlWebView} />
  }
  if (page == "subscribe") {
    display = <Subscribe setPage={setPage} token={token} setUrlWebView={setUrlWebView}/>
  }
  if (page == "search") {
    display = <Search setPage={setPage} token={token} setUrlWebView={setUrlWebView}/>
  }
  if (page == "notification") {
    display = <Notification setPage={setPage} token={token} setUrlWebView={setUrlWebView}/>
  }
  if (page == "profil") {
    display = <Profil setPage={setPage} token={token} setNameArticle={setNameArticle} setUrlWebView={setUrlWebView}/>
  }
  if (page == "articles") {
    display = <Articles setPage={setPage} token={token} nameArticle={nameArticle} setUrlWebView={setUrlWebView}/>
  }
  if (page == "searchsecond") {
    display = <SearchPage setPage={setPage} token={token} setUrlWebView={setUrlWebView}/>
  }
  if (page == "webview") {
    display = <WebViewPerso  setPage={setPage} token={token} url={urlWebView} />
  }

  return (
    <View style={styles.container}>
      {display}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
