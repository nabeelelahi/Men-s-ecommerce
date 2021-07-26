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
                    <img src={ImageBackgrond} alt="" style={{width:'100%',height:'800px'}} /> 
                </Grid>
                <Grid className={classes.about} item lg={5} sm={12} md={5} xs={12}>
                       <h1 style={{textAlign:'left',marginTop:'35%',marginLeft:'4.5%',fontSize:'73px'}}>About Ecommerce:</h1>
                       <p style={{textAlign:'left',marginTop:'3%',marginLeft:'5%',fontFamily:'unset'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default AboutUs
