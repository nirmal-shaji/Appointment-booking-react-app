import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import Layout from '../../components/Layout'
import axios from 'axios'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { useDispatch } from 'react-redux'


function Slot() {

    const dispatch = useDispatch()
    const [slot, setslot] = useState([])


    const getSlotData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-slot-data', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            console.log(response, "getAllSlotgetAllSlot");
            console.log(response.data.getAllSlots, "slotdaaaaaaaaaaaaaata");
            dispatch(hideLoading())
            if (response.data.success) {
                setslot(response.data.getAllSlots)
            }
            dispatch(hideLoading())
        } catch (error) {
            console.log(error);
        }
    }





    const [applications, setapplications] = useState([])
    const [slotId, setslotId] = useState()

    const getApprovedApplications = async () => {
        console.log(slotId, "slotIdslotId");
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-approved-applications', {
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





    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e) => {

        // setslotId(e.target.value)
        setIsModalOpen(true);
        getApprovedApplications()
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const slotBooking = async (appId, userIid) => {
        console.log(appId, userIid, "slot->", slotId, "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqslotBooking,80");
        await axios.post('/admin/slotconfirm', { appId, userIid, slotId },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
        getSlotData()
    }

    //     const getSlotID=(SId)=>{
    // console.log(SId,"SIdSIdSId");
    //     }

    useEffect(() => {

        getSlotData()

    }, [])


    return (

        <Layout>
            {slot?.map((slot) => {

                return (<Button type="primary me-4" disabled={slot.status} onClick={() => { setslotId(slot._id); showModal() }} showModal>{slot.name}</Button >)
            })}
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {applications.map((applications) => { return <i onClick={() => { slotBooking(applications._id, applications.userId) }}> {applications.companyName} </i> })}


            </Modal>

        </Layout>

    )

}

export default Slot