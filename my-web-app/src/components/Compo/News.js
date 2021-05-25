import React, { Component } from 'react';

import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {withStyles} from '@material-ui/core/styles';
import { styles } from '../../theme/styles';

import axios from 'axios';
import {Grid} from '@material-ui/core';
import { isUnaryLike } from '@babel/types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import Favorite from '@material-ui/icons/Favorite';
import NotFavorite from '@material-ui/icons/FavoriteBorder';
import Icons from '../Compo/Iconus';

// const buttons = (tags, showArticles) => {
//   const buttons = tags.map(tag => {
//     return (<div><Button onClick={()=>{showArticles(tag.tags)}}>{tag.tags}</Button><br/></div>)
//   })
//   return (<div>{buttons}</div>);
// }

// const articles = (articles, like, unlike) => {
//   var button;
//   const arts = articles.map(article => {
//     if (article.like == false)
//       button = <Button onClick={() => {like(article.id)}}>♡</Button>
//     else
//       button = <Button onClick={() => {unlike(article.id)}}>❤</Button>
//     return (
//       <div>
//         <h1>{article.title}</h1>
//         <h3>Written by {article.author}</h3>
//         If you want to read this: <Link href={article.url}>Link</Link>
//         <img src={article.picture}/>
//         {button}
//       </div>
//     )
//   })
//   return (arts);
// }

const buildExplorer = (arts, changeLike) => {
  var fav = <Favorite/>;
  var notFav = <NotFavorite/>;
  if (arts == undefined)
    return (<div></div>)
  const articles = arts.map(article => {
    return (
      <Grid item xs={6}>
      <Link color="inherit" href={article.url} target="_blank">
      <img style={styleP.grid.photo} src={article.image}/>
      </Link>
      <Link color="inherit" href={article.url}>
      <div style={styleP.grid.title}>{article.title}</div>
      </Link>
      <div style={styleP.grid.like}>
        <Button onClick={() => {changeLike(false, article.id)}}>
          <Icons actual={notFav} other={fav}/>
        </Button>
      </div>
      </Grid>
    )
  })
  return (<Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    style={{flexGrow: 1, paddingLeft: 300}}
    spacing={3}
  >
    {articles}
  </Grid>);
}

const buildField = (data, cat, changeLike) => {
  var category = "";
  var writtenby = "";
  var fav = <Favorite/>;
  var notFav = <NotFavorite/>;

  const articles = data.map(article => {
    if (article.category_tags == undefined) {
      category = cat;
    } else {
      category = article.category_tags;
      if (article.author != "") {
        writtenby = "Written by " + article.author;
      }
    }
    return (
      <Grid item xs={6}>
      <Link color="inherit" href={article.url} target="_blank">
      <img style={styleP.grid.photo} src={article.picture}/>
      </Link>
      <div style={styleP.grid.tag}>#{category.toUpperCase()}</div>
      <div style={styleP.grid.writtenby}>{writtenby}</div>
      <Link color="inherit" href={article.url}>
      <div style={styleP.grid.title}>{article.title}</div>
      </Link>
      <div style={styleP.grid.like}>
        <Button onClick={() => {changeLike(false, article.id)}}>
          <Icons actual={notFav} other={fav}/>
        </Button>
      </div>
      </Grid>
    )
  })
  return (<Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    style={{flexGrow: 1, paddingLeft: 300}}
    spacing={3}
  >
    {articles}
  </Grid>);
}

class News extends Component {
  state = {
    tags: [],
    mot: "",
    filtered: [],
    inedit: [],
    game: [],
    sky: [],
    nature: [],
    value: 0,
    hidden: "hidden"
  }

