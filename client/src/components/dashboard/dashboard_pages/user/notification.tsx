import { Tabs } from 'antd'
import DashboardLayout from '../../dashboard_layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setUser } from '../../../../redux/user/userslice'

function Notifications () {
    const { user } = useSelector((state: any) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const readAll = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://booking-book-server.onrender.com/api/users/updateNotifications', { userId: user?.user_id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setTimeout(() => {
                    toast.success(response.data.message)
                }, 4000)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 4000) // Set loading to false when the request is completed
        }
    }

    const deleteAll = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://booking-book-server.onrender.com/api/users/clearNotifications', { userId: user?.user_id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setTimeout(() => {
                    toast.success(response.data.message)
                }, 4000)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 4000) // Set loading to false when the request is completed
        }
    }

    if (!user) {
        return null
    }

    // Parse the JSON string in unseennotification if it exists
    const unseenNotifications = user.unseennotification.map((notification: string) => JSON.parse(notification))
    const receivedNotifications = user.receivednotification.map((notification: string) => JSON.parse(notification))

    return (
        <DashboardLayout>
            <h1 className="text-4xl">Notifications</h1>

            <Tabs>
                <Tabs.TabPane tab="Unread" key="unread">
                    <div className="notification-tab">
                        <h2 className="cursor-pointer flex text-blue justify-end" onClick={async () => { await readAll() }}>Mark all</h2>
                        <div className="grid gap-4 cursor-pointer mt-2" onClick={() => { navigate('/admin/stylist') }}>
                            {unseenNotifications.map((notification: any, index: number) => (
                                <div key={index} className="p-4 bg-white shadow-md rounded-md">
                                    <h3 className="text-lg font-bold">{notification.name}</h3>
                                    <p>{notification.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Read" key="read">
                    <div className="notification-tab">
                        <h2 className="cursor-pointer text-blue flex justify-end" onClick={async () => { await deleteAll() }} >Delete all</h2>
                        <div className="grid gap-4 cursor-pointer" >
                            {receivedNotifications.map((notification: any, index: number) => (
                                <div key={index} className="p-4 cursor-pointer bg-white shadow-md rounded-md mt-4">
                                    <h3 className="text-lg font-bold">{notification.name}</h3>
                                    <p>{notification.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </DashboardLayout>
    )
}

export default Notifications
