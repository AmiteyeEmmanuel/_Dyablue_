import { useState } from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeOpenIcon } from '@heroicons/react/24/solid'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // Add your form submission logic here
        console.log(formData)
    }

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-8">
            {/* Contact Information */}
            <div className="flex flex-col md:flex-row justify-between gap-4 md:relative md:bottom-24">
                {/* Phone Number */}
                <div className="bg-off-white py-10 px-4 items-center justify-center text-center shadow-md rounded-lg w-full md:w-1/3 italic">
                    <PhoneIcon className='w-16 h-16 mx-auto  text-blue'/>
                    <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
                    <p className="text-gray-700">+44-3423-4567</p>
                </div>
                {/* Support Email */}
                <div className="bg-off-white py-10 px-4 items-center justify-center text-center shadow-md rounded-lg w-full md:w-1/3 italic">
                    <EnvelopeOpenIcon className='w-16 h-16 mx-auto text-blue'/>
                    <h3 className="text-lg font-semibold mb-2">Support Email</h3>
                    <p className="text-gray-700">support@dyablue.com</p>
                </div>
                {/* Google Map */}
                <div className="bg-off-white py-10 px-4 items-center justify-center text-center shadow-md rounded-lg w-full md:w-1/3 italic">
                    <MapPinIcon className='w-16 h-16 mx-auto text-blue'/>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p className="text-gray-700">1234 Street, City, Country</p>
                </div>
            </div>

            {/* Send Us a Message */}
            <h1 className='text-blue text-center text-5xl font-extrabold border-b-blue border-b-4 mb-4 mt-4 italic'> Send Us a Message </h1>

            {/* Contact Form */}
            <div className="bg-off-white p-6 shadow-2xl rounded-lg">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="mb-4 w-full">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border-gray-300 border w-full p-2 rounded" />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-gray-300 border w-full p-2 rounded" />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="border-gray-300 border w-full p-2 rounded" />
                    </div>
                    <button type="submit" className="bg-blue text-white py-2 px-8 rounded-3xl hover:bg-brown-dark">Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default ContactForm
