import React, { useEffect, useState} from 'react'
import Adminnav from './adminnav'
import { Grid, makeStyles, Input, Button, withStyles, Container, FormControl, Select, MenuItem } from '@material-ui/core'
import { Link, useLocation, } from 'react-router-dom';
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

function UpdateProduct() {
    const classes = useStyles()
    const location = useLocation()
    const {Name, Price, Discription, _id, Categorie, categoryId, CategorieName    } = location.state
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = useState([]);


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



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
                        initialValues={{_id, Name, Price, Discription ,Categorie, categoryId, CategorieName }}
                        onSubmit={(values, actions) => { 
                            try {
                                fetch(
                                  `http://localhost:7000/ecommerce.com/backend/api/v1/edit/product/${values._id}`,
                                  {
                                    method: "PATCH",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(values),
                                  }
                                ).then(async (response) => {
                                  const resJSON = await response.json();
                                  console.log(resJSON, " Agency Package Update Response");
                                 // setItem(resJSON.package)
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
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15',marginLeft: '5%' }}>Product Photo</p>
                                                <input
                                                    className={classes.input}
                                                    placeholder="Photo"
                                                    type='file' />
                                            </Grid>
                                         
                                            <Grid item lg={12} sm={12} md={12} xs={12}>
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                    Update
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

export default UpdateProduct
