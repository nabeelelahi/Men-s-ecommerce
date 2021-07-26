import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import BG from "../assets/background.jpg"

const useStyles = makeStyles({
        bgimg:{
            backgroundImage: `url(${BG})`,
            backgroundRepeat: 'no-repeat',
            height: '700px'
        }
})

function HomeSection() {
    const classes = useStyles()

    return (
        <Grid container>
            <Grid className={classes.bgimg} item xs={12} lg={12} md={12} sm={12}>
           <div  style={{width: '100%', alignItems: 'center',height:'700px',backgroundColor: 'hsla(0, 0%, 0%, 0.42)',position:'absolute',top:65,left:0 }}>
                <h1 style={{fontSize: 120, color:'#fff',fontFamily:'sans-serif',marginTop:'13%',marginLeft:'4%',width:'70%'}}>The best clothing around!</h1>
            </div>
            </Grid>
        </Grid>
    )
}

export default HomeSection
