import { type ReactElement } from 'react'
import { Button, Form, Input, Select, TimePicker, Upload } from 'antd'
import moment from 'moment'

interface Props {
  handleSubmit: (values: any) => void
  initialValues: Record<string, any>
}

function HairStylistForm ({ handleSubmit, initialValues }: Props): ReactElement {
    const { Option } = Select

    // Initialize moment for time formatting
    const timeFormat = 'HH:mm'

    const initialTiming =
      initialValues.timing && initialValues.timing.length === 2
          ? [
              moment(initialValues?.timing[0], timeFormat),
              moment(initialValues?.timing[1], timeFormat)
          ]
          : []

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-8">
            <div className="bg-off-white p-6 shadow-md rounded-3xl">
                {/* <Form
                    onFinish={handleSubmit}
                    initialValues={{
                        ...initialValues,
                        ...(initialValues && {
                            timing: initialTiming
                        })
                    }}
                    className="flex flex-col"
                >
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input placeholder="Full Name" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="Phone Number" type="tel" />
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: 'Please select your country' }]}
                    >
                        <Select placeholder="Select Country">
                            <Option value="United Kingdom">UNITED KINGDOM (UK)</Option>
                            <Option value="Usa">USA</Option>
                            <Option value="France">FRANCE</Option>
                            <Option value="Germany">GERMANY</Option>
                            <Option value="Australia">AUSTRALIA</Option>
                            <Option value="Others">Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Specialization"
                        name="specialization"
                        rules={[{ required: true, message: 'Please select your specialization' }]}
                    >
                        <Select placeholder="Select Specialization">
                            <Option value="Braiding">Braiding</Option>
                            <Option value="Weaving">Weaving</Option>
                            <Option value="Twist">Twist</Option>
                            <Option value="Hair Dying and Braiding">Hair Dying and Braiding</Option>
                            <Option value="Others">Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Experience"
                        name="experience"
                        rules={[{ required: true, message: 'Please enter your experience' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                        label="Fees"
                        name="hairstyle_fees"
                        rules={[{ required: true, message: 'Please enter your hairstyle fees' }]}
                    >
                        <Input type="number" placeholder="Fees" />
                    </Form.Item>
                    <Form.Item
                        label="Working Hours"
                        name="timing"
                        rules={[{ required: true, message: 'Please select appointment time' }]}
                    >
                        <TimePicker.RangePicker format={timeFormat} />
                    </Form.Item>
                    <div>
                        <button type="submit" className="bg-blue text-white py-2 px-8 rounded-3xl hover:bg-blue mt-4 self-center">SUBMIT</button>
                    </div>
                </Form> */}
                <Form
                    onFinish={handleSubmit}
                    initialValues={{
                        ...initialValues,
                        ...(initialValues && {
                            timing: initialTiming
                        })
                    }}
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
                                label="Working Hours"
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
                            <Input.TextArea placeholder="Bio" rows={10} />
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
    )
}

export default HairStylistForm
