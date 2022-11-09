import React from 'react'
import Layout from '../components/Layout'
import { Form, Row, Input, Col, Button, TimePicker } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from '../redux/alertSlice'

function Application() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onFinish = async (values) => {
        try {
            dispatch(showLoading() )
            const response = await axios.post('/user/application', values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading() )
            console.log(response, "responseresponseapplication");
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/')
                console.log(response, "responsefffresponse");
                dispatch(hideLoading() )
            } else {
                toast.error("application not submitted")
                dispatch(hideLoading() )
            }
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(hideLoading() )
        }
    }
    return (
        <Layout>
            <h1 className='card-title'>application form</h1>
            <hr />
            <Form layout='vertical' onFinish={onFinish}>
                <h1 className='page-title'>company details</h1>
                <Row gutter={20}>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='name' name="name" rules={[{ required: true }]}>
                            <Input className='width-input' placeholder='Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='city' name="city" rules={[{ required: true }]}>
                            <Input placeholder='City' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='email' name="email" rules={[{ required: true }]}>
                            <Input placeholder='Email' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='companyName' name="companyName" rules={[{ required: true }]}>
                            <Input placeholder='CompanyName' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='address' name="address" rules={[{ required: true }]}>
                            <Input placeholder='Address' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='state' name="state" rules={[{ required: true }]}>
                            <Input placeholder='State' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='phoneNumber' name="phoneNumber" rules={[{ required: true }]}>
                            <Input placeholder='PhoneNumber' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={8} xm={8} lg={8}>
                        <Form.Item required label='companyLogo' name="companyLogo" rules={[{ required: true }]}>
                            <Input placeholder='CompanyLogo' />
                        </Form.Item>
                    </Col>               
                </Row>
                <div className="d-flex justify-content-end ">
                    <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
                </div>
            </Form>
        </Layout>
    )
}

export default Application