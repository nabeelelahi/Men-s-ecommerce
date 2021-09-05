import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import ImageBackgrond from '../assets/aboutbackground.jpg'

const useStyles = makeStyles({
    about: {
        backgroundColor: '#f7f9fc',
        color: '#1c1c15',
        fontFamily: 'unset',
    },
})

function HomeAbout() {
    const classes = useStyles()

    return (
        <div>
            <Grid container>
                <Grid item lg={6} sm={12} md={6}>
                    <img src={ImageBackgrond} alt="" style={{width:'100%',}} /> 
                </Grid>
                <Grid className={classes.about} item lg={6} sm={12} md={6}>
                       <h1 style={{textAlign:'left',marginTop:'20%',marginLeft:'5%',color:'#292626'}}>About Ecommerce</h1>
                       <p style={{textAlign:'left',marginTop:'5%',marginLeft:'5%',color:'#292626',fontFamily:'unset'}}>E-commerce (electronic commerce) is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet. These business transactions occur either as business-to-business (B2B), business-to-consumer (B2C), consumer-to-consumer or consumer-to-business. The terms e-commerce and e-business are often used interchangeably. The term e-tail is also sometimes used in reference to the transactional processes that make up online retail shopping.</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeAbout
