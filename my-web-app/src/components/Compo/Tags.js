import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cancel from '@material-ui/icons/Cancel';
import Add from '@material-ui/icons/AddCircleOutlineOutlined';
import {withStyles} from '@material-ui/core/styles';
import { styles } from '../../theme/styles';

const elems = (myTags, removeTag) => {
    var rows = myTags.map(tag => {
        return (<div style={styleP.ltitle}>{tag}<Button onClick={() => removeTag(tag)}><Cancel style={{color: "red"}}/></Button><br/></div>);
    })
    return (<div>{rows}</div>);
}

const newElems = (newTags, addTag) => {
    var rows = newTags.map(tag => {
        return (<div style={styleP.ltitle}>{tag}<Button onClick={() => addTag(tag)}><Add/></Button></div>)
    })
    return (<div>{rows}</div>)
}

class Tags extends Component {
  state = {
    myTags: [],
    newTags: [],
    selectedTag: "",
    open: true,
    lilopen: false
  }

  handleOpen(open) {
      if (open == false)
        
    this.setState({ open: open });
  };

  handlelilOpen(open) {
      this.setState({lilopen: open})
  }

  componentDidMount() {
      const token = sessionStorage.getItem('token');
     axios.get('http://localhost:8080/home', {
        headers : { Authorization: token }
     }).then(res => {
        this.setState({newTags: res.data.tags})
     }).then(axios.get("http://localhost:8080/profil", {
         headers: { Authorization: token }
     }).then(res => {
         var myTags = [];
         res.data.tags.map(elem => {
             myTags.push(elem.tag)
         })
         this.setState({myTags: myTags});
     }))
  }

  removeTag = (tag) => {
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/home/remove-tags", {
        removetags: tag
    }, {
        headers: { Authorization: token }
    })
    var myTags = [];
    this.state.myTags.map(oldTag => {
        if (oldTag != tag)
            myTags.push(oldTag);
    })
    var newTags = this.state.newTags;
    newTags.push(tag);
    this.setState({myTags: myTags, newTags: newTags});
  }

  addTag = (tag) => {
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/home/add-tags", {
        addtags: tag
    }, {
        headers: { Authorization: token }
    })
    var myTags = this.state.myTags;
    myTags.push(tag);
    var newTags = [];
    this.state.newTags.map(oldTag => {
        if (oldTag != tag)
            newTags.push(oldTag);
    })
    this.setState({lilopen: false, myTags: myTags, newTags: newTags});
  }

  render() {
    const {classes} = this.props;
    if (this.state.open == false)
        return (
            <Redirect to='home'/>
        );
    else
    return (
      <div>
        <Dialog open={this.state.open} onClose={() => this.handleOpen(false)} aria-labelledby="form-dialog-title">
        <div style={styleP.card}>
            
            <DialogTitle id="form-dialog-title"><div style={styleP.title}>EDIT FAVORITES</div></DialogTitle>
            
                    <DialogContent>
                        <div className = {styles.root}>
                        {elems(this.state.myTags, this.removeTag)}
                        </div>
                        <div>
                            <Button variant="outlined" style={styleP.button} onClick={()=>{this.setState({lilopen: true})}}>Add favorite</Button>
                            <Dialog open={this.state.lilopen} aria-labelledby="form-dialog-titl">
                            <DialogTitle id="form-dialog-titl"><div style={styleP.title}>Add favorite</div></DialogTitle>
                            <DialogContent>
                                <div className = {styles.root}>
                                    {newElems(this.state.newTags, this.addTag)}
                                </div>
                                <DialogContentText>
                                    <br/>
                                    <Button variant="outlined" style={styleP.longButton} onClick={() => this.handlelilOpen(false)}>Cancel</Button>
                                </DialogContentText>
                            </DialogContent>
                            </Dialog>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div style={styleP.longButton}>
                        <Button variant="outlined" fullWidth style={styleP.button} onClick={() => this.handleOpen(false) } color="primary">
                            Close
                        </Button>
                        </div>
                    </DialogActions>
                    </div>
                </Dialog>
      </div>
    )
  }
}

var styleP = {
    hr: {
      color: "grey",
      marginBottom: 0
    },
    grid: {
      title: {
        paddingTop: 15,
        fontSize: 23,
        fontWeight: 600,
        textAlign: "left",
        height: 140
      },
      tag: {
        paddingTop: 20,
        color: "red",
        fontSize: 15,
        fontWeight: 500,
        textAlign: "left"
      },
      writtenby: {
        paddingTop: 20,
        fontSize: 15,
        fontWeight: 400,
        textAlign: "left"
      },
      photo: {
        paddingTop: 40,
        width: 400,
        height: 350
      },
      like: {
        textAlign: "right",
        fontWeight: 800
      
      }
    },
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
      fontSize: 20,
      fontWeight: 600,
      textAlign: "left"
    },
    ltitle: {
      fontSize: 17,
      fontWeight: 300,
      textAlign: "left"
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
      width: "360px",
      height: "360px",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      //boxShadow: "2px 2px 20px 2px black"
  
    },
    text: {
      fontSize: 30,
      textAlign: "center",
      fontWeight: 400,
      paddingTop: 50
    },
    button: {
      backgroundColor: "white",
      fontSize: 12,
      color: "black",
      marginTop: 20,
      fontWeight: 500
    },
    longButton: {
        width: "100%",
        textAlign: "center",
        color: "black"
        //paddingRight: 40
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
      marginTop: 150
    }
  };

export default withStyles(styles) (Tags);