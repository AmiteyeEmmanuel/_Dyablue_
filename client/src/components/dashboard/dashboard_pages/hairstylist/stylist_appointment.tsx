import { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard_layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import moment from 'moment'

function StylistAppointment () {
    const [booking, setBooking] = useState([])
    const dispatch = useDispatch()

    const fetchBookingData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/hairstylist/get-all-booking-by-hairstylist_id', {
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

    const handleStatus = async (record: any, status: any) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://booking-book-server.onrender.com/api/hairstylist/update-booking-status',
                { booking_id: record.booking_id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchBookingData()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            dispatch(hideLoading())
        }
    }

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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_text: any, record: any) => (
                <div className="flex gap-3">
                    {record.status === 'PENDING' && (
                        <>
                            <button className="bg-black px-2 py-1 rounded text-white" onClick={async () => { await handleStatus(record, 'APPROVED') }}>
                                ACCEPT
                            </button>
                            <button className="bg-rose-700 px-2 py-1 rounded text-white" onClick={async () => { await handleStatus(record, 'REJECTED') }}>
                                DECLINE
                            </button>
                        </>
                    )}
                </div>
            )
        }
    ]

    return (
        <DashboardLayout>
            <h1 className="text-4xl mb-8"> ALL BOOKINGS</h1>
            <Table columns={columns} dataSource={booking}/>
        </DashboardLayout>
    )
}

export default StylistAppointment
