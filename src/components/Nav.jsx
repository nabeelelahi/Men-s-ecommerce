import {
  AppBar,
  makeStyles,
  withStyles,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BootstrapButton = withStyles({
  root: {
    height: '100%',
    boxShadow: "none",
    textTransform: "none",
    fontSize: "13px",
    padding: "6px 32px",
    lineHeight: 1.5,
    backgroundColor: "#292626",
    color: "#fff",
    fontFamily: "unset",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#fff",
      color: "#292626",
      boxShadow: 'none'
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: "#292626",
    flexDirection: "row",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav({ position }) {
  const classes = useStyles();
  const navigate = useNavigate()



    const user = JSON.parse(localStorage.getItem('user'))

  if(user){
    return (
      <AppBar position={position} className={classes.nav}>
        <Grid container>
          <Grid item xs={12} lg={8} md={6} sm={12} xs={12}>
   
              <Link to='/' style={{color:'#fff',fontFamily: 'unset',fontSize:45,fontWeight:'bold',textDecoration:'none',margin:'2%'}}>E-Commerce</Link>
          </Grid>
          <Grid item xs={12} lg={4} md={6} sm={12} xs={12}>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/shopnow')}
              >
                Shop
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/aboutus')}
              >
                About
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/contactus')}
              >
                  Contact Us
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => { 
                  localStorage.clear();
                  navigate('/')
                }}
              >
                  Log out
              </BootstrapButton>
          </Grid>
        </Grid>
      </AppBar>
      )
  }
  else{
    return (
      <AppBar position={position} className={classes.nav}>
        <Grid container>
          <Grid item xs={12} lg={8} md={6} sm={12} xs={12}>
   
              <Link to='/' style={{color:'#fff',fontFamily: 'unset',fontSize:45,fontWeight:'bold',textDecoration:'none',margin:'2%'}}>E-Commerce</Link>
          </Grid>
          <Grid item xs={12} lg={4} md={6} sm={12} xs={12}>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/shopnow')}
              >
                Shop
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/aboutus')}
              >
                About
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/contactus')}
              >
                  Contact Us
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/login')}
              >
                  Log in
              </BootstrapButton>
          </Grid>
        </Grid>
      </AppBar>
    )
  }
  
}

export default Nav;
