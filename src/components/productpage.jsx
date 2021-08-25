import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Footer from './footer'
import { Container, Grid, makeStyles, withStyles, Paper, Button, TextField } from '@material-ui/core'
import Product3 from '../assets/kurta.jpg'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import OneStar from '../assets/onestar.png'
import TwoStars from '../assets/twostars.png'
import ThreeStars from '../assets/threestars.png'
import FourStars from '../assets/fourstars.png'
import FiveStars from '../assets/fivestars.png'
import ZeroStars from '../assets/zerostar.png'


const useStyles = makeStyles({
    paper: {
        backgroundColor: '#fff',
        width: '100%',
        minHeight: '700px',
        marginTop: '10%',
        marginBottom: '5%',
        borderRadius: 50,
    },
    input: {
        width: '95%'
    },
    addreview: {
        width: '100%',
    },
    reviewSection: {
        marginTop: '3%'
    }
})

const BootstrapButton = withStyles({
    root: {
        marginTop: "4%",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "18px",
        padding: '10px 32px',
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

const AddReviewButton = withStyles({
    root: {
        marginTop: "4%",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "18px",
        padding: '10px 32px',
        border: '1px solid',
        borderRadius: 0,
        width: '100%',
        textAlign: 'center',
        lineHeight: 1.5,
        backgroundColor: '#292626',
        borderColor: '#292626',
        color: '#fff',
        fontFamily: 'unset',
        '&:hover': {
            backgroundColor: '#171515',
            borderColor: '#171515',
            color: '#fff',
            boxShadow: 'none',
        },
    },
})(Button);




function ProductPage() {
    const classes = useStyles()
    const location = useLocation()
    const navigate = useNavigate()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [allReviews, setAllReviews] = useState('')
    const { Name, _id, Price, Discription } = location.state
    const Product = { ...location.state }
    const user = JSON.parse(localStorage.getItem('user'))
    const UserName = user ? user.Name : ''
    const UserEmail = user ? user.Email : ''
   

    const ratingStars = {
        '': ZeroStars,
        '1': OneStar,
        '2': TwoStars,
        '3': ThreeStars,
        '4': FourStars,
        '5': FiveStars,
    }

    function addReview() {
        try {
            fetch(`http://127.0.0.1:8000/predict?input=${review}`,)
                .then(async (response) => {
                    const resJSON = await response.json();
                    if(resJSON.prediction == '' || !resJSON.prediction){
                        alert("Please re-enter your Review so that our system can calculate rating from it..")
                    }
                    else{
                    setRating(resJSON.prediction)
                    alert(`Your Ratings as per your review is predicted to be ${rating}`)

                    saveRating()
                    }
                })
        } catch (error) {
            alert(error);
        }
    }

    async function saveRating(){
        const values = { UserName: UserName, UserEmail:UserEmail, rating: rating, review: review, ProductID: _id }
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/addreview/${_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            }).then(async (response) => {
                const resJSON = await response.json()
                console.log(resJSON, 'Review Response Response')
            })
        } catch (error) {
            console.log(error)
        }
    }

    function fetchAllReviews() {
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/user/get/review`)
                .then(async res => {
                    const ResJSON = await res.json()
                    setAllReviews(ResJSON.review)
                    //      console.log(ResJSON.review)
                    console.log(allReviews)
                    // .then((response) => {
                    //  const resJSON = response.json();
                    //   console.log(resJSON, "Categories");
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllReviews()
    }, [])


    return (
        <>
            <Nav />
            <div style={{ backgroundColor: '#f7f9fc', padding: '1%', marginTop: '-1%', justifyContent: 'center', alignItems: 'center' }}>
                <Container>
                    <Paper>
                        <Grid className={classes.paper} container>
                            <Grid item xs={12} lg={6} md={6} sm={12} >
                                <img src={`http://localhost:7000${Product.image}`} style={{ borderRadius: 25, margin: '10%', marginTop: '25%', height: '60%', width: '80%' }} alt='' />
                            </Grid>
                            <Grid item xs={12} lg={6} md={6} sm={12} >
                                <h1 style={{ fontFamily: 'unset', fontWeight: 'bolder', fontSize: 60, marginTop: '23%' }}>{Name}</h1>
                                <p style={{ fontFamily: 'unset', fontWeight: 'bolder', marginTop: '-7%', fontSize: 15, color: 'grey' }}>Ratings</p>
                                <p style={{ fontFamily: 'unset', fontSize: 35, fontStyle: 'italic', marginTop: '-2%', fontWeight: 'bold' }}>{Price}</p>
                                <h2 style={{ fontFamily: 'unset', fontSize: 25, marginTop: '-5%' }}>Discription</h2>
                                <p style={{ fontSize: 15, margin: '2%', fontStyle: 'italic' }}>{Discription}</p>
                                <BootstrapButton
                                    variant="contained"
                                    color="primary"
                                    disableRipple
                                    className={classes.margin}
                                    onClick={() => { 
                                        user ?
                                        navigate(`/placeorder/${Product._id}`, { state: { ...Product } }) :
                                        navigate(`/login`)
                                    }
                                    }
                                >
                                    Buy Now
                                </BootstrapButton>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container>
                     {user && 
                     <>
                      <Grid item xs={12} lg={12} md={12} sm={12} >
                            <h1 style={{ textAlign: 'center', marginBottom: '8%', color: '' }}>Reviews</h1>
                        </Grid>
                        <Grid item xs={8} lg={12} md={12} sm={12} >
                        <p>Your Review about {Product.Name} ?</p>
                        <TextField
                            className={classes.input}
                            id="outlined-multiline-static"
                            multiline
                            rows={2}
                            onChange={e => setReview(e.target.value)}
                            placeholder="Enter your Review...."
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={1} lg={3} md={4} sm={2} />
                    <Grid item xs={10} lg={6} md={4} sm={8} >
                        <AddReviewButton
                            variant="contained"
                            color="primary"
                            disableRipple
                            onClick={addReview}
                            className={{ ...classes.margin, ...classes.addreview }}
                        >
                            Add Review
                        </AddReviewButton>
                    </Grid>
                    </>
                     }
                        <Grid item xs={1} lg={3} md={4} sm={2} />
                        <Grid item xs={12} lg={12} md={12} sm={12} className={classes.reviewSection}>

                            <Paper>
                                {allReviews &&
                                <>
                                        <h2 style={{ textAlign: 'center', marginBottom: '3%', color: '' }}>Previous Reviews</h2>
                                  {  allReviews?.map((rev, index) => {
                                        // console.log(Product)
                                        if (rev.ProductID == _id) {
                                            return (
                                                <Grid container key={rev._id}>
                                                    <Grid item lg={2} md={3} sm={4} xs={12}>
                                                        <AccountCircleIcon style={{ fontSize: 45, marginLeft: '7%', marginTop: '15%' }} />
                                                    </Grid>
                                                    <Grid item lg={10} md={9} sm={8} xs={12}>
                                                        <div style={{ flexDirection: 'row' }}>
                                                            <p style={{ fontFamily: 'unset', color: '#292626', fontWeight: 'bold' }}>{rev.UserName} </p>
                                                            <img src={ratingStars[rev.rating]} style={{ marginTop: '-2%', marginBottom: '1%' }} alt='rating'></img>
                                                        </div>
                                                        <p style={{ fontFamily: 'unset', color: '#292626', marginTop: '-2%' }}>{rev.review}</p>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    }) }
                                    </>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default ProductPage;
