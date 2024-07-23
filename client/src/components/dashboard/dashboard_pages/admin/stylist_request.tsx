import { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard_layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Table } from 'antd'

function Stylist () {
    const [stylist, setStylist] = useState([])
    const dispatch = useDispatch()

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

    const handleStatus = async (record: any, status: any) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://booking-book-server.onrender.com/api/admin/update-stylist-status',
                { hairstylist_id: record.hairstylist_id, user_id: record.user_id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        fetchStylistData()
    }, [])

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullname'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Country',
            dataIndex: 'country'
        },
        {
            title: 'Fees',
            dataIndex: 'hairstyle_fees'
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization'
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
                                APPROVE
                            </button>
                            <button className="bg-rose-700 px-2 py-1 rounded text-white" onClick={async () => { await handleStatus(record, 'REJECTED') }}>
                                REJECT
                            </button>
                        </>
                    )}
                    {record.status === 'APPROVED' && (
                        <button className="bg-rose-700 px-2 py-1 rounded text-white" onClick={async () => { await handleStatus(record, 'REJECTED') }}>
                            REJECT
                        </button>
                    )}
                    {record.status === 'REJECTED' && (
                        <button className="bg-rose-700 px-2 py-1 rounded text-white">
                            DELETE
                        </button>
                    )}
                </div>
            )
        }
    ]

    return (
        <DashboardLayout>
            <h1 className="text-4xl mb-8">HAIR STYLIST</h1>
            <Table columns={columns} dataSource={stylist}/>
        </DashboardLayout>
    )
}

export default Stylist
