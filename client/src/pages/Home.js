import React,{useEffect} from 'react'
import axois from 'axios'
import Layout from '../components/Layout';



function Home() {


    const getData = async () => {

        try { 
          
            const response = await axois.post('/user/get-user-info-by-id',{},
            
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
        getData()
    }, [])

    return (
        <Layout>
           <h1>Homepage</h1> 
        </Layout>
    )
}

export default Home