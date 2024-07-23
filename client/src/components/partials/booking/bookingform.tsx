import { useEffect, useState } from 'react'
import { hideLoading, showLoading } from '../../../redux/loading/loadingslice'
import moment from 'moment'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, TimePicker, Card, Row, Col, Button } from 'antd'
import { toast } from 'react-toastify'
import { scheduling } from '../../../assets'

const BookingForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { user } = useSelector((state: any) => state.user)
    const [date, setDate] = useState<any>(null)
    const [isAvailable, setIsAvailable] = useState(false)
    const [time, setTime] = useState<any>(null)
    const [hairStylist, setHairStylist] = useState<any>({})
    const timeFormat = 'HH:mm'

    const getStylist = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post(
                'https://booking-book-server.onrender.com/api/hairstylist/stylist-info-by-hairstylist-id',
                { hairstylist_id: params.hairstylist_id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (response.data.success) {
                const updatedStylistData = { ...response.data.data }

                // Format timing values using moment
                updatedStylistData.timing = updatedStylistData.timing.map((time: string) => moment(time, 'HH:mm'))

                setHairStylist(updatedStylistData)
            }
        } catch (error) {
            console.log('An error occurred', error)
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 3000)
        }
    }

    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            setDate(date.format('YYYY-MM-DD'))
            setIsAvailable(false)
        } else {
            setDate(null)
        }
    }

    const formatValues = (values: any) => {
        const formattedValues = { ...values }

        if (formattedValues.timing && formattedValues.timing.length === 1) {
            formattedValues.timing = [
                formattedValues.timing[0].format(timeFormat)
            ]
        }

        return formattedValues
    }

    const handleTimeChange = (value: any) => {
        const formattedValues = formatValues({ timing: [value] })
        setIsAvailable(false)
        setTime(formattedValues.timing[0])
    }

    const bookingSpot = async () => {
        setIsAvailable(false)
        try {
            dispatch(showLoading())
            const response = await axios.post(
                'https://booking-book-server.onrender.com/api/users/book-appointment-spot',
                {
                    hairstylist_id: params.hairstylist_id,
                    email: user.email,
                    user_id: user.user_id,
                    date,
                    stylist_info: hairStylist,
                    user_info: user,
                    time
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
                    navigate('/appointments')
                }, 4000)
            }
        } catch (error) {
            toast.error('Error booking appointment')
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 3000)
        }
    }

    useEffect(() => {
        getStylist()
    }, [])

    const handleAvailabilityCheck = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post(
                'https://booking-book-server.onrender.com/api/users/check-availability',
                {
                    hairstylist_id: params.hairstylist_id,
                    date,
                    time
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (response.data.success) {
                toast.success(response.data.message)
                setIsAvailable(true)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('Error checking appointment availablity')
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 3000)
        }
    }

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-8 bg-blue py-20 rounded-2xl">
            <div className='text-xl text-black'>
                {hairStylist && (
                    <Card className='bg-off-white py-10 shadow-2xl'>
                        <div className='xl:flex  gap-8'> 
                            <div className='xl:w-1/2 w-full mb-4'>
                                <p className='font-extrabold mb-2 text-justify'>  <span> {hairStylist.bio}</span>  </p>
                                <h3 className='text-xl font-extrabold'>
                                </h3>
                                <Row className='mt-4'>
                                    <Col span={24} lg={8}>
                                        <DatePicker className='w-full' format={'YYYY-MM-DD'} onChange={handleDateChange} />
                                        <TimePicker className='w-full mt-4' format={timeFormat} onChange={handleTimeChange} />
                                        <button className='bg-blue py-2 rounded-3xl text-white w-full mt-4 hover:bg-blue' onClick={handleAvailabilityCheck}> Check Availability </button>
                                        {isAvailable && (
                                            <Button className='bg-blue rounded-3xl text-white w-full mt-4' onClick={bookingSpot}> Book Hairstylist </Button>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                            <div className='xl:w-1/2 w-full'>
                                <img src={scheduling} className='rounded-full'  alt='scheduling'/>
                            </div>

                        </div>

                    </Card>
                )}
            </div>
        </section>
    )
}

export default BookingForm
