import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import SocialFollow from "./SocialFollow"

const Footer = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="6">
          <SocialFollow />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;













// import { AppBar, makeStyles, Grid } from '@material-ui/core'
// import React from 'react'

// const useStyles = makeStyles({
//     nav: {
//         backgroundColor: '#292626',
//         marginTop: '-0.25%'
//     },
// })

// function Footer() {
//     const classes = useStyles()

//     return (
//         <AppBar position='relative' className={classes.nav}>
//             <Grid container>
//                 <Grid item xs={12} lg={12} md={12}>
//                     <p style={{ color: '#fff',fontFamily: "unset",textAlign:'center',marginTop:'12px' }}>2021 All rights reserved.</p>
//                 </Grid>
//             </Grid>
//         </AppBar>
//     )
// }

// export default Footer
