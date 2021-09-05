import React from 'react'
import { Button, Grid, withStyles, makeStyles, Input, Container } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'
import Nav from './Nav'
import Footer from './footer'
import BG from "../assets/background.jpg"

const useStyles = makeStyles({
    card: {
        backgroundColor: 'hsla(60, 52%, 84%, 0.38)',
        flexDirection: 'row',
        minHeight: '500px',
        width: '100%',
        marginTop: '15%',
        marginBottom: '15%',
        borderRadius: 10,
        padding: '2%',
        paddingTop: '5%',
        paddingBottom: '5%',
        backdropFilter: 'blur(20px)'
    },
    input: {
        width: '100%'
    }
})

const BootstrapButton = withStyles({
    root: {
        marginTop: "18%",
        marginBottom: "30%",
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        width: '100%',
        padding: '4%',
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
        .min(2)
        .test("Email", "Email must fullfill the requirement example abc@gmail.com", (val) => {
            return (
                new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/igm).test(val)
            )
        }),
    Password: yup.string()
        .required()
        .min(6),
})

function Login() {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <>
            <Nav />
            <div style={{ backgroundImage: `url(${BG})`, width: '100%', backgroundRepeat: 'no-repeat', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.56)', width: '100%', }}>
                    <Container>
                        <Grid container>
                            <Grid item lg={3.5} sm={1} md={3} xs={0} />
                            <Grid className={classes.card} item lg={5} sm={10} md={6} xs={12} >
                                <Formik
                                    validationSchema={reviewSchema}
                                    initialValues={{ Email: '', Password: '', }}
                                    onSubmit={(values, actions) => {
                                        try {
                                            fetch(
                                                `http://localhost:7000/ecommerce.com/backend/api/v1/login/${values.Email}/${values.Password}`)
                                                // .then(res => res.json())
                                                .then(async (response) => {
                                                    const resJSON = await response.json();
                                                    console.log(resJSON, "Login Response");
                                                    localStorage.setItem("user", JSON.stringify(resJSON.info));
                                                    if (resJSON.info && resJSON.info._id !== '60e8318138b565168427cdfb') {
                                                        navigate('/')
                                                    }
                                                    else if (resJSON.info && resJSON.info._id === '60e8318138b565168427cdfb') {
                                                        navigate('/admin')
                                                    }
                                                    else {
                                                        alert(resJSON.message)
                                                    }
                                                });
                                        } catch (error) {
                                            alert(error);
                                        }
                                    }} >
                                    {(props) => {
                                        return (
                                            <>
                                                <h3 style={{ textAlign: 'center', marginTop: '10px' }}>Login</h3>
                                                <Grid container>
                                                    <Grid item lg={3} sm={2} md={3} xs={2} />
                                                    <Grid item lg={6} sm={8} md={6} xs={8}>
                                                        <p style={{ color: '#1c1c15', marginBottom: '3%', marginTop: '3%', }}>Email:</p>
                                                        <Input
                                                            className={classes.input}
                                                            placeholder="Email"
                                                            inputProps={{ 'aria-label': 'description' }}
                                                            value={props.values.Email}
                                                            onChange={props.handleChange("Email")}
                                                            onBlur={props.handleBlur("Email")} />
                                                        <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Email && props.errors.Email}</p>
                                                    </Grid>
                                                    <Grid item lg={3} sm={2} md={3} xs={2} />
                                                    <Grid item lg={3} sm={2} md={3} xs={2} />
                                                    <Grid item lg={6} md={6} sm={8} xs={8}>
                                                        <p style={{ color: '#1c1c15', marginBottom: '3%', marginTop: '3%', }}>Password:</p>
                                                        <Input
                                                            className={classes.input}
                                                            placeholder="Password"
                                                            type='Password'
                                                            inputProps={{ 'aria-label': 'description' }}
                                                            value={props.values.Password}
                                                            onChange={props.handleChange("Password")}
                                                            onBlur={props.handleBlur("Password")} />
                                                        <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Password && props.errors.Password}</p>
                                                    </Grid>
                                                    <Grid item lg={3} sm={2} md={3} xs={2} />
                                                    <Grid item lg={4} sm={3} md={4} xs={2} />
                                                    <Grid item lg={4} sm={6} md={4} xs={8}>
                                                        <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin} onClick={props.handleSubmit}>
                                                            Login
                                                        </BootstrapButton>
                                                    </Grid>
                                                    <Grid item lg={4} sm={3} md={4} xs={2} />
                                                    <Grid item lg={3} sm={1} md={2} />
                                                    <Grid item lg={6} sm={10} md={8} xs={12}>
                                                        <div style={{ color: '#1c1c15', textAlign: 'center', fontSize: '12px', }}>
                                                            Don't have an account?...
                                                            <Link style={{ marginLeft: '5px', color: 'blue', textDecoration: 'none' }} to='/signup'>Create One</Link>
                                                        </div>
                                                    </Grid>
                                                    <Grid item lg={3} sm={1} md={2} />
                                                </Grid>
                                            </>
                                        )
                                    }}

                                </Formik>
                            </Grid>
                            <Grid item lg={3.5} sm={1} md={3} xs={0} />
                        </Grid>
                    </Container>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Login
