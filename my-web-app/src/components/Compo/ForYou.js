import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Favorite from '@material-ui/icons/Favorite';
import NotFavorite from '@material-ui/icons/FavoriteBorder';
import Icons from '../Compo/Iconus';

const buildField = (data, cat, changeLike) => {
  var category = "";
  var writtenby = "";
  var fav = <Favorite/>;
  var notFav = <NotFavorite/>;
  var button;

  const articles = data.map(article => {
    if (article.category_tags == undefined) {
      category = cat;
      if (article.like == false) {
        button = <Button onClick={() => {changeLike(false, article.id)}}><Icons actual={notFav} other={fav}/></Button>
      } else {
        button = <Button onClick={() => {changeLike(true, article.id)}}><Icons actual={fav} other={notFav}/></Button> 
      }
    } else {
      category = article.category_tags;
      if (article.author != "") {
        writtenby = "Written by " + article.author;
        button = <Button onClick={() => {changeLike(false, article.id)}}><Icons actual={notFav} other={fav}/></Button>;
      }
    }
    return (
      <Grid item xs={4}>
      <Link color="inherit" href={article.url} target="_blank">
      <img style={styleFlo.grid.photo} src={article.picture}/>
      </Link>
      <div style={styleFlo.grid.tag}>#{category.toUpperCase()}</div>
      <div style={styleFlo.grid.writtenby}>{writtenby}</div>
      <Link color="inherit" href={article.url}>
      <div style={styleFlo.grid.title}>{article.title}</div>
      </Link>
      <div style={styleFlo.grid.like}>{button}</div>
      <hr style={styleFlo.hr}/>
      </Grid>
    )
  })
  return (<Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    style={{flexGrow: 1}}
    spacing={3}
  >
    {articles}
  </Grid>);
}

const mystyle = {
  alignItems: "center",
  justifyContent: "center",
  display : "block"
};

const buttons = (tags, showArticles) => {
  
  const buttons = tags.map(tag => {
    return (<Button style={styleFlo.button} onClick={()=>{showArticles(tag)}}>#{tag}</Button>)
  })
  return (<div style={mystyle}>{buttons}</div>);
}

class ForYou extends Component {
  state = {
    articles: [],
    mot: "",
    filtered: [],
    myTags: [],
    category: ""
  }
  
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    axios.get("http://127.0.0.1:8080/home/for-you", {
      headers: { Authorization: token }
    }).then (res => {
      this.setState({articles: res.data, filtered: res.data});
    }).then(axios.get("http://127.0.0.1:8080/profil", {
      headers: { Authorization: token }
    }).then(res => {
      var myTags = [];
        res.data.tags.map(elem => {
            myTags.push(elem.tag)
        })
        this.setState({myTags: myTags});
    })
    )
  }

  showArticles = (tag) => {
    const token = sessionStorage.getItem('token');

    this.setState({category: tag});
    axios.get("http://127.0.0.1:8080/home/articles/" + tag, {
      headers: { Authorization: token }
    }).then(res => {
      this.setState({articles: res.data.articles, filtered: res.data.articles})
    })
  }

  changeLike = (like, id) => {
    const token = sessionStorage.getItem('token');

    if (like == false) {
      axios.post("http://127.0.0.1:8080/home/like", {
        id_article: id
        }, {
          headers: { Authorization: token}
        })
      .then (res => {
        //alert("article liked");
      });
    } else {
      axios.post("http://127.0.0.1:8080/home/unlike", {
        id_article: id
        }, {
          headers: { Authorization: token}
        })
      .then (res => {
        //alert("article unliked")
      });
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{...styleFlo.container}}>
        <div style={styleFlo.card}>
          <div style={{...styleFlo.title, paddingTop: 10}}>
            FOR YOU<br/>
          </div>
          <div style={{...styleFlo.ltitle, paddingTop: 10}}>
            The best of everything you follow
            <br/><br/><br/>
          </div>
          <div style={{...styleFlo.ltitle, paddingTop: 10}}>
            {buttons(this.state.myTags, this.showArticles)}
            <br/><br/><br/>
          </div>
          <div style={{...styleFlo.ltitle, paddingTop: 10}}>
            {buildField(this.state.filtered, this.state.category, this.changeLike)}
          </div>
        </div>
      </div>
    )
  }
}

var styleFlo = {
  hr: {
    color: "grey"
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
    fontSize: 30,
    fontWeight: 600,
    textAlign: "center"
  },
  ltitle: {
    fontSize: 20,
    fontWeight: 300,
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
    width: "70%",
    height: "100vh",
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
    marginTop: 150
  }
};

export default ForYou;