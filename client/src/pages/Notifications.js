import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import axios from "axios"
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertSlice'
import toast from 'react-hot-toast'
import { setUser } from '../redux/userSlice'
function Notifications() {
    const { user } = useSelector((state) => state.user)
    const navigate =useNavigate()
    const dispatch = useDispatch()

const markAllSeen=async()=>{
    try {
        dispatch(showLoading() )
        const response=await axios.post('/user/mark-all-notifications-as-seen',{userId:user._id}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        dispatch(hideLoading() )
        if(response.data.success){
            dispatch(setUser(response.data.data))
            toast.success(response.data.message)
          

console.log(response,"responsefffresponse");
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        dispatch(hideLoading() )
        toast.error(error.response.data.message)
    }
}


const deleteNotifications=async()=>{
    try {
        dispatch(showLoading() )
        const response=await axios.post('/user/delete-all-notifications',{userId:user._id}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        dispatch(hideLoading() )
        if(response.data.success){
            dispatch(setUser(response.data.data))
            toast.success(response.data.message)
          

console.log(response,"responsefffresponse");
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        dispatch(hideLoading() )
        toast.error(error.response.data.message)
    }
}
  
    return (
        <Layout>
            <h1 className='page-title'>Notifications</h1>

            <Tabs>
                <Tabs.TabPane tab='Unseen' key={0}>
                    <div className="d-flex justify-content-end">
                        <h1 className='anchor' onClick={()=>markAllSeen()}>Mark all as seen</h1>
                    </div>
                    {user?.unseenNotification
                        .map((notification) => 
                            <div className="card p-2"  onClick={()=>navigate(notification.onclickPath)}>
                                <div className="card-text">
                                    {notification.message}
                                </div>
                            </div>
                          

                        )}

                </Tabs.TabPane>
                <Tabs.TabPane tab='seen' key={1}>
                    <div className="d-flex justify-content-end">
                        <h1 className='anchor' onClick={()=>deleteNotifications()}>Delete all</h1>
                    </div>
                    {user?.seenNotification
                        .map((notification) => 
                            <div className="card p-2"  onClick={()=>navigate(notification.onclickPath)}>
                                <div className="card-text">
                                    {notification.message}
                                </div>
                            </div>
                          

                        )}
                </Tabs.TabPane>
            </Tabs>
        </Layout>

    )
}

export default Notifications