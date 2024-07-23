import { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard_layout'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Table } from 'antd'

function User () {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()

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

    const handleDelete = async (userId: any) => {
        try {
            dispatch(showLoading())
            const response = await axios.delete(`https://booking-book-server.onrender.com/api/admin/delete-user/${userId}`, {
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
        fetchUserData()
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
            title: 'Actions',
            dataIndex: 'actions',
            render: (_text: any, record: any) => (
                <div className="flex gap-3">
                    <button className=" bg-rose-700 px-2 py-1 rounded text-white">BLOCK</button>
                    <button className="bg-black px-2 py-1 rounded text-white" onClick={async () => { await handleDelete(record.userId) }}>DELETE</button>
                </div>
            )
        }
    ]

    return (
        <DashboardLayout>
            <h1 className="text-4xl">Users</h1>
            <Table columns={columns} dataSource={users}/>
        </DashboardLayout>
    )
}

export default User
