import { Card, Col, Row, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserGroupIcon, BookOpenIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function AdminDashboard () {
    const { user } = useSelector((state: any) => state.user)
    const [bookings, setBookings] = useState([])
    const [stylists, setStylist] = useState([])
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()

    const fetchBookingsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/admin//get-all-bookings', {
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

    const fetchUserData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/admin/get-all-users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setUsers(response.data.users)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred while fetching user data.')
        } finally {
            dispatch(hideLoading())
        }
    }

    const fetchStylistData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('https://booking-book-server.onrender.com/api/admin/get-all-hairstylists', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setStylist(response.data.hairstylists)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred while fetching user data.')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        fetchBookingsData()
        fetchUserData()
        fetchStylistData()
    }, [])

    const columns = [
        {
            title: 'Stylist',
            dataIndex: 'fullname',
            render: (_text: string, record: any) => (
                <span className="">
                    {record.stylist_info.fullname}
                </span>
            )
        },
        {
            title: 'Stylist Fees',
            dataIndex: 'hairstyle_fees',
            render: (_text: string, record: any) => (
                <span className="">
                    {record.stylist_info.hairstyle_fees}
                </span>
            )
        },
        {
            title: 'Client',
            dataIndex: 'fullname',
            render: (_text: string, record: any) => (
                <span className="">
                    {record.user_info.fullname}
                </span>
            )
        },
        {
            title: 'Client Phone',
            dataIndex: 'phone',
            render: (_text: string, record: any) => (
                <span className="">
                    {record.user_info.phone}
                </span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date: string, _record: any) => (
                <span className="">
                    {moment(date).format('YYYY-MM-DD')}
                </span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: (_text: string, record: any) => (
                <span className="">
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_text: any, record: any) => (
                <div className="flex gap-3">
                    {record.status === 'PENDING' && (
                        <p className="px-2 py-1 rounded  bg-yellow  text-white">
                            PENDING
                        </p>
                    )}
                    {record.status === 'REJECTED' && (
                        <p className="px-2 py-1 rounded bg-light-red text-white">
                            REJECTED
                        </p>
                    )}
                    {record.status === 'APPROVED' && (
                        <p className="px-2 py-1 rounded bg-green text-white">
                            APPROVED
                        </p>
                    )}
                </div>
            )
        }
    ]

    const data = [
        {
            name: 'Stylist',
            fees: 150,
            bookings: 25
        },
        {
            name: 'Stylist 1',
            fees: 700,
            bookings: 13
        },
        {
            name: 'Stylist 2',
            fees: 400,
            bookings: 6
        },
        {
            name: 'Stylist 3',
            fees: 200,
            bookings: 4
        },
        {
            name: 'Stylist 4',
            fees: 600,
            bookings: 0
        },
        {
            name: 'Stylist 5',
            fees: 400,
            bookings: 21
        }
    ]
    const cardStyle = { width: '100%', height: '100%' }

    return (
        <div className="">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} lg={6}>
                    <Card className="bg-slate-200" style={cardStyle}>
                        <h2 className="text-3xl font-extrabold text-black">
                            Hello, <span className="text-blue italic">{user.fullname}</span>
                        </h2>
                        <p className=" text-base text-black">
                            We're glad to have you back. Manage your dashboard efficiently and keep things running smoothly.
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={24} lg={6}>
                    <Link to="/bookings">
                        <Card className="bg-slate-200 cursor-pointer" style={cardStyle}>
                            <h2 className="text-xl font-extrabold text-black">Total Bookings</h2>
                            <p className="text-xl text-black">{bookings?.length}</p>
                            <BookOpenIcon className="text-[#38419D] w-36 h-36" />
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={24} lg={6}>
                    <Link to="/users" className="cursor-pointer" >
                        <Card className="bg-slate-200" style={cardStyle}>
                            <h2 className="text-xl font-extrabold text-black">Total Users</h2>
                            <p className="text-xl text-black"> {users?.length}</p>
                            <UserGroupIcon className="text-[#31304D] text-w w-36 h-36" />
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={24} lg={6}>
                    <Link to="/stylists">
                        <Card className="bg-slate-200 cursor-pointer" style={cardStyle}>
                            <h2 className="text-xl font-extrabold text-black">Total Stylists</h2>
                            <p className="text-xl text-black">{stylists?.length}</p>
                            <UserPlusIcon className="text-[#860A35] w-36 h-36" />
                        </Card>
                    </Link>
                </Col>
            </Row>

            <div className="mt-8 mb-8 h-[22rem] bg-white p-4 rounded-md flex flex-col flex-1">
                <h1 className="text-2xl font-semibold"> Hairstylists Chart </h1>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}>

                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="fees" fill="#496989" />
                        <Bar dataKey="bookings" fill="#378CE7" />

                    </BarChart>

                </ResponsiveContainer>
            </div>

            <div className="mt-8">
                <Table columns={columns} dataSource={bookings} />
            </div>
        </div>
    )
}

export default AdminDashboard
