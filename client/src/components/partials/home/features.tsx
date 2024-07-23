import { useState } from 'react';

import services from '../../utils/feature';
import CustomButton from '../../utils/custom_button';
import { useNavigate } from 'react-router-dom';

export default function CosmosValidation() {
    const navigate = useNavigate();

    const [selectedServices, setSelectedServices] = useState(services[0]);

    const handleChainClick = (services :any) => {
        setSelectedServices(services);
    };

    return (
        <div className="mt-8 mb-4 px-8">
            <div className="max-w-screen-xl mx-auto px-4 md:px-10 justify-center items-center bg-[#EEEEEE] rounded-2xl">
                <div className="md:flex sm:block xs:block gap-8 pb-40 mx-auto relative top-5 justify-center">
                    <div className="mt-20 w-full md:w-2/5">
                        {services.map((service, index) => (
                            <div key={index} className="mb-6">
                                <div
                                    className="flex gap-12 border-b-2 rounded-b-2xl text-center py-4 cursor-pointer"
                                    onClick={() => handleChainClick(service)}
                                >
                                    <div className="text-lg font-bold relative top-4 text-center mx-auto italic">
                                        {service.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-3/5 mt-10 md:mt-52 px-4 md:px-10">
                        <div className="mt-1 font-extrabold text-3xl md:text-4xl">
                          Our hairstylist offers the best services
                        </div>
                        <div>
                            {selectedServices && (
                                <div className="mt-5">
                                    <div className="pb-10 text-left">
                                        {selectedServices.description}
                                    </div>
                                </div>
                            )}
                        </div>
                        <CustomButton
                            type="button"
                            title="Book an appointment with us today"
                            backgroundColor="bg-[#153448]"
                            color="text-[#FFFFFF]"
                            hoverBackgroundColor="hover:bg-[#31363F]"
                            fullWidth={true}
                            padding="py-2 px-8"
                            handleClick={() => navigate('/create-account')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
