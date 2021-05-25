import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import axios from 'axios'

import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Favorite from '@material-ui/icons/Favorite';
import Delete from '@material-ui/icons/DeleteForever';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
});

const myArticles = (published, deleteArticle) => {
  if (published.length == 0)
    return (<div>You haven't published yet.</div>)
  var articles = published.map(article => {
    return(
    <Grid item xs={2}>
        <Link color="inherit" href={article.url} target="_blank">
        <img style={styleP.grid.photo} src={article.image}/>
        </Link>
        <Button onClick={() => {deleteArticle(article.id)}}><Delete/></Button>
        <Link color="inherit" href={article.url} target="_blank">
        <div style={styleP.grid.title}>{article.title}</div>
        </Link>
      </Grid>
    );
  })
  return (<Grid
    container
    alignItems="flex-start"
    style={{flexGrow: 1}}
    spacing={1}
  >
    {articles}
  </Grid>)
}

const Likes = (likes, unlike) => {
  var articles = likes.map(article => {
    var button = <Button onClick={() => {unlike(article.id)}}><Favorite/></Button> 
    return (
      <Grid item xs={2}>
        <Link color="inherit" href={article.url} target="_blank">
        <img style={styleP.grid.photo} src={article.image}/>
        </Link>
        <div style={styleP.grid.like}>{button}</div>
        <Link color="inherit" href={article.url} target="_blank">
        <div style={styleP.grid.title}>{article.title}</div>
        </Link>
      </Grid>
    )
  })
  return (<Grid
    container
    //direction="row"
    //justify="center"
    alignItems="flex-start"
    style={{flexGrow: 1}}
    spacing={1}
  >
    {articles}
  </Grid>)
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: [],
      open: false,
      tags: [],
      formats: [],
      title: "",
      image: "",
      url: "",
      author: "",
      published: []
    }
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token')
    axios.get("http://127.0.0.1:8080/profil/", {
      headers: { Authorization: token }
    }).then (res => {
      this.setState({likes: res.data.likes, published: res.data.ajout})
    }).catch (error => {
      alert(error);
    }).then(axios.get("http://localhost:8080/tags", {
      headers: { Authorization: token }
    }).then(res => {
      var data = res.data;
      var tags = [];
      data.map(tag => {
        tags.push(tag.tags)
      })
      this.setState({tags: tags});
    }))
  }

  handleOpen(open) {
    this.setState({ open: open });
  };
  handleFormat = (event, newFormats) => {
    this.setState({formats: newFormats})
  };

  handleChangeTitle = (event) => {
    this.setState({title: event.target.value});
  }

  handleChangeImage = (event) => {
    this.setState({image: event.target.value});
  }

  handleChangeUrl = (event) => {
    this.setState({url: event.target.value});
  }

  handleChangeAuthor = (event) => {
    this.setState({author: event.target.value});
  }

  deleteArticle = id => {
    const token = sessionStorage.getItem('token');
    axios.post("http://127.0.0.1:8080/home/" + id + "/delete-article", {}, {
      headers: { Authorization: token }
    }).then(res => {
      var myArticles = [];
      this.state.published.map(article => {
        if (article.id != id)
          myArticles.push(article);
      })
      this.setState({published: myArticles});
      alert("Article deleted.");
    })
  }

  createArticle = () => {
    const token = sessionStorage.getItem('token');
    axios.post("http://127.0.0.1:8080/home/create-article", {
      tags: this.state.tags[0],
      author: this.state.author,
      title: this.state.title,
      image: this.state.image,
      url: this.state.url
    }, {
      headers: { Authorization: token }
    }).then(res => {
      alert("Article created !");
    })
  }

  unlike = (id) => {
    const token = sessionStorage.getItem('token');
      axios.post("http://127.0.0.1:8080/home/unlike", {
        id_article: id
        }, {
          headers: { Authorization: token}
        })
      .then (res => {
        var arts = [];
        this.state.likes.map(article => {
          if (article.id != id)
            arts.push(article);
        })
        this.setState({likes: arts});
      });
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div style={styleP.title}>
          YOUR ARTICLES
        </div>
        <br/>
          {myArticles(this.state.published, this.deleteArticle)}
          <br/>
          <Button variant="outlined" style={styleP.button} onClick={() => {this.handleOpen(true)}}> Create an article </Button>
          <Dialog open={this.state.open} onClose={() => this.handleOpen(false)} aria-labelledby="form-dialog-title">
            <div style={styleP.card}>
              <DialogTitle id="form-dialog-title"><div style={styleP.grid.title}>Create an article</div></DialogTitle>
              <div style={styleP.textDialog}>
              <DialogContent>
                Choose a tag:
                <br/><br/>
              <ToggleButtonGroup
                    exclusive
                    value={this.state.formats}
                    onChange={this.handleFormat}
                  >
                    <ToggleButton size="small" style={{ fontSize: 10, marginRight: 10, border: "solid 0.5px"}} value="0">
                      {this.state.tags[0]}
                    </ToggleButton>
                    <ToggleButton style={{fontSize: 10, marginRight: 10, border: "solid 0.5px"}} value="1">
                      {this.state.tags[1]}
                    </ToggleButton>
                    <ToggleButton style={{fontSize: 10, marginRight: 10, border: "solid 0.5px"}} value="2">
                      {this.state.tags[2]}
                    </ToggleButton>
                    <ToggleButton style={{fontSize: 10, marginRight: 10, border: "solid 0.5px"}} value="3">
                      {this.state.tags[3]}
                    </ToggleButton>
                    <ToggleButton style={{fontSize: 10, marginRight: 10, border: "solid 0.5px"}}value="4">
                      {this.state.tags[4]}
                    </ToggleButton>
                    <ToggleButton style={{fontSize: 10, marginRight: 10, border: "solid 0.5px"}} value="5">
                      {this.state.tags[5]}
                    </ToggleButton>
                    <ToggleButton style={{fontSize: 10, border: "solid 0.5px"}} value="6">
                      {this.state.tags[6]}
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <br/><br/>
                  <div>Title:
                  <br/>
                  <TextField
                    variant="standard"
                    margin="normal"
                    id="title"
                    label="Title..."
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                    variant="outlined"
                  />
                  <br/><br/>
                  </div>
                  <div>url:
                  <br/>
                  <TextField
                    variant="standard"
                    margin="normal"
                    id="url"
                    label="Link..."
                    value={this.state.url}
                    onChange={this.handleChangeUrl}
                    variant="outlined"
                  />
                  <br/><br/>
                  </div>
                  <div>picture:
                    <br/><TextField
                    variant="standard"
                    margin="normal"
                    id="image"
                    label="Url of the picture..."
                    value={this.state.image}
                    onChange={this.handleChangeImage}
                    variant="outlined"
                  />
                  <br/><br/>
                  </div>
                  <div>author:
                    <br/><TextField
                    variant="standard"
                    margin="normal"
                    id="author"
                    label="Author..."
                    value={this.state.author}
                    onChange={this.handleChangeAuthor}
                    variant="outlined"
                  />
                  </div>
              </DialogContent>
              </div>
              <br/>
              <DialogActions>
                <div>
                  <Button variant="outlined" fullWidth style={styleP.secondButton} onClick={() => {this.createArticle() }} color="primary">
                    Create
                  </Button>
                </div>
              </DialogActions>
            </div>
          </Dialog>
        <div style={styleP.title}>
          ARTICLES YOU LIKED...
          {Likes(this.state.likes, this.unlike)}
        </div>
      </div>
    )
  }
}


var styleP = {
  hr: {
    color: "grey"
  },
  grid: {
    title: {
      paddingTop: 15,
      fontSize: 18,
      fontWeight: 600,
      textAlign: "left"
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
      width: 220,
      height: 180
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
    paddingTop: 60,
    fontSize: 20,
    fontWeight: 600,
    textAlign: "left"
  },
  ltitle: {
    fontSize: 20,
    fontWeight: 300,
    textAlign: "center"
  },
  textDialog: {
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
    width: "800px",
    height: "800px",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "left",
    alignItems: "left",
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
    fontSize: 10,
    marginLeft: 20,
    color: "black",
    textAlign: "left"
  },
  secondButton: {
    backgroundColor: "white",
    fontSize: 10,
    color: "black"
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 150
  }
};

export default withStyles(styles)(Home);
