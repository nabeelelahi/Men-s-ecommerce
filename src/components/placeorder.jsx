import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { Grid, makeStyles, Input, Button, withStyles, Container, FormControl, Select, MenuItem } from '@material-ui/core'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
    div: {
        backGroundColor: '#f5f1e6',
    },
    signup: {
        backgroundColor: '#fff',
        color: '#1c1c15',
        fontFamily: 'unset',
        padding: '3%',
        paddingTop: '10%',
        paddingBottom: '5%',
        marginTop: '8%'
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
    Address: yup.string()
        .required()
        .min(10),
    Credit: yup.string()
        .required()
        .test("Credit", 'Enter your credit card number Correctly without "-"', (val) => {
            return (
                new RegExp(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/igm).test(val)
            )
        }),
    Zipcode: yup.string()
        .required()
        .test("Zipcode", "Zip Code must be 5 characters (Numbers)", (val) => {
            return (
                new RegExp(/^([0-9]{5})$/igm).test(val)
            )
        }),
    Date: yup.string()
        .required()
        .test("Date", "Date must be in the format of MM/DD/YYYY", (val) => {
            return (
                new RegExp(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/).test(val)
            )
        }),

})

function PlaceOrder() {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const { _id, Name, Price } = location.state
    const user = JSON.parse(localStorage.getItem('user'))
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState('');

    return (
        <>
            <Nav />
            <Container>
                <Grid className={classes.div} spacing={3} container>
                    <Grid className={classes.signup} item lg={12} sm={12} md={12}>
                        <Formik
                            validationSchema={reviewSchema}
                            initialValues={{ ProductName: Name,UserId: user._id, ProductId: _id, UserName: user.Name, UserPhone: user.Phone, Price: Price, Quantity: '', Credit: '', Zipcode: '', Date: '' }}
                            onSubmit={(values, actions) => {
                                values.Amount = values.Price * values.Quantity
                                console.log(values)

                                try {
                                    fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/create/order`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify(values)
                                    }).then(async(response) => {
                                      const resJSON = await response.json()
                                      console.log(resJSON, 'Register Response')
                                      if(resJSON.info){
                                        navigate('/')
                                    }
                                    else{
                                        alert(resJSON.message)
                                    }
                                    })
                                  } catch (error) {
                                    console.log(error)
                                  }
                            }
                            }>
                            {(props) => {
                                return (
                                    <>
                                        <Container>
                                            <Grid container>
                                                <Grid item lg={12} md={12} sm={12}>
                                                    <h1 style={{ textAlign: 'center', color: '#292626' }}>Order Details</h1>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>User Name:</p>
                                                    <p style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, backgroundColor: '#f5f1e6', width: '95%', padding: '0.5%', borderRadius: 5 }}>{props.values.UserName}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '5%' }}>User Phone:</p>
                                                    <p style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, backgroundColor: '#f5f1e6', width: '95%', padding: '0.5%', borderRadius: 5 }}>{props.values.UserPhone}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Product Name:</p>
                                                    <p style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, backgroundColor: '#f5f1e6', width: '95%', padding: '0.5%', borderRadius: 5 }}>{props.values.ProductName}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '5%' }}>Price:</p>
                                                    <p style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, backgroundColor: '#f5f1e6', width: '95%', padding: '0.5%', borderRadius: 5 }}>{props.values.Price}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Quantity:</p>
                                                    <Input
                                                        className={classes.input}
                                                        placeholder="Quantity"
                                                        inputProps={{ 'aria-label': 'description' }}
                                                        value={props.values.Quantity}
                                                        onChange={props.handleChange('Quantity')}
                                                        onBlur={props.handleBlur('Quantity')} />
                                                    <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Quantity && props.errors.Quantity}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '5%' }}>Total Amount:</p>
                                                    <p style={{ minHeight: '27px', color: '#8f0707', fontWeight: 'bold', fontSize: 20, backgroundColor: '#f5f1e6', width: '95%', padding: '0.5%', borderRadius: 5 }}>{props.values.Quantity * props.values.Price}</p>
                                                </Grid>
                                                <Grid item lg={12} md={12} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Address:</p>
                                                    <Input
                                                        className={classes.fullinput}
                                                        placeholder="Address"
                                                        inputProps={{ 'aria-label': 'description' }}
                                                        value={props.values.Discription}
                                                        onChange={props.handleChange("Address")}
                                                        onBlur={props.handleBlur("Address")} />
                                                    <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Address && props.errors.Address}</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item lg={12} md={12} sm={12}>
                                                    <h1 style={{ textAlign: 'center', color: '#292626' }}>Payment Details</h1>
                                                </Grid>
                                                <Grid item lg={12} md={12} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Credit Card Number:</p>
                                                    <Input
                                                        className={classes.fullinput}
                                                        placeholder='Enter your credit card number Correctly without "-"'
                                                        inputProps={{ 'aria-label': 'description' }}
                                                        value={props.values.Credit}
                                                        onChange={props.handleChange("Credit")}
                                                        onBlur={props.handleBlur("Credit")} />
                                                    <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Credit && props.errors.Credit}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>City Postal Code:</p>
                                                    <Input
                                                        className={classes.input}
                                                        placeholder="Zip Code..."
                                                        inputProps={{ 'aria-label': 'description' }}
                                                        value={props.values.Name}
                                                        onChange={props.handleChange("Zipcode")}
                                                        onBlur={props.handleBlur("Zipcode")} />
                                                    <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Zipcode && props.errors.Zipcode}</p>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12}>
                                                    <p style={{ color: '#1c1c15', marginLeft: '5%' }}>Expiration Date</p>
                                                    <Input
                                                        className={classes.input}
                                                        placeholder="Date of Expiry...(MM/DD/YYYY)"
                                                        inputProps={{ 'aria-label': 'description' }}
                                                        value={props.values.Name}
                                                        onChange={props.handleChange("Date")}
                                                        onBlur={props.handleBlur("Date")} />
                                                    <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Date && props.errors.Date}</p>
                                                </Grid>
                                                <Grid item lg={12} sm={12} md={12} xs={12}>
                                                    <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                        Place Order
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
        </>
    )
}

export default PlaceOrder
