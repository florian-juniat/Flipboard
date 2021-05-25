import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import axios from "axios";
import theme from '../../theme';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import { styles } from '../../theme/styles';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import ChooseTags from './ChooseTags';
import { AuthContext } from "../../context/auth";
import Home from '../Home/Home.js';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";


class Authentication extends Component {
  //static contextType = AuthContext
  constructor(props) {
      super(props);
      this.changePage = this.changePage.bind(this);
      this.changeRegisterStep = this.changeRegisterStep.bind(this);
      this.authenticate = this.authenticate.bind(this);
      this.register = this.register.bind(this);
      this.state = {
        data:[],
        charged: false,
        page: 0,
        email: "",
        password: "",
        registerStep: 0,
        tags: [],
        choose_tags: []
      }
  }
  Copyright(classes) {
    return (
      <Typography className={classes.copyright} align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          EpiFlipBoard
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  //////// Login
  authenticate(email, password) {
    console.log("clicked button");
    axios.post("http://127.0.0.1:8080/auth/login", {
      email: email,
      password: password
    }).then((res) => {
      sessionStorage.setItem('token', res.data.token);
      this.setState({charged:  true});
    }).catch(error => {
      alert(error);
    })
  }
  //////// Welcome
  changePage(n) {
    this.setState({page: n});
  }

  changeRegisterStep(email, password, n) {
    this.setState({email: email, password: password, registerStep: n})
  }
  //////// Register
  register(tags) {
    const email = this.state.email;
    const password = this.state.password;

    axios.post("http://127.0.0.1:8080/auth/register", {
      email: email,
      password: password,
      choose_tags: tags
    }).then((res) => {
        alert("registered")
    })
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8080/tags/", {
      headers: {}
    }).then (res => {
      var data = res.data;
      var tags = [];
      data.map(tag => {
        tags.push(tag.tags)
      })
      this.setState({tags: tags});
    }).catch (error => {
      alert(error);
    })
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  render() {
    const {classes} = this.props;
    var images = ["https://www.terresdazur.com/images/pages/vence/1.jpg",
    "https://diapogram.com/upload/2018/04/12/20180412144603-66d29a07.jpg",
    "https://fondecran.at-web.org/r%C3%A9solution-1920-1080/Printemps-fonds-d-%C3%A9cran-paysage-photographie-262.jpg",
    "https://s1.1zoom.me/b5062/255/Vegetables_Pepper_Tomatoes_Potato_Cabbage_536344_1920x1080.jpg",
    "https://i.pinimg.com/originals/35/aa/fa/35aafafa8213861908d54dbfbc057527.jpg",
    "https://images7.alphacoders.com/420/thumb-1920-420879.jpg",
    "https://hdfondsdecran.com/image/201609/65/sous-leau-rayon-ocean.jpg",
    "https://s1.1zoom.me/b6741/653/Closeup_Bulb_529943_1920x1080.jpg",
  ]
  const { charged } = this.state;
    //alert(this.state.charged);
    if (charged) {
      return (<Redirect to="home"/>)
    }
      /*return (
        //<ThemeProvider theme={theme} classes={classes}>
        
        //</ThemeProvider>
      );*/
    
      if (this.state.page == 0)
        return (
          <Welcome
            changePage = {this.changePage}
            classes = {classes}
          />
        )
      if (this.state.page == 1)
        return (
          <Login 
            classes = {classes}
            changePage = {this.changePage}
            authenticate = {this.authenticate}
            Copyright = {this.Copyright}
            image = {images[this.getRandomInt(images.length)]}
          />
        )
      if (this.state.page == 2)
        if (this.state.registerStep == 0)
          return (
            <Register
              classes = {classes}
              changePage = {this.changePage}
              changeRegisterStep = {this.changeRegisterStep}
              Copyright = {this.Copyright}
              image = {images[this.getRandomInt(images.length)]}
            />
          );
        else
            return (
            <ChooseTags
              classes = {classes}
              changePage = {this.changePage}
              register = {this.register}
              Copyright = {this.Copyright}
              tags = {this.state.tags}
              image = {images[this.getRandomInt(images.length)]}
            />
            )
    
  };
};

Authentication.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Authentication);