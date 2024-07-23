import { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard/dashboard_layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import moment from 'moment'

function StylistReviews () {
    const [booking, setBooking] = useState([])
    const dispatch = useDispatch()

    const fetchBookingData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/hairstylist/review-by-hairstylist-id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setBooking(response.data.data)
            } else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error('No review found.')
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
            title: 'Client',
            dataIndex: 'fullname',
            render: (_text: any, record: any) => (
                <span className="">
                    {record.user_info.fullname }
                </span>
            )
        },
        {
            title: 'Client PhoneNumber',
            dataIndex: 'phone',
            render: (_text: any, record: any) => (
                <span className="">
                    {record.user_info.phone }
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
            <h1 className="text-4xl mb-8"> ALL BOOKINGS</h1>
            <Table columns={columns} dataSource={booking}/>
        </DashboardLayout>
    )
}

export default StylistReviews
