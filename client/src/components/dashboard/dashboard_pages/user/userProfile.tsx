import { useSelector } from 'react-redux'
import DashboardLayout from '../../dashboard_layout'
// import { useNavigate } from 'react-router-dom'
// import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import UserForm from './userForm'
import { UserIcon } from '@heroicons/react/24/outline'
// import { Card } from 'antd'

function UserProfile () {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { user } = useSelector((state: any) => state.user);
    // const [userProfile] = useState({})

    // const handleSubmit = async (values: any) => {
    //     try {
    //         dispatch(showLoading())
    //         const response = await axios.post(
    //             'https://booking-book-server.onrender.com/api/users/update-user-info',
    //             { ...values },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             }
    //         )

    //         if (response.data.success) {
    //             toast.success(response.data.message)
    //             setTimeout(() => {
    //                 navigate('/dashboard')
    //             }, 4000)
    //         } else {
    //             toast.error(response.data.message)
    //         }
    //     } catch (error) {
    //         // Use toast to show the error message
    //         toast.error('An error occurred. Please try again.')
    //         console.error('Error during sign up:', error)
    //     } finally {
    //         setTimeout(() => {
    //             dispatch(hideLoading())
    //         }, 4000) // Set loading to false when the request is completed
    //     }
    // }

    return (
        <DashboardLayout>
            <h1 className="text-4xl mb-4 italic">User Profile </h1>
            <div className='md:flex gap-8 px-14'>
              
                <div className="bg-off-white w-1/2  rounded-full justify-center mx-auto p-4 cursor-pointer relative top-6">
                    <UserIcon className="text-black  items-center" />
                </div>
          

                <div className='shadow-2xl bg-blue text-white rounded-3xl w-[50%] mx-auto px-5 py-20 mt-2'>
                    <p className='text-2xl py-6'> {user?.fullname}</p>
                    <p className='text-2xl py-6'> {user?.phone}</p>
                    <p className='text-2xl py-6'> {user?.email}</p>
                </div>
            </div>

            {/* {userProfile && <UserForm handleSubmit={handleSubmit} initialValues={userProfile} />} */}
        </DashboardLayout>
    )
}

export default UserProfile
