
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Col, Row, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import { Link } from 'react-router-dom'
import { BookOpenIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/16/solid'
import { toast } from 'react-toastify'
import moment from 'moment'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function HairstylistDashboard () {
    const [stylists, setStylists] = useState([])
    const cardStyle = { width: '100%', height: '100%' }
    const { user } = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const [booking, setBooking] = useState([])

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

    const getToken = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Token not found')
            }
            dispatch(showLoading())
            const response = await axios.get(
                'https://booking-book-server.onrender.com/api/users/all-approved-stylist',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            dispatch(hideLoading())
            if (response.data.success) {
                setStylists(response.data.hairstylists)
            }
        } catch (error) {
            console.error('Error fetching approved stylists:', error)
            dispatch(hideLoading())
        }
    }

    const getGreeting = () => {
        const currentHour = new Date().getUTCHours()
        if (currentHour >= 0 && currentHour < 12) {
            return `Good Morning, ${user?.fullname}`
        } else if (currentHour >= 12 && currentHour < 18) {
            return `Good Afternoon, ${user?.fullname}`
        } else {
            return `Good Evening, ${user?.fullname}`
        }
    }

    useEffect(() => {
        getToken()
        fetchBookingData()
    }, [])

    const data = [
        { name: 'Total Bookings', value: 3 },
        { name: 'Total Client', value: 1 },
        { name: 'Hairstylists', value: 7 }
    ]

    const COLORS = ['#3C5B6F', '#538392', '#496989']

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
  }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180))
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180))

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const columns = [
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

    return (
        <div>
            <div className="xl:flex pt-4 gap-2">
                {/* Main Content */}
                <div className='xl:w-[70%] p-2'>
                    <div className="dashboard-container">
                        <h1 className="text-4xl italic">{getGreeting()} 👋</h1>
                        <div className="dashboard-link italic text-xl"> Welcome to your Dashboard </div>

                        <div className="mt-6 mb-6">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} lg={8}>
                                    <Link to="/bookings">
                                        <Card className="bg-slate-200 cursor-pointer" style={cardStyle}>
                                            <h2 className="text-xl font-extrabold text-black">Total Bookings</h2>
                                            <p className="text-xl text-black">{booking?.length}</p>
                                            <BookOpenIcon className="text-[#3C5B6F] w-36 h-36" />
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={24} sm={24} lg={8}>
                                    <Link to="/users" className="cursor-pointer" >
                                        <Card className="bg-slate-200" style={cardStyle}>
                                            <h2 className="text-xl font-extrabold text-black">Total Clients</h2>
                                            <p className="text-xl text-black">
                                                {booking && booking.filter((item: any) => item.status === 'APPROVED').length}
                                            </p>
                                            <UserGroupIcon className="text-[#538392] text-w w-36 h-36" />
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={24} sm={24} lg={8}>
                                    <Link to="/stylists">
                                        <Card className="bg-slate-200 cursor-pointer" style={cardStyle}>
                                            <h2 className="text-xl font-extrabold text-black"> Hairstylists</h2>
                                            <p className="text-xl text-black">{stylists?.length}</p>
                                            <UserPlusIcon className="text-[#496989] w-36 h-36" />
                                        </Card>
                                    </Link>
                                </Col>
                            </Row>
                        </div>

                        <div className="mt-8">
                            <Table columns={columns} dataSource={booking} />
                        </div>

                    </div>
                </div>
                {/* side content */}
                <div className="xl:w-[30%] bg-off-white rounded-xl overflow-hidden relative px-4">
                    <div>
                        <div className="w-full flex-1 text-xs">
                            <p className="text-2xl text-center italic my-4"> Chart Overview </p>
                            <ResponsiveContainer width="100%" height={400} className="bg-blue rounded-md">
                                <PieChart width={100} height={100}>
                                    <Pie
                                        dataKey="value"
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={105}
                                        fill="#8884d8"
                                        label={renderCustomizedLabel}
                                        labelLine={false}
                                    >
                                        {data.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HairstylistDashboard
