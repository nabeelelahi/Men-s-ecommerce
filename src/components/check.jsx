import React, { useEffect, useState} from 'react'
import { Grid, makeStyles, Input, Button, withStyles, Container, FormControl, Select, MenuItem } from '@material-ui/core'
import { Formik } from 'formik'

const BootstrapButton = withStyles({
    root: {
        marginTop: "8%",
        marginBottom: "8%",
        marginLeft: '39%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "15px",
        padding: '6px 40px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#1c1c15',
        borderColor: '#1c1c15',
        color: '#ebebc0',
        fontFamily: 'unset',
        '&:hover': {
            backgroundColor: 'transparent',
            borderColor: '#1c1c15',
            color: '#1c1c15',
            boxShadow: 'none',
        },
    },
})(Button);

export default function Check() {
    const [productPhoto, setProductPhoto] = useState('')
    const [searchResults, setSearchResults]  = useState('')
    const [searchImages, setSearchImages]  = useState('')

    return (
        <>
          
        <Container>
            <Grid spacing={3} container>
            <Grid item lg={12} sm={12} md={12}>
                    <Formik
                        initialValues={{Name: '', Price: '', Discription: '', Categorie: '',}}
                        onSubmit={(values, actions) => { 
                            const form = new FormData()  
                            form.append('query_img', productPhoto)  
                                try {
                                  fetch(
                                    `http://192.168.2.105:5000/`,
                                    {
                                      method: "POST",
                                      body: form,
                                    }
                                  ).then(async (response) => {
                                    const resJSON = await response.json();
                                    setSearchImages(resJSON);
                                    console.log(resJSON);
                                  }).then(() => {
                                    try {
                                        fetch(`http://localhost:7000/ecommerce.com/backend/api/v1/user/imagesearch`, {
                                          method: 'POST',
                                          headers: {
                                            'Content-Type': 'application/json'
                                          },
                                          body: JSON.stringify(searchImages)
                                        }).then(async(response) => {
                                          const resJSON = await response.json()
                                          console.log(resJSON.results)
                                          setSearchResults(resJSON.results)
                                        })
                                      } catch (error) {
                                        console.log(error)
                                      }
                                  })
                                } catch (error) {
                                  console.log(error);
                                }
                        
                              
                        }}>
                        {(props) => {
                            return (
                                <>
                                    <Container>
                                        <Grid container>
                                            <Grid item lg={6} md={6} sm={12}>
                                                <p style={{ color: '#1c1c15',marginLeft: '5%' }}>Product Photo</p>
                                                <input
                                                    placeholder="Photo"
                                                    onChange={(e) => {
                                                          setProductPhoto(e.target.files[0]);
                                                      }}
                                                    accept="image/*"
                                                    type='file' />
                                            </Grid>
                                         
                                            <Grid item lg={12} sm={12} md={12} xs={12}>
                                                <BootstrapButton onClick={props.handleSubmit} variant="contained" color="primary" disableRipple>
                                                    Add Product
                                                </BootstrapButton>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </>
                            )
                        }}  
                    </Formik>
                    <div style={{backGroundColor:'grey'}}>
                        <h2 style={{textAlign:'center'}}>All Products</h2>
                       {searchResults &&  
                            searchResults?.map((item) => {
                              console.log(item)                            
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
                       </Grid> 
                               )
                           })
                       }
                    </div>
                </Grid>
            </Grid>
            </Container>
        </>
    )
}

 
