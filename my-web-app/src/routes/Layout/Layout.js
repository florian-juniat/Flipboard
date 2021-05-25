import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: "grey",
  },
  appBar: {
    zIndex: theme.zIndex.drawer,
    backgroundColor: '#FFFFFF',
    marginLeft: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div style={{alignItems: "left"}}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <div className={classes.title}>
                  epiflipord
        </div>
        <div>
        <Button>
          <Link to="/" className={classes.link}>
          <img style={{height: 40, width: 40}}src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flipboard_logo.svg/1200px-Flipboard_logo.svg.png"/>
          </Link>
          </Button>
          <Button>
          <Link to="/foryou" className={classes.link}>
            For you
          </Link>
          </Button>
          <Button>
          <Link to="/news" className={classes.link}>
            explorer
          </Link>
          </Button>
          <Button>
          <Link to="/tags" className={classes.link}>
            Edit favorites
          </Link>
          </Button>
        </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}