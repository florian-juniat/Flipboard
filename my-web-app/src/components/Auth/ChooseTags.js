import React, { Component, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CalendarIcon from '@material-ui/icons/BookTwoTone';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios';

var logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flipboard_logo.svg/1200px-Flipboard_logo.svg.png"

function retTags(listTags, formats) {
    var choosedTags = [];
    formats.map(n => {
      choosedTags.push(listTags[n]);
    })
    return (choosedTags);
  }

const ChooseTags = props => {

    const {classes} = props;
    const [formats, setFormats] = useState([]);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
      };
  
    const mystyle = {
        paddingLeft : "25px",
        display : "block",
        marginLeft: "10px"
    };

    return (
      <div style={{...styleFlo.container, backgroundImage: "url(" + props.image + ")",}}>
        <div style={styleFlo.card}>
          <div style={styleFlo.containerImage}>
            <img src={logo} style={styleFlo.logo} alt=""/>
          </div>
          <div style={{...styleFlo.title, paddingTop: 30}}>Welcome!<br/><br/>Choose the tags you're interested in:</div>
          {/*  */}
          <br></br>
          <br></br>
          <div>
                  <ToggleButtonGroup
                    orientation='vertical'
                    value={formats}
                    onChange={handleFormat}
                    style={mystyle}
                  >
                    <ToggleButton style={{marginBottom: "5px", marginRight: "10px", border: "solid 0.5px"}} value="0">
                      {props.tags[0]}
                    </ToggleButton>
                    <ToggleButton style={{marginBottom: "5px", marginRight: "10px", border: "solid", border: "solid 0.5px"}} value="1">
                      {props.tags[1]}
                    </ToggleButton>
                    <ToggleButton style={{marginBottom: "5px", border: "solid 0.5px"}} value="2">
                      {props.tags[2]}
                    </ToggleButton>
                    <ToggleButton style={{marginBottom: "5px", marginRight: "10px", border: "solid", border: "solid 0.5px"}} value="3">
                      {props.tags[3]}
                    </ToggleButton>
                    <ToggleButton style={{marginBottom: "5px", marginRight: "10px", border: "solid", border: "solid 0.5px"}}value="4">
                      {props.tags[4]}
                    </ToggleButton>
                    <ToggleButton style={{marginBottom: "5px", border: "solid 0.5px"}} value="5">
                      {props.tags[5]}
                    </ToggleButton>
                    <ToggleButton style={{border: "solid 0.5px"}} value="6">
                      {props.tags[6]}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
            {/*  */}
          <div style={styleFlo.containerButton}>
            
            <Button variant="danger"
                variant="contained"
                className={{...classes.submit,margin:theme.spacing(0, 0, 0),}}
  
                style={styleFlo.button}
                onClick={props.register.bind(this, retTags(props.tags, formats))}>
                Sign Up
            </Button>
          </div>
          <div style={styleFlo.already}>
            <div>Already have an account?</div>
            <Button variant="danger" color="red"
              style={styleFlo.secondButton}
                onClick={() => {props.changePage(1)}}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  var styleFlo = {
    already: {
      display: "flex",
      marginTop: "10px",
      justifyContent: "center",
      width: "100%",
      alignItems: "center"
    },
    containerTextField: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      width: "100%",
    },
    textfield: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    containerImage: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 20,
      width: "100%",
    },
    title: {
      fontSize: 30,
      fontWeight: 600,
      textAlign: "center"
    },
    logo: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      paddingtop: 30,
      width: "50px",
      height: "50px",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      width: "100%",
      height: "100vh",
      paddingTop: 100,
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover', 
      display: "flex",
      justifyContent: "center",
    },
    card: {
      width: "20%",
      height: "70vh",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "2px 2px 20px 2px black"
  
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
      color: "white",
      marginTop: "-100px",
    },
    secondButton: {
      border: "2px solid black",
      fontSize: "10px",
      marginLeft: 20
    },
    containerButton: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginTop: 100
    }
  };
  
  export default ChooseTags;