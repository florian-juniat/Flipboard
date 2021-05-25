import React, { Component } from 'react';
import Favorite from '@material-ui/icons/Favorite';
import NotFavorite from '@material-ui/icons/FavoriteBorder';

export default class Icons extends Component { 
    constructor(props) {
      super(props);
      this.state = {
        isCardView: false,
      }
    } 
  
    render() {
      const {actual, other} = this.props;

        return (
          <a className="btn btn-primary" onClick={()=>this.setState({ isCardView: !this.state.isCardView })}>
            { this.state.isCardView
              ? other
              : actual
            }
            &nbsp;&nbsp;
          </a>
        );
    }
  
  }