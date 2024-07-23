import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { toast, ToastContainer } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import CSS for toastify
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/loading/loadingslice'
import Diamond from '../utils/diamond'
import { slideImg5, slideImg9 } from '../assets'

interface FormData {
  email: string
  password: string
}

interface DiamondPosition {
    size: string;
    top: string;
    left: string;
}

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [diamonds, setDiamonds] = useState<DiamondPosition[]>([]);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const diamondPositions: DiamondPosition[] = [
        { size: '20px', top: '10%', left: '20%' },
        { size: '30px', top: '30%', left: '40%' },
        { size: '25px', top: '50%', left: '60%' },
        { size: '35px', top: '70%', left: '80%' },
        { size: '40px', top: '90%', left: '10%' },
    ];

    useEffect(() => {
        setDiamonds(diamondPositions);
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            dispatch(showLoading())
            const response = await axios.post('https://booking-book-server.onrender.com/api/users/login', formData)
            if (response.data.success) {
                toast.success(response.data.message)
                setTimeout(() => {
                    localStorage.setItem('token', response.data.data)
                    navigate('/dashboard')
                }, 2000)
            } else {
                // If there is an error, display the error message
                toast.error(response.data.message)
            }
        } catch (error) {
            // Use toast to show the error message
            toast.error('Something went Wrong, Try again.')
            console.error('Error during sign up:', error)
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 4000)
        }
    }

    // const allTrust = Object.values(formData).every(value => value);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <section className='bg-off-white relative min-h-screen md:pt-0 pt-40'>
            <ToastContainer />
            {diamonds.map((diamond, index) => (
                <Diamond key={index} size={diamond.size} top={diamond.top} left={diamond.left} />
            ))}
            <div className="relative flex justify-center items-center  xl:py-[22rem] md:py-[20rem] py-4 xl:px-20 px-4">

                {/* Left side with images */}
                <div className="xl:w-1/2 xl:flex relative hidden flex-col justify-center items-center bottom-14 h-[30vh]">
                    <div id='red' className=' border-blue border-2 rounded-full absolute top-[-2rem] right-[5rem] w-[35vw] h-[65vh] '/>
                    <img className='w-[60%] h-[50vh] rounded-r-full absolute top-[-1rem] right-2' src={slideImg5} alt='sign_up_image'/>
                    <img className='w-[60%]  h-[60vh]  absolute rounded-full left-8' src={slideImg9} alt='sign_up_image'/>
                </div>

                {/* Right side with form */}
                <div className="flex-1 flex justify-center items-center relative z-10">
                    <div className="max-w-md w-full p-6 bg-blue rounded-2xl shadow-md flex flex-col justify-center items-center">
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-off-white">Sign In</h2>

                            <form onSubmit={handleSubmit} className="w-full">
                                {/* Email Address */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-off-white">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="emailAddress"
                                        name="email"
                                        placeholder="johndoe@gmail.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-4 relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-off-white">
                                      Password
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="***********"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        required
                                    />
                                    {/* Toggle password visibility button */}
                                    <button
                                        type="button"
                                        className="absolute top-6 inset-y-0 right-0 flex items-center pr-3"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeIcon className="h-5 w-5 text-gray-400" /> : <EyeSlashIcon className="h-5 w-5 text-gray-400" />}
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`mt-4 cursor-pointer bg-${formData.password.trim() ? 'blue' : 'disabled'} text-black bg-off-white  py-2 px-6 rounded-full hover:bg-[#C9D7DD] transition duration-300`}
                                >
                                Login
                                </button>
                            </form>

                            {/* Link to navigate to Sign In */}
                            <p className="mt-4 text-sm text-off-white">
                                 Don't have an account?{' '}
                                <Link to="/create-account" className="text-[#C9D7DD] italic hover:underline">
                                 Sign Up
                                </Link>
                            </p>
                        </>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn
