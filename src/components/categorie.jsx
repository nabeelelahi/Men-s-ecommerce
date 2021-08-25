import React, { useState, useEffect } from 'react'
import Footer from './footer'
import Nav from './Nav'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Paper, Container, makeStyles, Button, withStyles } from '@material-ui/core'

const BootstrapButton = withStyles({
    root: {
        marginLeft: '40%',
        margin: "1px",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "13px",
        padding: '8px 16px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#292626',
        borderColor: '#292626',
        color: '#fff',
        fontFamily: 'unset',
        '&:hover': {
            backgroundColor: 'transparent',
            borderColor: '#292626',
            color: '#292626',
            boxShadow: 'none',
        },
    },
})(Button);

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#fff',
        width: '95%',
        height: '400px',
    }
})

function Categorie() {
        const classes = useStyles()
       const  location = useLocation()
       const navigate = useNavigate()
        const { _id, name } = location.state
        const [products, setProducts] = useState([])

        function fetchProducts(){
            try {
                fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/admin/get/products`)
                .then(async res => {
                    const ResJSON = await res.json()
                    setProducts(ResJSON.products)
                // .then((response) => {
                //  const resJSON = response.json();
                //   console.log(resJSON, "Categories");
                });
              } catch (error) {
                console.log(error);
              }
        }

        useEffect(() => {
            fetchProducts()
        }, [])

    return (
        <>
          <Nav />
          <div  style={{ backgroundColor: '#f7f9fc', paddingTop: '4%', marginTop: '-1%',minHeight:'780px', }}>
            <h3 style={{ color: '#292626', fontFamily: "unset",textAlign:'center',fontSize: 50 }}>{name}</h3>
            <Container>
                <Grid container spacing={4}>
                    {
                        products?.map((Product, index) => {
                           if(Product.Categorie == _id){
                            return (                               
                                <Grid key={Product._id} item lg={4} md={4} sm={6} xs={12}>
                                    <Paper elevation={1}  className={classes.paper}>
                                        <img src={`http://localhost:7000${Product.image}`} style={{ width: '100%', height: '70%' }} alt="" />
                                        <p style={{ colour: '#520c0e', fontSize: '20px', fontFamily: 'unset',textAlign:'center', }}>{Product.Name}</p>
                                        <BootstrapButton 
                                        variant="contained" 
                                        color="primary" 
                                        disableRipple 
                                        className={classes.margin}
                                        onClick={() => navigate(`/product/${Product._id}`, {state: {...Product}})}
                                        >
                                        Buy
                                        </BootstrapButton>
                                    </Paper>
                                </Grid>
                            )
                           }
                           if(products.length == '0'){
                            return (                               
                                <Grid key={index.toString()} item lg={12} md={12} sm={12} xs={12}>
                                   <h3 style={{color:'blue',textAlign:'center',fontFamily:'monospace'}}>No products available</h3>
                                </Grid>
                            )
                           }
                        })
                    }
                </Grid>
            </Container>
        </div>
          <Footer />  
        </>
    )
}

export default Categorie
