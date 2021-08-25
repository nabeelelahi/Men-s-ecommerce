import React from 'react'
import AdminNav from './adminnav'
import { Grid, makeStyles, Paper, Container } from '@material-ui/core' 
import Login from '../login'
import { useState, useEffect } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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



function Viewusers() {
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('user'))
    const [users, setUsers] = useState([])

    function fetchUsers(){
        try {
            fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/admin/get/users/`)
            .then(async res => {
                const ResJSON = await res.json()
                setUsers(ResJSON.users)
            // .then((response) => {
            //  const resJSON = response.json();
            //   console.log(resJSON, "Categories");
            });
          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    // if(user?._id != '60e8318138b565168427cdfb'){
    //     return(
    //         <div style={{justifyContent:'center',alignItems:'center'}}>
    //             <h1>404 Not Found</h1>
    //         </div>
    //     )
    // }
    // else if(user?._id == '60e8318138b565168427cdfb'){
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
                        <h2 style={{textAlign:'center'}}>All User</h2>
                        {
                        users?.map((cat, index) => {
                           // console.log(Product)
                            return (                               
                                <Grid container key={cat._id}>
                        <Grid item lg={2} md={3} sm={4} xs={12}>
                           <AccountCircleIcon style={{fontSize:45, marginLeft:'7%',marginTop:'15%'}} />
                       </Grid>
                        <Grid item lg={10} md={9} sm={8} xs={12}>
                                    <p style={{fontFamily:'unset',color:'#292626',fontWeight:'bold'}}>{cat.Name} ({cat._id}) </p>
                                    <p style={{fontFamily:'unset',color:'blue',marginTop:'-1%'}}>{cat.Email}</p>
                                    <p style={{fontFamily:'unset',color:'#292626',marginTop:'-2%'}}>{cat.Phone}</p>
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
export default Viewusers
