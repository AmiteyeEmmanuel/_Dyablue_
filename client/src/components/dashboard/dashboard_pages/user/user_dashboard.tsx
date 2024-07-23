import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice';
import Slider from 'react-slick';
import StylistCard from '../hairstylist/stylist_card';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Ratings from './rating';

interface Stylist {
    id: string; // Adjust the type of 'id' based on your actual data
    name: string;
}

function UserDashboard() {
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const { user } = useSelector((state: any) => state.user);
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

    const getGreeting = () => {
        const currentHour = new Date().getUTCHours();
        if (currentHour >= 0 && currentHour < 12) {
            return `Good Morning, ${user?.fullname}`;
        } else if (currentHour >= 12 && currentHour < 18) {
            return `Good Afternoon, ${user?.fullname}`;
        } else {
            return `Good Evening, ${user?.fullname}`;
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <div className="dashboard-container">
                <h1 className="text-4xl italic">{getGreeting()} 👋</h1>
                <p className="dashboard-link italic text-xl text-blue font-extrabold"> Welcome to your Dashboard </p>
                <div className='md:flex block w-full gap-4'>
                    <div className='dashboard-header cursor-pointer mb-4 mt-4 px-4 py-4 text-black bg-off-white  w-full h-[200px] shadow-3xl rounded-xl mx-auto text-center'>
                        <p className=' relative mt-4 uppercase font-semibold text-2xl'>
                            Appointments
                        </p>
                        <p className='text-8xl'>
                            2
                        </p>
                    </div>
                    <div className='dashboard-header cursor-pointer mb-4 mt-4 px-4 py-4 text-green bg-off-white w-full md:w-1/2  h-[200px] shadow-3xl rounded-xl mx-auto text-center'>
                        <p className='relative mt-4 uppercase font-semibold text-2xl'>
                            APPROVED
                        </p>
                        <p className='text-8xl'>
                            1
                        </p>
                    </div>

                    <div className='dashboard-header cursor-pointer mb-4 mt-4 px-4 py-4 text-yellow bg-off-white w-full md:w-1/2  h-[200px] shadow-3xl rounded-xl mx-auto text-center'>
                        <p className='relative mt-4 uppercase font-semibold text-2xl'>
                            Pending
                        </p>
                        <p className='text-8xl'>
                            1
                        </p>
                    </div>

                    <div className='dashboard-header cursor-pointer mb-4 mt-4 px-4 py-4 text-light-red bg-off-white md:w-1/2 w-full h-[200px] shadow-3xl rounded-xl mx-auto text-center'>
                        <p className='relative mt-4 uppercase font-semibold text-2xl'>
                            Rejected
                        </p>
                        <p className='text-8xl'>
                            0
                        </p>
                    </div>
                </div>
                <div className='xl:flex gap-8 block md:px-8 py-4'>
                    <div className='xl:w-[60%] w-full xl:mb-0 mb-8 shadow-2xl rounded-2xl bg-off-white '>
                        <div className='border-b-2 border-blue mx-8'>
                            <h1 className="text-2xl italic py-4 text-center"> Hairstylist Available  </h1>
                        </div>
                        <Slider {...settings}>
                            {stylists.map((stylist) => (
                                <div key={stylist.id}>
                                    <StylistCard stylist={stylist} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className='xl:w-[40%] w-full bg-off-white rounded-2xl px-4 py-8 text-black shadow-2xl'>
                        <Ratings/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
