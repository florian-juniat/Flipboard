import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

var image = "https://s1.1zoom.me/b5050/160/354276-admin_1920x1080.jpg"



const Welcome = props => {

        const {classes} = props;

        return (
          <div style={styleFlo.container}>
            <div style={styleFlo.card}>
              <h1 style={{...styleFlo.title, paddingTop: 30}}>Get Informed</h1>
              <h1 style={{...styleFlo.title, borderBottom: "20px solid red", paddingBottom: 20, marginRight: 100,  marginLeft: 100}}>Get Inspired</h1>
              <h1 style={styleFlo.text}>Stories Curated For You</h1>
              
              <div style={styleFlo.containerButton}>
                <Button variant="danger"
                    variant="contained"
                    className={{...classes.submit,margin:theme.spacing(0, 0, 0),}}

                    style={styleFlo.button}
                    onClick={() => {props.changePage(2)}}>
                    Sign Up
                </Button>
                <Button variant="danger" color="red"
                  style={styleFlo.secondButton}
                    onClick={() => {props.changePage(1)}}>
                  Log In
                </Button>
              </div>
            </div>
          </div>
        );

}

var styleFlo = {
  title: {
    fontSize: 50,
    fontWeight: 600,
    textAlign: "center"
  },
  container: {
    width: "100%",
    height: "100vh",
    paddingTop: 100,
    backgroundImage: "url(" + image + ")",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100vh",
    paddingTop: 100,
    backgroundImage: "url(" + image + ")",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "33%",
    height: "70vh",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 20px 2px black"
    
  },
  title: {
    fontSize: 50,
    fontWeight: 600,
    textAlign: "center"
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 400,
    paddingTop: 50
  },
  button: {
    backgroundColor: "red",
    fontSize: "20px",
    marginRight: 20,
    color: "white"
  },
  secondButton: {
    border: "2px solid black",
    fontSize: "20px",
    marginLeft: 20
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 150
  }
};

export default Welcome;