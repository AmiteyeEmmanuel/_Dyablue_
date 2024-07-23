import { useEffect, useState } from 'react'
import { hideLoading, showLoading } from '../../../redux/loading/loadingslice'
import moment from 'moment'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Card, Rate, Button, Input } from 'antd'
import { toast } from 'react-toastify'
import DashboardLayout from '../../dashboard/dashboard_layout'

const UserReviewForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { user } = useSelector((state: any) => state.user)
    const [hairStylist, setHairStylist] = useState<any>({})
    const [reviewText, setReviewText] = useState('')
    const [starRating, setStarRating] = useState<number | undefined>(0)

    const { TextArea } = Input

    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value)
    }

    const handleStarRatingChange = (value: number) => {
        setStarRating(value)
    }

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

    const submitReview = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post(
                'https://booking-book-server.onrender.com/api/users/submit-review',
                {
                    hairstylist_id: params.hairstylist_id,
                    user_id: user.user_id,
                    email: user.email,
                    stylist_info: hairStylist,
                    user_info: user,
                    review_text: reviewText,
                    star_rating: starRating
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
                    navigate('/users/review')
                }, 4000)
            }
        } catch (error) {
            toast.error('Error submitting review')
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 3000)
        }
    }

    useEffect(() => {
        getStylist()
    }, [])

    return (
        <DashboardLayout>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-8">
                <h1 className='text-xl text-black'>
                    {hairStylist && (
                        <Card title={hairStylist.fullname}>
                            <p className='font-extrabold mb-2'>
                                {hairStylist.bio}
                            </p>
                            <h3 className='text-xl font-extrabold'>
                            </h3>

                            <Form>
                                <Form.Item label="Write your review">
                                    <TextArea rows={4} value={reviewText} onChange={handleReviewTextChange} />
                                </Form.Item>
                                <Form.Item label="Rate this stylist">
                                    <Rate value={starRating} onChange={handleStarRatingChange} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='text'className='bg-blue text-white cursor-pointer hover:bg-slate-100 hover:text-black' onClick={submitReview}>
                                        Submit Review
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    )}
                </h1>
            </section>
        </DashboardLayout>
    )
}

export default UserReviewForm
