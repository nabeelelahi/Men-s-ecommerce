import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import AdminNav from './adminnav'
import { Grid, makeStyles, Paper, Container } from '@material-ui/core' 
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Login from '../login'

const useStyles = makeStyles((theme) => ({
    div:{
    backGroundColor: 'grey',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: "22%",
        marginRight: "18%",
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: 240,
      },
}))

function ViewProducts() {
    const navigate = useNavigate()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('user'))
    const [products, setProducts] = useState([])

    function fetchProducts(){
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/admin/get/products`)
            .then(async res => {
                const ResJSON = await res.json()
                setProducts(ResJSON.products)
            // .then((response) => {
            //  const resJSON = response.json();
            //   console.log(resJSON, "Categories");
            });
          } catch (error) {
            console.log(error);
          }
    }

    function deleteProduct(productId){
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/product/delete/product/${productId}`,{
                method: 'DELETE'
            })
            .then(async res => {
                const ResJSON = await res.json()
            // .then((response) => {
            //  const resJSON = response.json();
            //   console.log(resJSON, "Categories");
            });
          } catch (error) {
            console.log(error);
          }
    }
    
    useEffect(() => {
        fetchProducts();
    }, [])

    // if(user._id != '60e8318138b565168427cdfb'){
    //     return(
    //         <div style={{justifyContent:'center',alignItems:'center'}}>
    //             <h1>404 Not Found</h1>
    //         </div>
    //     )
    // }
    // else if(user._id == '60e8318138b565168427cdfb'){
    return (
        <> 
        <AdminNav />   
        <main className={classes.content}>
            <div className={classes.toolbar} />
        <div className={classes.toolbar} />
        <Container>
            <Grid className={classes.div}spacing={3} container>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Paper>
                    <h1 style={{color:'blue',textAlign:'center',}}>User</h1>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Paper>
                    <h1 style={{color:'blue',textAlign:'center',}}>Orders</h1>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Paper>
                    <h1 style={{color:'blue',textAlign:'center',}}>Products</h1>
                    </Paper>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper>
                    <div style={{backGroundColor:'grey'}}>
                        <h2 style={{textAlign:'center'}}>All Products</h2>
                        {
                        products?.map((item) => {
                           // console.log(Product)
                            return (                               
                                <Grid container key={item._id}>
                        <Grid item lg={2} md={3} sm={4} xs={12}>
                          <img src={`http://localhost:7000${item.image}`} height="97%" width="50%" style={{margin:'3%'}} alt=''/>
                       </Grid>
                        <Grid item lg={8} md={6} sm={4} xs={10}>
                                    <p style={{fontFamily:'unset',color:'#292626',fontWeight:'bold'}}>{item.Name} </p>
                                    <p style={{fontFamily:'unset',color:'blue',marginTop:'-1%'}}>Price: {item.Price}</p>
                                    <p style={{fontFamily:'unset',color:'#292626',marginTop:'-2%'}}>Categorie: {item.CategorieName}</p>
                        </Grid>
                        <Grid item lg={2} md={3} sm={4} xs={2}>
                            <div style={{flexDirection:'column'}}>     
                           <DeleteForeverIcon style={{fontSize:30, marginLeft:'2%',marginTop:'20%'}} onClick={() => deleteProduct(item._id)} />
                           <EditIcon style={{fontSize:30, marginLeft:'2%',marginTop:'20%',}}  onClick={() => navigate(`/admin/editproduct/${item._id}`, {state: {...item}})} />
                            </div>
                       </Grid>
                    </Grid>
                            )
                        })
                    }
                    </div>
                </Paper>
                </Grid>
            </Grid>
            </Container>
            </main> 
        </>
    )
    // }
    // else{
    //     return(
    //         <Login />
    //     )
    // }
}
export default ViewProducts
