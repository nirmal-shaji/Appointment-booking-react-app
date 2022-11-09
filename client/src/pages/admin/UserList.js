import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { Col, Table } from 'antd'
import axios from 'axios'

function UserList() {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()


    const getUserData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-all-users', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            console.log(response.data.data, "responseresponseresponseresponseresponseresponse21");

            if (response.data.success) {
                setUsers(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }


    useEffect(() => {
        getUserData()


    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt'
        }
    ]

    return (
        <Layout>
            <div className='page-header'>UserList</div>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default UserList