  handleChangeMot = (event) => {
    this.setState({mot: event.target.value});
  }
/*
  filter = () => {
    const mot = this.state.mot.toLowerCase();
    const totalData = this.state.articles;

    var rows = [];
    totalData.map(art => {
      if (art.title.toLowerCase().includes(mot))
        rows.push(art);
    })
    this.setState({filtered: rows});
  }
*/
/*
  showArticles = (tag) => {
    const token = sessionStorage.getItem('token');
    axios.get("http://127.0.0.1:8080/home/articles/" + tag, {
      headers: { Authorization: token }
    }).then(res => {
      this.setState({articles: res.data.articles, filtered: res.data.articles})
    })
  }
*/
  like = (id) => {
    const token = sessionStorage.getItem('token');
    axios.post("http://127.0.0.1:8080/home/like", {
      id_article: id
    }, {
      headers: { Authorization: token}
    }).then (res => {
      alert("article liked")
    })
  }

  unlike = (id) => {
    const token = sessionStorage.getItem('token');
    axios.post("http://127.0.0.1:8080/home/unlike", {
      id_article: id
    }, {
      headers: { Authorization: token}
    }).then (res => {
      alert("article unliked")
    })
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token');

    axios.get("http://localhost:8080/tags", {
      headers: { Authorization: token }
    }).then(res => {
      this.setState({tags: res.data});
    })
  }

  search = (mot) => {
    const token = sessionStorage.getItem('token');

    axios.post("http://localhost:8080/search", {
      search: mot
    }, {
      headers: { Authorization: token }
    }).then(res => {
      this.setState({hidden: "hidden", filtered: res.data});
    })
  }

  randomStuff = () => {
    const token = sessionStorage.getItem('token');

    axios.get("http://localhost:8080/search/explorer", {
      headers: { Authorization: token }
    }).then (res => {
      this.setState({hidden: true, inedit: res.data[0], game: res.data[1], sky: res.data[2], nature: res.data[3]})
    })
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
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
        alert("article liked");
      });
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{...styleP.container}}>
        <div style={styleP.card}>
          <div style={styleP.title}>
            SEARCH ...
          </div>
          <hr style={styleP.hr}/>
          <br/>
        <div style={{paddingLeft: 230}}>
          <TextField
          InputProps={{className:classes.input}}
          variant="standard"
          margin="normal"
          id="mot"
          label="Search a word..."
          value={this.state.mot}
          onChange={this.handleChangeMot}
          variant="outlined"
          /></div><br/>
          <div style={{paddingLeft: 210}}>
          <Button className={classes.submit} variant="outlined" onClick={() => this.search(this.state.mot)}>Search</Button>
          </div>
          <br/><br/>
          {buildField(this.state.filtered, "general", this.changeLike)}
          <br/><br/>
          <div style={{textAlign: "center", visibility: this.state.hidden}}>
        <TabContext value={this.state.value}>
          <TabList style={{paddingLeft: 500, height: 20, backgroundColor: "white"}} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Exclusive" value="1" />
            <Tab label="Game" value="2" />
            <Tab label="Sky" value="3" />
            <Tab label="Nature" value="4" />
          </TabList>
        <TabPanel value="1">{buildExplorer(this.state.inedit.info, this.changeLike)}</TabPanel>
        <TabPanel value="2">{buildExplorer(this.state.game.info, this.changeLike)}</TabPanel>
        <TabPanel value="3">{buildExplorer(this.state.sky.info, this.changeLike)}</TabPanel>
        <TabPanel value="4">{buildExplorer(this.state.nature.info, this.changeLike)}</TabPanel>
      </TabContext>
      </div>
        </div>
        <div style={styleP.ltitle}>
        OR <br/><br/> DISCOVER
        <br/><br/><hr/><br/>
        <Button className={classes.button} variant="outlined" onClick={this.randomStuff}>News</Button>
        </div><br/><br/>
        {/* {buildExplorer(this.state.inedit, this.state.game, this.state.sky, this.state.nature)} */}
        </div>
        
      
    )
  }
}

var styleP = {
  hr: {
    color: "grey",
    width: 200,
    marginLeft: 230
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
    textAlign: "left",
    paddingLeft: 230,
    paddingBottom: 40
  },
  ltitle: {
    fontSize: 30,
    fontWeight: 300,
    textAlign: "right",
    marginRight: 300
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

export default withStyles(styles) (News);