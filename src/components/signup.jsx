import React, { useState } from 'react'
import { Grid, makeStyles, Input, Button, withStyles, Container, Modal, Fade, } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
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
    Name: yup.string()
        .required()
        .min(3)
    ,
    Email: yup.string()
        .required()
        .test("Email", "Email must fullfill the requirement example abc@gmail.com", (val) => {
            return (
                new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/igm).test(val)
            )
        }),
    Phone: yup.string()
        .required()
        .test("Phone Number", "Phone Number must fullfill the requirement example +92-345-2323322", (val) => {
            return (
                new RegExp(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}/igm).test(val)
            )
        }),
    Password: yup.string()
        .required()
        .min(6),
})

function Signup() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);


    const handleClose = () => {
        setModal(false);
    };

    const handleOpen = () => {
        setModal(true);
    };

    function registerStepOne(values) {
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/register/step1/${values.Email}/${values.Password}`)
                .then(async (response) => {
                    const resJSON = await response.json()
                    if (resJSON.success === true) {
                        values.code = resJSON.code
                        navigate('/signup/verification', { state: values })
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
                    <h1 style={{ textAlign: 'left', marginTop: '15%', marginLeft: '4.5%' }}>Sign Up</h1>
                    <p style={{ textAlign: 'left', marginTop: '3%', marginLeft: '5%' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Grid>
                <Grid className={classes.signup} item lg={7} sm={12} md={6}>
                    <Formik
                        validationSchema={reviewSchema}
                        initialValues={{ Name: '', Email: '', Phone: '', Password: '' }}
                        onSubmit={registerStepOne}>
                        {(props) => {
                            return (
                                <>
                                    <Container>
                                        <Grid container>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Name:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Enter your Name..."
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Name}
                                                    onChange={props.handleChange("Name")}
                                                    onBlur={props.handleBlur("Name")} />
                                                <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Name && props.errors.Name}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Email:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Email"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Email}
                                                    onChange={props.handleChange("Email")}
                                                    onBlur={props.handleBlur("Email")} />
                                                <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Email && props.errors.Email}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Phone Number:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Phone Number"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Phone}
                                                    onChange={props.handleChange("Phone")}
                                                    onBlur={props.handleBlur("Phone")} />
                                                <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Phone && props.errors.Phone}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '5%' }}>Password:</p>
                                                <Input
                                                    className={classes.fullinput}
                                                    placeholder="Password"
                                                    type="password"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Password}
                                                    onChange={props.handleChange("Password")}
                                                    onBlur={props.handleBlur("Password")} />
                                                <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Password && props.errors.Password}</p>
                                            </Grid>

                                            <Grid item lg={12} sm={12} md={12} xs={12}>
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                    Sign Up
                                                </BootstrapButton>
                                            </Grid>
                                            <Grid item lg={12} sm={12} md={12} xs={12}>
                                                <div style={{ color: '#1c1c15', textAlign: 'center', fontSize: '10px', }}>
                                                    Already have an account?.
                                                    <Link style={{ marginLeft: '5px', color: 'blue', textDecoration: 'none' }} to='/login'>Sign in</Link>
                                                </div>
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

            {/* verification modal code. */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div style={{ backGroundColor: 'grey' }}>
                            this is a fucking modal
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default Signup

