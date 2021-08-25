import {React, useState, useEffect} from 'react'
import { Grid, Paper, Container, makeStyles, Button, withStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import Product2 from '../assets/formal.jpg'
import Product3 from '../assets/kurta.jpg'
import Product4 from '../assets/shoes.jpg'
import Product5 from '../assets/t-shirt.jpg'
import Product6 from '../assets/shirt.jpg'
import Product7 from '../assets/jeans.jpg'



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

const popularProducts = [
    { photo: Product2, name: 'Formal',price: "8000" },
    { photo: Product3, name: 'Shalwar Kaameez',price: "2000" },
    { photo: Product4, name: 'Shoes',price: "1500" },
    { photo: Product5, name: 'T-Shirt',price: "500" },
    { photo: Product6, name: 'Shirt',price: "1200" },
    { photo: Product7, name: 'Jeans',price: "1000" },
]

function HomeBody() {
    const navigate = useNavigate()
    const classes = useStyles()
    const [products, setProducts] = useState([])
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
        fetchcategories()
        fetchProducts()
    }, [])
    
    
  
    
    return (
        <>
          {
      categories?.map((cat, index) => {
            return(
        <div id={cat.name} key={cat._id} style={{ backgroundColor: '#f7f9fc', padding: '1%', marginTop: '-1%',minHeight:'500px', }}>
            <h3 style={{ color: '#292626', fontFamily: "unset",textAlign:'center',fontSize: 50 }}>{cat.name}</h3>
            <Container>
                <Grid container spacing={4}>
                    {products ?
                        products?.map((Product, index) => {
                           if(Product.Categorie == cat._id){
                            return (                               
                                <Grid key={index.toString()} item lg={4} md={4} sm={6} xs={12}>
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
                        }) :
                        <h3>No products available</h3>
                    }
                </Grid>
            </Container>
        </div>
      )
    })
                }
        </>
    )
}

export default HomeBody
