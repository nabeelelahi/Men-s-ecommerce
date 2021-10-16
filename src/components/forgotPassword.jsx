import React, { useState } from 'react'
import { Grid, makeStyles, Input, Button, withStyles, Container, Modal, Fade, } from '@material-ui/core'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'
import Nav from './Nav'
import Footer from './footer'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#f7f9fc',
        color: '#1c1c15',
        fontFamily: 'unset',
        padding: '3%',
        paddingTop: '10%',
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
})

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
    Email: yup.string()
        .required()
        .test("Email", "Email must fullfill the requirement example abc@gmail.com", (val) => {
            return (
                new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/igm).test(val)
            )
        }),
})

function ForgotPassword() {
    const classes = useStyles()

    const navigate = useNavigate()

    const location = useLocation()

    function sendCodeMethod(values) {
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/forgot-password/${values.Email}`)
                .then(async (response) => {
                    const resJSON = await response.json()
                    if (resJSON.success === true) {
                        values.code = resJSON.code
                        navigate('/forgot-password/verification', {state: values})
                    }
                    else {
                        alert(resJSON.message)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Nav />
            <Grid container>
                <Grid className={classes.about} item lg={5} sm={12} md={6}>
                    <h1 style={{ textAlign: 'left', marginTop: '15%', marginLeft: '4.5%' }}>Forgot your password.. ?.</h1>
                    <p style={{ textAlign: 'left', marginTop: '3%', marginLeft: '5%' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Grid>
                <Grid className={classes.signup} item lg={7} sm={12} md={6}>
                    <Formik
                        validationSchema={reviewSchema}
                        initialValues={{ Email: '' }}
                        onSubmit={sendCodeMethod}>
                        {(props) => {
                            return (
                                <>
                                    <Container>
                                        <Grid container>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Email:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Enter your email..."
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Email}
                                                    onChange={props.handleChange("Email")}
                                                    onBlur={props.handleBlur("Email")} />
                                                <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Email && props.errors.Email}</p>
                                            </Grid>
                                            <Grid item lg={12} sm={12} md={12} xs={12}>
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                    Submit
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
            <Footer />
        </>
    )
}

export default ForgotPassword

