import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from '../../dashboard_layout'
import HairStylistForm from './hairstylist_form'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'

function StylistProfile () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state: any) => state.user)
    const [hairStylist] = useState({})
    const timeFormat = 'HH:mm'

    const formatValues = (values: any) => {
        const formattedValues = { ...values }

        // Format timing if present
        if (formattedValues.timing && formattedValues.timing.length === 2) {
            formattedValues.timing = [
                formattedValues.timing[0].format(timeFormat),
                formattedValues.timing[1].format(timeFormat)
            ]
        }

        return formattedValues
    }

    const handleSubmit = async (values: any) => {
        try {
            dispatch(showLoading())
            const formattedValues = formatValues(values)
            const response = await axios.post(
                'https://booking-book-server.onrender.com/api/hairstylist/update-stylist-info',
                {
                    ...values,
                    userId: user?.user_id,
                    ...formattedValues
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.data.success) {
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate('/dashboard')
                }, 4000)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            // Use toast to show the error message
            toast.error('An error occurred. Please try again.')
            console.error('Error during sign up:', error)
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 4000) // Set loading to false when the request is completed
        }
    }

    return (
        <DashboardLayout>
            <h1 className='text-4xl text-center italic'> Stylist Profile </h1>
            {hairStylist && <HairStylistForm handleSubmit={handleSubmit} initialValues={hairStylist} />}
        </DashboardLayout>
    )
}

export default StylistProfile
