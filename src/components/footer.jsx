import { AppBar, makeStyles, Grid } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    nav: {
        backgroundColor: '#292626',
        marginTop: '-0.25%'
    },
})

function Footer() {
    const classes = useStyles()

    return (
        <AppBar position='relative' className={classes.nav}>
            <Grid container>
                <Grid item xs={12} lg={12} md={12}>
                    <p style={{ color: '#fff',fontFamily: "unset",textAlign:'center',marginTop:'12px' }}>2021 All rights reserved.</p>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Footer
