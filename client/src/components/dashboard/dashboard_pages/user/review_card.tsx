import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

interface StylistProps {
  review: any
}

const ReviewCard: React.FC<StylistProps> = ({ review }) => {
    const navigate = useNavigate()

    return (
        <div className=''>
            <Card
                title={review.fullname}
                className="bg-off-white shadow-2xl rounded-lg mb-4"
                onClick={() => { navigate(`/review/${review.hairstylist_id}`) }}
            >
                <p className="mb-2">Phone: {review.phone}</p>
                <p className="mb-2">Email: {review.email}</p>
                <p className="mb-2">Country: {review.country}</p>

                <div className="flex justify-between items-center mt-4 cursor-pointer">
                    <button
                        className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-blue"
                        onClick={() => { navigate(`/dashboard/${review.hairstylist_id}`) }}
                    >
                     Rate
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default ReviewCard
