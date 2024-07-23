import axios from 'axios';
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice';
import DashboardLayout from '../../dashboard_layout';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Pagination } from 'antd';
import ReviewCard from './review_card';

interface Stylist {
    _id: string;
    fullname: string;
}

const UserReview: React.FC = () => {
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [stylistsPerPage] = useState(10);
    const dispatch = useDispatch();

    const getToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            dispatch(showLoading());
            const response = await axios.get(
                'https://booking-book-server.onrender.com/api/users/all-approved-stylist',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                setStylists(response.data.hairstylists);
            }
        } catch (error) {
            console.error('Error fetching approved stylists:', error);
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredStylists = stylists.filter(stylist =>
        stylist?.fullname && stylist?.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastStylist = currentPage * stylistsPerPage;
    const indexOfFirstStylist = indexOfLastStylist - stylistsPerPage;
    const currentStylists = filteredStylists.slice(indexOfFirstStylist, indexOfLastStylist);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <DashboardLayout>
            <h1 className="text-4xl mb-4 italic"> Ratings and Reviews</h1>
            <Card className="stylist-list bg-blue">
                <h1 className="text-2xl italic mb-4 text-white text-center"> Your Feedback is always respected.⭐️⭐️⭐️⭐️⭐️</h1>
                <Input
                    placeholder="Search for a stylist"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="mb-4"
                />
                <Row gutter={[16, 16]}>
                    {currentStylists.map((stylist) => (
                        <Col key={stylist._id} xs={24} sm={24} lg={12}>
                            <ReviewCard review={stylist} />
                        </Col>
                    ))}
                </Row>
                <Pagination
                    current={currentPage}
                    total={filteredStylists.length}
                    pageSize={stylistsPerPage}
                    onChange={handleChangePage}
                    className="mt-4 text-center"
                />
            </Card>
        </DashboardLayout>
    );
}

export default UserReview;
