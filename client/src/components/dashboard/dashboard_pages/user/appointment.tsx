import { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard_layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import moment from 'moment'

function Appointment () {
    const [booking, setBooking] = useState([])
    const dispatch = useDispatch()

    const fetchBookingData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/users/get-booking-by-email', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setBooking(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('No booking found.')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        fetchBookingData()
    }, [])

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Stylist Name',
            dataIndex: 'fullname',
            render: (_text: any, record: any) => (
                <span className="">
                    {record.stylist_info.fullname }
                </span>
            )
        },
        {
            title: 'Stylist PhoneNumber',
            dataIndex: 'phone',
            render: (_text: any, record: any) => (
                <span className="">
                    {record.stylist_info.phone }
                </span>
            )
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (date: string, record: any) => (
                <span className="">
                    {moment(date).format('YYYY-MM-DD')} | {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status'
        }
    ]

    return (
        <DashboardLayout>
            <h1 className="text-4xl mb-8"> BOOKINGS</h1>
            <Table columns={columns} dataSource={booking}/>
        </DashboardLayout>
    )
}

export default Appointment
