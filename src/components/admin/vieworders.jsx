import React, { useState, useEffect } from 'react'
import AdminNav from './adminnav'
import { Grid, makeStyles, Paper, Container } from '@material-ui/core' 
import LocalMallIcon from '@material-ui/icons/LocalMall';
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

function ViewOrders() {
    const classes = useStyles()
    const [viewOrders, setViewOrders] = useState([])
    const [products, setProducts] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))
    
    function fetchProducts(){
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/admin/get/orders`)
            .then(async res => {
                const ResJSON = await res.json()
                setProducts(ResJSON.orders)
            // .then((response) => {
            //  const resJSON = response.json();
            //   console.log(resJSON, "Categories");
            });
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

   
    if(user?._id != '60e8318138b565168427cdfb'){
        return(
            <div style={{justifyContent:'center',alignItems:'center'}}>
                <h1>404 Not Found</h1>
            </div>
        )
    }
    else if(user?._id == '60e8318138b565168427cdfb'){
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
                   
                        <h2 style={{textAlign:'center',marginTop:'5%'}}>All Orders</h2>
                    {
                        products.map((item) => {
                            return(
                             <Grid container key={item._id}>
                        <Grid item lg={2} md={3} sm={4} xs={12}>
                        <LocalMallIcon style={{fontSize:45, marginLeft:'7%',marginTop:'15%'}} />
                        </Grid>
                        <Grid item lg={10} md={9} sm={8} xs={12}>
                                    <p style={{fontFamily:'unset',color:'#292626',fontWeight:'bold'}}>Product Name: <span style={{color:'blue'}}>{item.ProductName}</span> Product Price: <span style={{color:'blue'}}>{item.Price}</span></p>
                                    <p style={{fontFamily:'unset',color:'#292626',marginTop:'-1%'}}>Placed by <span style={{color:'blue'}}>{item.UserName}</span> ( <span style={{color:'blue'}}>{item.UserId}</span> )</p>
                                    <p style={{fontFamily:'unset',color:'#292626',marginTop:'-2%'}}>Amout: <span style={{color:'blue'}}>{item.Amount}</span>, Address: <span style={{color:'blue'}}>{item.Address}</span></p>
                                    <p style={{fontFamily:'unset',color:'#292626',marginTop:'-2%'}}>Order Id: <span style={{color:'blue',fontWeight:'bold'}}>{item._id}</span></p>
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
}
    else{
        return(
            <Login />
        )
    }
}
export default ViewOrders
