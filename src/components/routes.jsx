import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './homepage';
import AboutUs from './aboutus'
import ContactUs from './contactus'
import ShopNow from './shopnow';
import ProductPage from './productpage';
import Login from './login';
import SignUp from './signup';
import Viewusers from './admin/viewusers';
import Addproduct from './admin/addproduct';
import ViewOrders from './admin/vieworders';
import ViewProducts from './admin/viewproducts';
import UpdateProduct from './admin/updateproduct';
import Categorie from './categorie';
import PlaceOrder from './placeorder';
import Check from './check';

  function MyRoutes() {
      return (
          <Router>
            <Routes>
            <Route exact path="/" element={ <HomePage /> } />
            <Route path="/aboutus" element={ <AboutUs /> } />
            <Route path="/contactus" element={ <ContactUs /> } />
            <Route path="/shopnow" element={ <ShopNow /> } />
            <Route path="/categories/:categorieId" element={ <Categorie /> } />
            <Route path="/product/:productId" element={ <ProductPage /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/placeorder/:productId" element={ <PlaceOrder /> } />
            <Route exact  path="/admin" element={ <ViewProducts /> } />
            <Route path="/admin/orders" element={ <ViewOrders /> } />
            <Route path="/admin/users" element={ <Viewusers /> } />
            <Route path="/admin/addproduct" element={ <Addproduct /> } />
            <Route path="/admin/editproduct/:productId" element={ <UpdateProduct /> } />
            <Route path="check" element={ <Check /> } />
           </Routes>
          </Router>
              
      )
  }
  
  export default MyRoutes
  