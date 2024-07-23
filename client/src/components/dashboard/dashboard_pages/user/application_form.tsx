import React from 'react';
import DashboardLayout from '../../dashboard_layout';
import { Form, Input, Select, TimePicker, Upload, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../../redux/loading/loadingslice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const StylistForm: React.FC = (initialValues: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => state.user);
    const { Option } = Select;

    // Initialize moment for time formatting
    const timeFormat = 'HH:mm';

    const initialTiming =
        initialValues.timing && initialValues.timing.length === 2
            ? [moment(initialValues.timing[0], timeFormat), moment(initialValues.timing[1], timeFormat)]
            : [];

    const formatValues = (values: any) => {
        const formattedValues = { ...values };

        // Format timing if present
        if (formattedValues.timing && formattedValues.timing.length === 2) {
            formattedValues.timing = [
                formattedValues.timing[0].format(timeFormat),
                formattedValues.timing[1].format(timeFormat)
            ];
        }

        return formattedValues;
    };

    const handleSubmit = async (values: any) => {
        try {
            dispatch(showLoading());
            const formattedValues = formatValues(values);
            const response = await axios.post('https://booking-book-server.onrender.com/api/users/stylistform', { ...values, ...formattedValues, userId: user?.user_id });
            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // Use toast to show the error message
            toast.error('An error occurred. Please try again.');
            console.error('Error during registration:', error);
        } finally {
            setTimeout(() => {
                dispatch(hideLoading());
            }, 4000); // Set loading to false when the request is completed
        }
    };

    return (
        <DashboardLayout>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-8">
                <div className="bg-off-white p-6 shadow-md rounded-3xl">
                    <h1 className="text-3xl font-semibold text-center mb-4 text-blu italic">Become a part of the team today!</h1>
                    <Form
                        onFinish={handleSubmit}
                        initialValues={{ ...initialValues, timing: initialTiming }}
                        className="flex flex-col"
                    >
                        <div className='bg-off-white pt-6 rounded-2xl mb-4 px-4 shadow-2xl'>
                            <Form.Item
                                label="Full Name"
                                name="fullname"
                                rules={[{ required: true, message: 'Please enter your full name' }]}
                            >
                                <Input placeholder="Full Name" />
                            </Form.Item>
                        </div>
                        <div className='bg-off-white pt-6 rounded-2xl mb-4 px-4 shadow-2xl'>
                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input placeholder="Phone Number" type="tel" />
                            </Form.Item>
                        </div>

                        <div className='bg-off-white pt-6 rounded-2xl mb-4 px-4 shadow-2xl'>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please enter your email' }]}
                            >
                                <Input placeholder="Email" type="email" />
                            </Form.Item>
                        </div>
                        <div className='xl:flex xl:gap-8'>
                            <div className='bg-off-white pt-6 py-2 rounded-2xl mb-4 px-4 shadow-2xl xl:w-1/2'>
                                <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[{ required: true, message: 'Please select your country' }]}
                                >
                                    <Select placeholder="Select Country">
                                        <Option value="United Kingdom">United Kingdom (UK)</Option>
                                        <Option value="Usa">Usa</Option>
                                        <Option value="France">France</Option>
                                        <Option value="Germany">Germany</Option>
                                        <Option value="Australia">Australia</Option>
                                        <Option value="Australia">Nigeria</Option>
                                        <Option value="Australia">South Africa</Option>
                                        <Option value="Australia">China</Option>
                                        <Option value="Australia">Canada</Option>
                                        <Option value="Others">Others</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className='bg-off-white pt-6 py-2 rounded-2xl mb-4 px-4 shadow-2xl xl:w-1/2'>
                                <Form.Item
                                    label="Area of Expertise"
                                    name="specialization"
                                    rules={[{ required: true, message: 'Please select your specialization' }]}
                                >
                                    <Select placeholder="Select Skills">
                                        <Option value="Low Cut & Fade">Low Cut & Fade</Option>
                                        <Option value="Weaving">Weaving</Option>
                                        <Option value="Dreadlocks">Dreadlocks</Option>
                                        <Option value="Hair Dying and Braiding">Hair Dying and Braiding</Option>
                                        <Option value="Buzz Cut">Buzz Cut</Option>
                                        <Option value="Pompadour">Pompadour</Option>
                                        <Option value="Quiff">Quiff</Option>
                                        <Option value="Undercut">Undercut</Option>
                                        <Option value="Side Part">Side Part</Option>
                                        <Option value="Slick Back">Slick Back</Option>
                                        <Option value="Man Bun">Man Bun</Option>
                                        <Option value="French Crop">French Crop</Option>
                                        <Option value="Crew Cut">Crew Cut</Option>
                                        <Option value="Others">Others</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='lg:flex lg:gap-8'>
                            <div className='bg-off-white pt-6  py-2 rounded-2xl mb-4 px-4 shadow-2xl lg:w-[30%]'>
                                <Form.Item 
                                    label="Experience"
                                    name="experience"
                                    rules={[{ required: true, message: 'Please enter your experience' }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>
                      
                            <div className='bg-off-white pt-6 rounded-2xl  py-2  mb-4 px-4 shadow-2xl lg:w-[70%]'>
                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: 'Please enter your address' }]}
                                >
                                    <Input placeholder="Address" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='lg:flex lg:gap-8'>
                            <div className='bg-off-white pt-6  py-2 rounded-2xl mb-4 px-4 shadow-2xl lg:w-3/4'>
                                <Form.Item
                                    label="Appointment Hours"
                                    name="timing"
                                    rules={[{ required: true, message: 'Please select appointment time' }]}
                                >
                                    <TimePicker.RangePicker format={timeFormat} />
                                </Form.Item>
                            </div>

                            <div className='bg-off-white pt-6 py-2 rounded-2xl mb-4 px-4 shadow-2xl lg:w-2/4'>
                                <Form.Item
                                    label="Fees"
                                    name="hairstyle_fees"
                                    rules={[{ required: true, message: 'Please enter your hairstyle fees' }]}
                                >
                                    <Input type="number" placeholder="Fees" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='bg-off-white pt-6 rounded-2xl mb-4 px-4 shadow-2xl'>
                            <Form.Item
                                label="Bio"
                                name="bio"
                                rules={[{ required: true, message: 'Please enter your bio' }]}
                            >
                                <Input.TextArea placeholder="Bio" rows={4} />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please upload an image' }]}
                        >
                            <Upload
                                beforeUpload={() => false} 
                                listType="picture"
                                accept="image/*"
                                maxCount={1}
                            >
                                <Button>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                        <div>
                            <button type="submit" className="bg-blue text-white py-2 px-8 rounded-3xl hover:bg-brown-dark mt-4 self-center">
                                SUBMIT
                            </button>
                        </div>
                    </Form>
                </div>
            </section>
        </DashboardLayout>
    );
}

export default StylistForm;
