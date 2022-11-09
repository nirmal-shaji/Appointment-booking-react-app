import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { Col, Table } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function ApprovedApplications() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [applications, setapplications] = useState([])

   const getApprovedApplications = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get('/admin/get-approved-applications', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response,"responseresponseresgetApprovedApplicationsponseresponse");
      dispatch(hideLoading())
      console.log(response.data.data, "responserespogetNewApplicationsresponseresponse21");

      if (response.data.success) {
        setapplications(response.data.data)
      }
      dispatch(hideLoading())
    } catch (error) {

    }
  }

  useEffect(() => {
    getApprovedApplications()


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

          <i onClick={()=>{navigate('/slot-Booking')}} class="ri-ticket-fill icon-size "></i>
        </div>

      )
    }






    // {
    //   title: 'Actions',
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //      <h2>applySlot</h2>
    //       {/* {record.status === 'approved' && <h1 className="anchor me-3" onClick={()=>(changeApplicationStatus(record,'approved'))}>Approve</h1>}    */}

    //     </div>

    //   )
    // }

  ]





  return (
    <Layout>
      <div className='page-header'>ApprovedApplications</div>
      <Table columns={columns} dataSource={applications} />
    </Layout>
  )
}





export default ApprovedApplications