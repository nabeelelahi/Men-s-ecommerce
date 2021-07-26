import {React, useState, useEffect} from 'react'
import { Grid, Paper, Container, makeStyles, Button, withStyles } from '@material-ui/core'
import { resolvePath, useNavigate } from 'react-router-dom';
import Product2 from '../assets/formal.jpeg'
import Product3 from '../assets/kurta.jpg'
import Product4 from '../assets/shoes.jpeg'
import Product5 from '../assets/t-shirt.jpeg'
import Product6 from '../assets/shirt.jpeg'
import Product7 from '../assets/jeans.jpeg'



const BootstrapButton = withStyles({
    root: {
        marginTop: '-95%',
        borderRadius: 10,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: "30px",
        fontFamily: 'cursive',
        padding: '10px 36px',
        border: '1px solid',
        lineHeight: 1.5,
        opacity: 0,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        color: '#292626',
        '&:hover': {
            backgroundColor: 'hsla(360, 100%, 100%, 0.7)',
            borderColor: '#fff',
            color: '#292626',
            boxShadow: 'none',
            opacity: 1,
        },
    },
})(Button);

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#fff',
        width: '100%',
        height: '350px',
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
    const [Products, setProducts] = useState([])
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
        <div style={{ backgroundColor: '#f7f9fc', padding: '1%', marginTop: '-1%' }}>
            <h3 style={{ color: '#292626', fontFamily: "unset",textAlign:'center',fontSize: 50 }}>Categories</h3>
            <Container>
                <Grid container spacing={2}>
                    {
                        categories?.map((cat, index) => {
                           // console.log(Product)
                            return (                               
                                <Grid key={cat._id} item lg={4} md={4} sm={6} xs={12}>
                                    <Paper elevation={0}  className={classes.paper}>
                                            <img src={cat.image} style={{height:'99%',width:'99%',borderRadius:10,}} alt='' />
                                        <div style={{ width: '100%', height: '100%', borderRadius: 10,}}>
                                        <BootstrapButton 
                                        variant="contained" 
                                        color="primary" 
                                        disableRipple 
                                        className={classes.margin}
                                        onClick={() => navigate(`/categories/${cat._id}`, {state: {...cat}})}
                                        >
                                         {cat.name}
                                        </BootstrapButton>
                                        </div>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default HomeBody
