import React,{useEffect}  from 'react'
import Layout from '../components/Layout'

import axios from 'axios';


function Applications() {
  const applicationStatus = async () => {
   

      try { 
        
          const response = await axios.post('/user/applications',{},
          
              {
                  headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('token')
                  }
              })
          // console.log(response.data,"response.data");
      } catch (error) {
          console.log(error);
      }

  
}

  useEffect(() => {
    applicationStatus();
  
   
  }, [])
  
  return (
   <Layout>
    <h1 className='page-title'>applications</h1>
   </Layout>
  )
}

export default Applications