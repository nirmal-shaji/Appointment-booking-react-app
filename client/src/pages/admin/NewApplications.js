import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { Col, Table } from 'antd'
import axios from 'axios'


function NewApplications() {
  const [applications, setapplications] = useState([])
  const dispatch = useDispatch()

  const getNewApplications = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get('/admin/get-new-applications', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      dispatch(hideLoading()) 
      console.log(response.data.data, "responserespogetNewApplicationsresponseresponse21");

      if (response.data.success) {
        setapplications(response.data.data)
      }
      dispatch(hideLoading())
    } catch (error) {

    }
  }



  const changeApplicationStatus = async (record,status) => {

    console.log(record,status,"record,statusrecord,status37");
    try {
      dispatch(showLoading())
      const response = await axios.post('/admin/applications-status-changing',
      {applicationId:record._id,userIid:record.userId,status:status}, 
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      dispatch(hideLoading())
      console.log(response.data.data, "responserespogetNewApplicationsresponseresponse21");

      if (response.data.success) {
        getNewApplications()
        // setapplications(response.data.data)
      }
      dispatch(hideLoading())
    } catch (error) {

    }
  }


  useEffect(() => {
    getNewApplications()


  }, [])


  const columns = [
    {
      title: 'CompanyName',
      dataIndex: 'companyName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Actions',
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
         
          {record.status === 'pending' && <h1 className="anchor me-3" onClick={()=>(changeApplicationStatus(record,'approved'))}>Approve</h1>}       
          {record.status === 'pending' && <h1 className="anchor" onClick={()=>(changeApplicationStatus(record,'cancelled'))}>Reject</h1>}       
        </div>
        
      )
    }
    
  ]


  return (
    <Layout>
      <div className='page-header'>New Applications</div>
      <Table columns={columns} dataSource={applications} />
    </Layout>

  )
}

export default NewApplications