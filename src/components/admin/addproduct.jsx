import React, { useEffect, useState} from 'react'
import Adminnav from './adminnav'
import { Grid, makeStyles, Input, Button, withStyles, Container, FormControl, Select, MenuItem } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
    div:{
    backGroundColor: 'grey',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: "22%",
        marginRight: "18%",
        marginTop: "5%",
        backgroundColor: 'white',
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: 240,
      },
      signup: {
        backgroundColor: '#fff',
        color: '#1c1c15',
        fontFamily: 'unset',
        padding: '3%',
        paddingTop: '10%',
        paddingBottom: '5%'
    },
    fullinput: {
        width: '90%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    input: {
        width: '86%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    formControl: {
        width: "86%",
        minWidth: 120,
        marginLeft: '5%',
        marginRight: '5%'
    },
}))

const BootstrapButton = withStyles({
    root: {
        marginTop: "8%",
        marginBottom: "8%",
        marginLeft: '39%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        padding: '6px 40px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#1c1c15',
        borderColor: '#1c1c15',
        color: '#ebebc0',
        fontFamily: 'unset',
        '&:hover': {
            backgroundColor: 'transparent',
            borderColor: '#1c1c15',
            color: '#1c1c15',
            boxShadow: 'none',
        },
    },
})(Button);

const reviewSchema = yup.object({
    Name: yup.string()
        .required()
        .min(3)
    ,
    Price: yup.number()
    .required()
   ,
  Discription: yup.string()
    .required()
    .min(30),
    Categorie: yup.string()
        .required(),
  
})

function Addproduct() {
    const classes = useStyles()
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = useState([]);
    const [productPhoto,setProductPhoto] = useState(null);


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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
        <>
           <Adminnav /> 
           <main className={classes.content}>
            <div className={classes.toolbar} />
        <div className={classes.toolbar} />
        <Container>
            <Grid className={classes.div} spacing={3} container>
            <Grid className={classes.signup} item lg={12} sm={12} md={12}>
                    <Formik
                        validationSchema={reviewSchema}
                        initialValues={{Name: '', Price: '', Discription: '', Categorie: '',}}
                        onSubmit={(values, actions) => { 
                            console.log(productPhoto);
                    
                            
                            
                            categories.map((cat,index) => {
                                if(cat._id == values.Categorie){
                                    return(
                                        values.CategorieName = cat.name
                                        )
                                    }
                                })
                                const form = new FormData()

                                if(productPhoto) {
                                  form.append("Name",values.Name)
                                  form.append("Price",values.Price)
                                  form.append("Discription",values.Discription)
                                  form.append("Categorie",values.Categorie)
                                  form.append("CategorieName",values.CategorieName)
                                  form.append("productPhoto",productPhoto)
                                }
                        
                                try {
                                  fetch(
                                    `http://localhost:7000/ecommerce.com/backend/api/v1/new/product/${values.Categorie}`,
                                    {
                                      method: "POST",
                                      body: form,
                                    }
                                  ).then(async (response) => {
                                    const resJSON = await response.json();
                                    console.log(resJSON, " Agency Package Creation Response");
                                  });
                                } catch (error) {
                                  console.log(error);
                                }
                        
                              
                        }}>
                        {(props) => {
                            return (
                                <>
                                    <Container>
                                        <Grid container>
                                        <Grid item lg={12} md={12} sm={12}>
                                            <h1 style={{textAlign:'center',color:'#292626'}}>Add Product</h1>
                                        </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15',marginLeft: '2.5%' }}>Product Name:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Enter your Name..."
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Name}
                                                    onChange={props.handleChange("Name")}
                                                    onBlur={props.handleBlur("Name")} />
                                                      <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Name && props.errors.Name}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Price:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Price"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Price}
                                                    onChange={props.handleChange("Price")}
                                                    onBlur={props.handleBlur("Price")} />
                                                     <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Price && props.errors.Price}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Discription:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Discription"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Discription}
                                                    onChange={props.handleChange("Discription")}
                                                    onBlur={props.handleBlur("Discription")} />
                                                     <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Discription && props.errors.Discription}</p>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '5%' }}>Categorie:</p>
                                                <FormControl className={classes.formControl}>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={open}
                                                        onClose={handleClose}
                                                        onOpen={handleOpen}
                                                        value={props.values.Categorie}
                                                        onChange={props.handleChange("Categorie")}
                                                        onBlur={props.handleBlur("Categorie")}
                                                    >
                                                       { categories?.map((cat, index) => {
                                                           return(
                                                                    <MenuItem value={cat._id}>{cat.name}</MenuItem>
                                                                )
                                                       })}
                                                    </Select>
                                                </FormControl>
                                                     <p style={{color:'#8f0707',fontWeight:'bold',fontSize:12,textAlign:'center'}}>{props.touched.Categorie && props.errors.Categorie}</p>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12}>
                                                <p style={{ color: '#1c1c15',marginLeft: '5%' }}>Product Photo</p>
                                                <input
                                                    className={classes.input}
                                                    placeholder="Photo"
                                                    onChange={(e) => {
                                                          setProductPhoto(e.target.files[0]);
                                                      }}
                                                    accept="image/*"
                                                    type='file' />
                                            </Grid>
                                         
                                            <Grid item lg={12} sm={12} md={12} xs={12}>
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                    Add Product
                                                </BootstrapButton>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </>
                            )
                        }}

                    </Formik>
                </Grid>
            </Grid>
            </Container>
            </main> 
        </>
    )
}

export default Addproduct
