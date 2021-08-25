import {
  AppBar,
  makeStyles,
  withStyles,
  Grid,
  Button,
  InputBase,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocalMallIcon from '@material-ui/icons/LocalMall';

const BootstrapButton = withStyles({
  root: {
    height: '100%',
    boxShadow: "none",
    textTransform: "none",
    fontSize: "13px",
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

const SearchButton = withStyles({
  root: {
    height: '68%',
    marginTop: '6%',
    width: '100%',
    boxShadow: "none",
    textTransform: "none",
    fontSize: "13px",
    backgroundColor: "#fff",
    color: "#292626",
    fontFamily: "unset",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLefttRadius: 0,
    "&:hover": {
      backgroundColor: "#292626",
      color: "#fff",
      boxShadow: 'none'
    },
  },
})(Button);

const BagButton = withStyles({
  root: {
    height: '50%',
    boxShadow: "none",
    textTransform: "none",
    fontSize: "13px",
    backgroundColor: "#292626",
    color: "#fff",
    fontFamily: "unset",
    marginTop: "10%",
    borderRadius: 5,
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
  search: {
    backgroundColor: "hsla(360, 100%, 100%, 0.65)",
    marginTop: '2%',
    borderTopLeftRadius: 5,
    borderBottomLefttRadius: 5,
  },
  searchBox: {
    width: '70%',
    height: '80%',
    marginTop: '1.5%',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '75%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  searchCard:{
    maxHeight: '120px',
  }
}));

function Nav({ position }) {
  const classes = useStyles();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [searchImages, setSearchImages] = useState('')


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchByImage = () => {
    const form = new FormData()
    form.append('query_img', uploadedImage)
    try {
      fetch(
        `http://192.168.2.105:5000/`,
        {
          method: "POST",
          body: form,
        }
      ).then(async (response) => {
        const resJSON = await response.json();
        setSearchImages(resJSON);
        console.log(resJSON);
      }).then(() => {
        try {
          fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/user/imagesearch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchImages)
          }).then(async (response) => {
            const resJSON = await response.json()
            console.log(resJSON.results)
            setSearchResults(resJSON.results)
            handleOpen()
          })
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error);
    }

  }



  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    return (
      <AppBar position={position} className={classes.nav}>
        <Grid container>
          <Grid item xs={12} lg={4} md={6} sm={12} xs={12}>
            <Link to='/' style={{ color: '#fff', fontFamily: 'unset', fontSize: 45, fontWeight: 'bold', textDecoration: 'none', margin: '2%' }}>E-Commerce</Link>
          </Grid>
          <Grid xs={12} lg={4} md={6} sm={12} xs={12}>
          <div className={classes.searchBox}>
              <Grid style={{ height: '100%', }} container>
                <Grid item xs={9} lg={9} sm={9} md={9}>
                  <div className={classes.search}>
                    <InputBase
                      className={classes.inputInput}
                      placeholder="Search…"
                      onChange={(e) => {
                        setUploadedImage(e.target.files[0]);
                      }}
                      type="file"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                </Grid>
                <Grid xs={3} lg={3} sm={3} md={3}>
                  <SearchButton type="button" onClick={searchByImage}>
                  Image Search
                  </SearchButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} lg={4} md={12} sm={12} xs={12}>
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
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
              <div style={{backGroundColor:'grey'}}>
                        <h2 style={{textAlign:'center'}}>Search Results</h2>
                       {searchResults &&  
                            searchResults?.map((item) => {
                              console.log(item)                            
                               return (   
                                   <Grid container key={item._id}>
                           <Grid item lg={2} md={3} sm={4} xs={12}  className={classes.searchCard} >
                             <img src={`http://localhost:7000${item.image}`} height="97%" width="50%" style={{margin:'3%'}} alt=''/>
                          </Grid>
                           <Grid item lg={8} md={6} sm={4} xs={12}>
                                       <p style={{fontFamily:'unset',color:'#292626',fontWeight:'bold'}}>{item.Name} </p>
                                       <p style={{fontFamily:'unset',color:'blue',marginTop:'-1%'}}>Price: {item.Price}</p>
                                       <p style={{fontFamily:'unset',color:'#292626',marginTop:'-2%'}}>Categorie: {item.CategorieName}</p>
                           </Grid>
                           <Grid item lg={2} md={3} sm={4} xs={12}>
                                     <BagButton onClick={() => navigate(`/product/${item._id}`, {state: {...item}})}>
                                     <LocalMallIcon color={'white'} />
                                     </BagButton>
                           </Grid>
                       </Grid> 
                               )
                           })
                       }
                    </div>
              </div>
            </Fade>
          </Modal>
      </AppBar>
    )
  }
  else {
    return (
      <AppBar position={position} className={classes.nav}>
        <Grid container>
          <Grid item xs={12} lg={4} md={4} sm={12} xs={12}>

            <Link to='/' style={{ color: '#fff', fontFamily: 'unset', fontSize: 45, fontWeight: 'bold', textDecoration: 'none', margin: '2%' }}>E-Commerce</Link>
          </Grid>
          <Grid xs={12} lg={4} md={4} sm={12} xs={12}>
            <div className={classes.searchBox}>
              <Grid style={{ height: '100%', }} container>
                <Grid item xs={9} lg={9} sm={9} md={9}>
                  <div className={classes.search}>
                    <InputBase
                      className={classes.inputInput}
                      placeholder="Search…"
                      onChange={(e) => {
                        setUploadedImage(e.target.files[0]);
                      }}
                      type="file"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                </Grid>
                <Grid xs={3} lg={3} sm={3} md={3}>
                  <SearchButton type="button" onClick={searchByImage}>
                    Image Search
                  </SearchButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} lg={4} md={4} sm={12} xs={12}>
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
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
              <div style={{backGroundColor:'grey'}}>
                        <h2 style={{textAlign:'center'}}>Search Results</h2>
                       {searchResults &&  
                            searchResults?.map((item) => {
                              console.log(item)                            
                               return (   
                                   <Grid container key={item._id}>
                           <Grid item lg={2} md={3} sm={4} xs={12}  className={classes.searchCard} >
                             <img src={`http://localhost:7000${item.image}`} height="97%" width="50%" style={{margin:'3%'}} alt=''/>
                          </Grid>
                           <Grid item lg={8} md={6} sm={4} xs={12}>
                                       <p style={{fontFamily:'unset',color:'#292626',fontWeight:'bold'}}>{item.Name} </p>
                                       <p style={{fontFamily:'unset',color:'blue',marginTop:'-1%'}}>Price: {item.Price}</p>
                                       <p style={{fontFamily:'unset',color:'#292626',marginTop:'-2%'}}>Categorie: {item.CategorieName}</p>
                           </Grid>
                           <Grid item lg={2} md={3} sm={4} xs={12}>
                                     <BagButton onClick={() => navigate(`/product/${item._id}`, {state: {...item}})}>
                                     <LocalMallIcon color={'white'} />
                                     </BagButton>
                           </Grid>
                       </Grid> 
                               )
                           })
                       }
                    </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </AppBar>
    )
  }

}

export default Nav;
