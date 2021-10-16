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
  Menu,
  MenuItem,
  IconButton,
  Input
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SearchIcon from '@material-ui/icons/Search';

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
    marginBottom: '1.5%',
  },
  searchBar: {
    width: '100%',
    height: '95%',
    backgroundColor: 'hsla(360, 100%, 100%, 0.3)',
    borderRadius: 30
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: "scroll",
    paddingTop: '35%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  searchCard: {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const menuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };


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
        `http://192.168.0.107:5000/`,
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
            setSearchResults(resJSON.results)
            console.log(searchResults)
            setOpen(true)
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

  return (
    <AppBar position={position} className={classes.nav}>
      <Grid container>
        <Grid
          style={{ marginTop: '10px' }}
          item xs={12} lg={4} md={4} sm={12}
        >
          <Link to='/'
            style={{ color: '#fff', fontFamily: 'unset', fontSize: 30, fontWeight: 'bold', textDecoration: 'none', margin: '2%' }}
          >
            Shopping Assistance System
          </Link>
        </Grid>
        <Grid xs={12} lg={4} md={4} sm={12}>
          <div className={classes.searchBox}>
            <Grid className={classes.searchBar} style={{ height: '100%' }} container>
              <Grid item xs={3} lg={3} sm={3} md={3}>
                <label htmlFor="icon-button-file">
                  <Input 
                  accept="image/*" 
                  id="icon-button-file" 
                  type="file" 
                  style={{ display: 'none' }} 
                  onChange={(e) => setUploadedImage(e.target.files[0])}
                  />
                  <IconButton variant="outlined" aria-label="upload picture" component="span">
                    <PhotoCamera style={{ color: '#fff' }} />
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={7} lg={7} sm={7} md={7} />
              <Grid item xs={2} lg={2} sm={2} md={2}>
                <IconButton onClick={searchByImage} variant="outlined" component="span">
                  <SearchIcon style={{ color: '#fff' }} />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} lg={4} md={4} sm={12}>
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
          {
            user ?
              <>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={menuClick}
                >
                  Dashboard
                </Button>
                <Menu
                  id="basic-menu"
                  open={menuOpen}
                  anchorEl={anchorEl}
                  onClose={menuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={menuClose}>Profile</MenuItem>
                  <MenuItem onClick={menuClose}>My account</MenuItem>
                  <MenuItem onClick={menuClose}>Logout</MenuItem>
                </Menu>
              </>
              :
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                className={classes.margin}
                onClick={() => navigate('/login')}
              >
                Log in
              </BootstrapButton>

          }
        </Grid>
      </Grid>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={menuOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{ backGroundColor: 'grey' }}>
                <h2 style={{ textAlign: 'center' }}>Search Results</h2>
                {searchResults &&
                  searchResults?.map((item) => {
                    // alert(JSON.stringify(item))
                    return (
                      <Grid container key={item._id}>
                        <Grid item lg={2} md={3} sm={4} xs={12} className={classes.searchCard} >
                          <img src={`http://localhost:7000${item.image}`} height="97%" width="50%" style={{ margin: '3%' }} alt='' />
                        </Grid>
                        <Grid item lg={8} md={6} sm={4} xs={12}>
                          <p style={{ fontFamily: 'unset', color: '#292626', fontWeight: 'bold' }}>{item.Name} </p>
                          <p style={{ fontFamily: 'unset', color: 'blue', marginTop: '-1%' }}>Price: {item.Price}</p>
                          <p style={{ fontFamily: 'unset', color: '#292626', marginTop: '-2%' }}>Categorie: {item.CategorieName}</p>
                        </Grid>
                        <Grid item lg={2} md={3} sm={4} xs={12}>
                          <BagButton onClick={() => navigate(`/product/${item._id}`, { state: { ...item } })}>
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


export default Nav;
