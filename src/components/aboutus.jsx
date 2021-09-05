import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Nav from './Nav'
import Footer from './footer'
import ImageBackgrond from '../assets/aboutbackground.jpg'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#f7f9fc',
        color: '#1c1c15',
        fontFamily: 'unset',
        height: '800px'
    },
})

function AboutUs() {
    const classes = useStyles()

    return (
        <div>
            <Nav position='sticky' />
            <Grid container>
                <Grid item lg={7} sm={12} md={7} xs={12}>
                    <img src={ImageBackgrond} alt="" style={{ width: '100%', height: '800px' }} />
                </Grid>
                <Grid className={classes.about} item lg={5} sm={12} md={5} xs={12}>
                    <h1 style={{ textAlign: 'left', marginTop: '35%', marginLeft: '4.5%', fontSize: '73px' }}>About Us:</h1>
                    <p style={{ textAlign: 'left', marginTop: '3%', marginLeft: '5%', fontFamily: 'unset' }}>Welcome to our store, your number one source for all things Shirts , T-shirts , shoes , Formal dressings , Pants and Kurta shalwar.
                        We're dedicated to giving you the very best of all products we have, with a focus on dependability, customer service and uniqueness.
                        Founded in 2021 by Umer, Our store has come a long way from its beginnings in a home office.
                        When i first started out, my passion for providing the best equipment for my fellow Shopaholic drove me to do intense research ,
                        and gave him the impetus to turn hard work and inspiration into to a booming online store.
                        We now serve customers all over the Pakistan and are thrilled to be a part of the eco-friendly wing of the fashion industry.

                        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                        Thank you
                    </p>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default AboutUs
