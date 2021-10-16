import React from 'react'
import { Grid } from '@material-ui/core'
import Nav from './Nav'
import ShopBar from './shopbar'
import ShopBody from './shopbody'
import Footer from './footer'

function ShopNow() {
  return (
      <>
    <Nav position='static' />
    <ShopBar />
    <ShopBody />
    <Footer />
    </>
  );
}

export default ShopNow;
