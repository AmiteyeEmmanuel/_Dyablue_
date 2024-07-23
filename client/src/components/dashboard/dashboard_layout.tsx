import { ReactNode, useEffect, useState } from 'react'
import { XMarkIcon, Bars3Icon, BellAlertIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Badge } from 'antd'
import { ToastContainer } from 'react-toastify'

import Sidebar from './sidebar'
import { clearUser } from '../../redux/user/userslice';

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardLayout ({ children }: DashboardLayoutProps) {
    const [menuCollapsed, setMenuCollapsed] = useState(window.innerWidth <= 768)
    const { user } = useSelector((state: any) => state.user)
    // const userRole = user?.isadmin ? 'Admin' : user?.ishairstylist ? 'HairStylist Account' : 'User Account'
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleBadgeClick = () => {
        navigate('/notification')
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setMenuCollapsed(true)
            } else {
                setMenuCollapsed(false)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearUser());
        navigate('/login');
    };

    return (
        <div className="flex h-auto bg-off-white">
            <ToastContainer className='w-3' />
            {/* Sidebar */}
            <div className={`w-[300px] p-4 min-h-[90vh] bg-blue ${menuCollapsed ? 'text-white w-[49px]' : ''} transition-all ease-in-out duration-300`}>
                {/* Sidebar content */}
                <Sidebar menuCollapsed={menuCollapsed} />
            </div>

            {/* Main Content */}
            <div className={`flex flex-col w-[100%] overflow-hidden p-2 ${menuCollapsed ? 'ml-[10px]' : 'w-3/4'}`}>
                {/* Header */}
                <div className="bg-blue text-white rounded-xl shadow-md mb-4 p-4 flex items-center justify-between">
                    {/* Header content */}
                    <div className="flex items-center justify-between w-full">
                        <div>
                            {menuCollapsed
                                ? (
                                    <Bars3Icon className="h-6 w-6 text-gray-400 cursor-pointer lg:block hidden" onClick={() => { setMenuCollapsed(false) }} />
                                )
                                : (
                                    <XMarkIcon className="h-6 w-6 text-gray-400 cursor-pointer lg:block hidden" onClick={() => { setMenuCollapsed(true) }} />
                                )}
                        </div>
                        <div className="flex items-center gap-6">
                            {/* <h1 className='text-white relative bottom-1 italic'> {userRole}</h1> */}
                            <span onClick={handleBadgeClick} style={{ cursor: 'pointer' }}>
                                <Badge className="text-white" count={user?.unseennotification?.length}>
                                    <BellAlertIcon className="w-6 h-6" />
                                </Badge>
                            </span>

                            <div className="relative group">
                                <button className="text-white cursor-pointer flex items-center relative bottom-1" onClick={handleLogout}>
                                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                                </button>
                                <div className="absolute left-0 transform -translate-x-full bg-blue text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Logout
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>

                {/* Body */}
                <div className="flex-grow overflow-scroll bg-white rounded-xl shadow-md p-4">
                    {/* Body content */}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
