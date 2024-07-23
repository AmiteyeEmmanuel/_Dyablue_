import { type ReactElement } from 'react'
import { Form, Input } from 'antd'

interface Props {
  handleSubmit: (values: any) => void
  initialValues: Record<string, any>
}

function UserForm ({ handleSubmit, initialValues }: Props): ReactElement {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-8">
            <div className="bg-white p-6 shadow-md rounded-lg">
                <Form
                    onFinish={handleSubmit}
                    initialValues={initialValues}
                    className="flex flex-col"
                >
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[{ message: 'Please enter your full name' }]}
                    >
                        <Input placeholder="Full Name" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="Phone Number" type="tel" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ message: 'Please enter your email' }]}
                    >
                        <Input placeholder='Email' type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ message: 'Password' }]}
                    >
                        <Input type="text" placeholder="password" />
                    </Form.Item>
                    <div>
                        <button type="submit" className="bg-brown text-white py-2 px-8 rounded-3xl hover:bg-brown-dark mt-4 self-center">SUBMIT</button>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UserForm
