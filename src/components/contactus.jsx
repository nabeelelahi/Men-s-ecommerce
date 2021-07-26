import React from 'react'
import { Grid, makeStyles, Input, Button, withStyles, Container, TextField } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'
import Nav from './Nav'
import Footer from './footer'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#f7f9fc',
        color: '#000',
        fontFamily: 'unset',
        padding: '3%',
        height: '800px'
    },
    signup: {
        paddingTop: '10%',
        backgroundColor: '#f7f9fc',
        color: '#1c1c15',
        fontFamily: 'unset',
        padding: '3%',
        height: '850px'
    },
    fullinput: {
        width: '90%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        backgroundColor: '#f7f9fc'
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
       // marginBottom: "4%",
        marginLeft: '39%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        padding: '6px 40px',
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
        Discription: yup.string()
        .required()
        .min(30)
    ,
})

function ContactUs() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

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
            <Nav postition='sticky' />
            <Grid container>
                <Grid className={classes.signup} item lg={7} sm={12} md={6}>
                    <Formik
                        validationSchema={reviewSchema}
                        initialValues={{ Name: '', Email: '', Phone: '',Discription: '' }}
                        onSubmit={(values, actions) => { }} >
                        {(props) => {
                            return (
                                <>
                                    <Container>
                                        <Grid container>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%',marginTop:'5%' }}>Name:</p>
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
                                                    placeholder="Password"
                                                    inputProps={{ 'aria-label': 'description' }}
                                                    value={props.values.Phone}
                                                    onChange={props.handleChange("Phone")}
                                                    onBlur={props.handleBlur("Phone")} />
                                                <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Phone && props.errors.Phone}</p>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <p style={{ color: '#1c1c15', marginLeft: '2.5%' }}>Query:</p>
                                                <TextField
                                                    className={classes.fullinput}
                                                    id="filled-multiline-static"
                                                    label="Please elaborate what do you want to discuss with us?..."
                                                    multiline
                                                    rows={4}
                                                    placeholder="Discription"
                                                    variant="filled"
                                                    value={props.values.Discription}
                                                    onChange={props.handleChange("Discription")}
                                                    onBlur={props.handleBlur("Discription")}
                                                />
                                                    <p style={{ color: '#8f0707', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{props.touched.Discription && props.errors.Discription}</p>
                                            </Grid>
                                       
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple className={classes.margin}>
                                                    Contact Us
                                                </BootstrapButton>
                                      
                                        </Grid>
                                    </Container>
                                </>
                            )
                        }}

                    </Formik>
                </Grid>
                <Grid className={classes.about} item lg={5} sm={12} md={5} xs={12}>
                    <h1 style={{ textAlign: 'left', marginTop: '20%', marginLeft: '4.5%', fontSize: '73px' }}>Contact Us:</h1>
                    <p style={{ textAlign: 'left', marginTop: '3%', marginLeft: '5%', fontFamily: 'unset' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default ContactUs

