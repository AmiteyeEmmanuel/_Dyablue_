import React from 'react'
import { Card } from 'antd'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

interface StylistProps {
  stylist: any
}

const StylistCard: React.FC<StylistProps> = ({ stylist }) => {
    const navigate = useNavigate()

    return (
        <div className='font-[600]'>
            <Card
                title={stylist.fullname}
                className="bg-off-white uppercase italic py-4"
                onClick={() => { navigate(`/booking/${stylist.hairstylist_id}`) }}
            >
                <div className='md:flex block md:gap-10'>
                    <div className=' px-2 md:w-1/2'>
                        <p className="mb-2">Email: {stylist.email}</p>
                        <p className="mb-2">Phone: {stylist.phone}</p>          
                        <p className="mb-2">Country: {stylist.country}</p>
                        <p className="mb-2">Address: {stylist.address}</p>
                        <p className="mb-2">Experience: {stylist.experience}</p>
                        <p className="mb-2">Skills: {stylist.specialization}</p>
                        <p className="mb-2">Payment Fees: {stylist.hairstyle_fees}</p>
                    </div>
                    <div className='md:w-1/2'>
                        {/* <p className="mb-2">BIO: {stylist.bio}</p> */}
                        <div className='rounded-md justify-center mx-auto text-center mb-6 bg-blue text-white'>
                            <p className="mb-2"> {stylist.image_data}</p>
                            <UserCircleIcon className='h-28 text-center justify-center mx-auto'/>
                        </div>
                        <p className='italic text-sm text-blue mb-1'>
                            You can book for a session within the time range, available 
                        </p>
                        <p className="mb-2">Schedule Time: {stylist.timing[0]} - {stylist.timing[1]}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4 cursor-pointer mx-auto">
                    <button
                        className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-brown-dark mx-auto"
                        onClick={() => { navigate(`/dashboard/${stylist.hairstylist_id}`) }}
                    >
                      Book
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default StylistCard
