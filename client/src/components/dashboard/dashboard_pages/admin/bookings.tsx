import { Table } from 'antd'
import DashboardLayout from '../../dashboard_layout'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'

function Bookings () {
    const [bookings, setBookings] = useState([])
    const dispatch = useDispatch()

    const fetchUserData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/admin/get-all-bookings', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setBookings(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred while fetching bookings data.')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const columns = [
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
            title: 'Stylist',
            dataIndex: 'fullname',
            render: (_text: any, record: any) => (
                <span className="">
                    {record.stylist_info.fullname }
                </span>
            )
        },
        {
            title: 'Client Email',
            dataIndex: 'email'
        },
        {
            title: 'Appointment Date',
            dataIndex: 'date',
            render: (date: string, _record: any) => (
                <span className="">
                    {moment(date).format('YYYY-MM-DD')}
                </span>
            )
        },
        {
            title: 'Appointment Time',
            dataIndex: 'time',
            render: (_date: string, record: any) => (
                <span className="">
                    {moment(record.time).format('HH:mm')}
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
            <h1 className="text-4xl">All Bookings </h1>
            <Table columns={columns} dataSource={bookings}/>
        </DashboardLayout>
    )
}

export default Bookings
