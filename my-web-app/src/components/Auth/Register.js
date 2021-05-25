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


//var image = "https://www.terresdazur.com/images/pages/vence/1.jpg"
var logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flipboard_logo.svg/1200px-Flipboard_logo.svg.png"

/*
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
});

function retTags(listTags, formats) {
  var choosedTags = [];
  formats.map(n => {
    choosedTags.push(listTags[n]);
  })
  return (choosedTags);
}

export default class Register extends Component {
    state = {
        registerStep: 0,
        email: "",
        password: "",
        tags: [],
        formats: []
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

    handleFormat = (event, newFormats) => {
      this.setState({formats: newFormats})
    };

    render() {
    const {classes} = this.props;
    if (this.state.registerStep == 0)
        return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CalendarIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                EpiFlipBoard
              </Typography>
              <div><br/><br/><br/></div>
              <form className={classes.form} noValidate>
                <div className={classes.text}>E-mail</div>
                <TextField InputProps={{className:classes.input}}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <div><br/><br/></div>
                <Button
                  variant="text"
                  color="blue"
                  className={classes.button}
                  onClick={() => {this.props.changePage(0)}}
                >
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  //color="blue"
                  className={classes.submit}
                  onClick={() => this.setState({email: document.getElementById('email').value, registerStep: 1})}
                >
                  Suivant
                </Button>
              </form>
            </div>
            <Box mt={8}>
              {this.props.Copyright(classes)}
            </Box>
          </Container>
          </ThemeProvider>
        );
    if (this.state.registerStep == 1)
        return (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <CalendarIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                  EpiFlipBoard
                </Typography>
                <div><br/><br/><br/></div>
                <form className={classes.form} noValidate>
                  <div className={classes.text}>E-mail</div>
                  <div>{this.state.email}<br/><br/></div>
                <div className={classes.text}>Password</div>
                <TextField InputProps={{className:classes.input}}
                  variant="standard"
                  //margin="right"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                  <Button
                    variant="text"
                    color="blue"
                    className={classes.button}
                    onClick={() => this.setState({registerStep: 0})}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    //color="blue"
                    className={classes.submit}
                    onClick={() => this.setState({password: document.getElementById('password').value, registerStep: 2})}
                  >
                    S'enregister
                  </Button>
                </form>
              </div>
              <Box mt={8}>
                {this.props.Copyright(classes)}
              </Box>
            </Container>
            </ThemeProvider>
      );
    if (this.state.registerStep == 2)
          return (
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline/>
                Choisissez les tags qui vous intéressent:
                <div className = {styles.root}>
                  <ToggleButtonGroup
                    value={this.state.formats}
                    onChange={this.handleFormat}
                  >
                    <ToggleButton value="0">
                      {this.state.tags[0]}
                    </ToggleButton>
                    <ToggleButton value="1">
                      {this.state.tags[1]}
                    </ToggleButton>
                    <ToggleButton value="2">
                      {this.state.tags[2]}
                    </ToggleButton>
                    <ToggleButton value="3">
                      {this.state.tags[3]}
                    </ToggleButton>
                    <ToggleButton value="4">
                      {this.state.tags[4]}
                    </ToggleButton>
                    <ToggleButton value="5">
                      {this.state.tags[5]}
                    </ToggleButton>
                    <ToggleButton value="6">
                      {this.state.tags[6]}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Button
                    variant="contained"
                    //color="blue"
                    className={classes.submit}
                    onClick={() => this.props.register(this.state.email, this.state.password, retTags(this.state.tags, this.state.formats))}
                  >
                    Valider
                  </Button>
              </Container>
            </ThemeProvider>
          );
    }
}*/

const Register = props => {

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const {classes} = props;

  return (
    <div style={{...styleFlo.container, backgroundImage: "url(" + props.image + ")",}}>
      <div style={styleFlo.card}>
        <div style={styleFlo.containerImage}>
          <img src={logo} style={styleFlo.logo} alt=""/>
        </div>
        <div style={{...styleFlo.title, paddingTop: 30}}>Join IFlipboard</div>

        <div style={{...styleFlo.containerTextField, marginTop: "80px" }}>
          <TextField value={email} onChange={event => setEmail(event.target.value)} id="outlined-basic" label="Email" variant="outlined"  style={styleFlo.textfield}/>
        </div>
        <div style={{...styleFlo.containerTextField, marginTop: "30px" }}>
          <TextField value={password} type="password" onChange={event => setPassword(event.target.value)} id="outlined-basic" label="Password" variant="outlined"  style={styleFlo.textfield}/>
        </div>
        <div style={styleFlo.containerButton}>
          
          <Button variant="danger"
              variant="contained"
              className={{...classes.submit,margin:theme.spacing(0, 0, 0),}}

              style={styleFlo.button}
              onClick={props.changeRegisterStep.bind(this, email, password, 1)}>
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
    marginTop: "50px",
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
    color: "white"
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

export default Register;