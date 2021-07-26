import {
    AppBar,
    makeStyles,
    withStyles,
    Grid,
    Button,
    Container
  } from "@material-ui/core";
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  const BootstrapButton = withStyles({
    root: {
      boxShadow: "none",
      textTransform: "none",
      fontSize: "13px",
      padding: "8px 16px",
      height: '100%',
      borderRadius: 0,
      lineHeight: 1.5,
      width: '100%',
      backgroundColor: "#fff",
      color: "#292626",
      fontFamily: "unset",
      textAlign: 'center',
      "&:hover": {
        backgroundColor: "#dce6e6",
        color: "#000",
        boxShadow: "none",
      },
    },
  })(Button);
  
  const useStyles = makeStyles((theme) => ({
    nav: {
      backgroundColor: "#fff",
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

function ShopBar() {
    const classes = useStyles();
    const [categories, setCategories] = useState([])

    function fetchcategories(){
      try {
          fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/user/get/category`)
          .then(async res => {
              const ResJSON = await res.json()
              setCategories(ResJSON.category)
          // .then((response) => {
          //  const resJSON = response.json();
          //   console.log(resJSON, "Categories");
          });
        } catch (error) {
          console.log(error);
        }
  }
  useEffect(() => {
    fetchcategories()
  }, [])

  return (
    <AppBar position="sticky" className={classes.nav}>
        <Container>
    <Grid container>
    {
      categories?.map((cat, index) => {
      return(
      <Grid key={cat._id} item xs={2} lg={2} md={2} sm={2} xs={4}>
          <BootstrapButton
            variant="contained"
            color="primary"
            disableRipple
            className={classes.margin}
          >
            <a
              style={{ textDecoration: "none", color: "#292626" }}
              href={`#${cat.name}`}
            >
            {cat.name}
            </a>
          </BootstrapButton>
          </Grid>
      )
      })
    }
    </Grid>
    </Container>
  </AppBar>
  );
}

export default ShopBar;
