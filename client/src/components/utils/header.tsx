// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Bars3Icon } from '@heroicons/react/24/solid'
// import { XMarkIcon } from '@heroicons/react/24/outline'

// function Header () {
//     const [top, setTop] = useState(true)
//     const [show, setShow] = useState(false)

//     useEffect(() => {
//         const scrollHandler = () => {
//             window.pageYOffset > 10 ? setTop(false) : setTop(true)
//         }
//         window.addEventListener('scroll', scrollHandler)
//         return () => { window.removeEventListener('scroll', scrollHandler) }
//     }, [top])

//     return (
//         <header className= "fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-brown">
//             <div className="container mx-auto px-4 sm:px-6">
//                 <div className="flex items-center justify-between h-16 md:h-20">

//                     {/* Site branding */}
//                     <div className="flex-shrink-0">
//                         {/* Logo */}
//                         <Link to='/' className='cursor-pointer'>
//                             <img src='/logo.jpg' className=' w-12 h-12 rounded-full relative ' />
//                         </Link>
//                     </div>

//                     {/* Site Route */}
//                     <nav className="hidden lg:flex items-center lg:flex-wrap space-x-4 ml-8">
//                         <Link to="/stylists/appointments" className="text-white hover:text-cool-gray-900 px-4 py-3 flex items-center transition duration-150 ease-in-out"> Schedules </Link>
//                         <Link to="/bookings" className="text-white hover:text-cool-gray-900 px-4 py-3 flex items-center transition duration-150 ease-in-out">Booking</Link>
//                         <Link to="/about" className="text-white hover:text-cool-gray-900 px-4 py-3 flex items-center transition duration-150 ease-in-out">About</Link>
//                         <Link to="/contact" className="text-white hover:text-cool-gray-900 px-4 py-3 flex items-center transition duration-150 ease-in-out">Contact</Link>
//                         <div className="relative">
//                             {/* Replace this input with your actual search functionality */}
//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 className="px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-blue-500"
//                             />
//                         </div>
//                     </nav>

//                     <div className=' relative  md:left-10 hidden lg:flex lg:flex-wrap space-x-4'>
//                         <Link to="/create-account" className=" bg-transparent text-white hover:text-cool-gray-900 rounded-2xl px-6 py-3 flex items-center transition duration-150 ease-in-out"> Create Account</Link>
//                         <Link to="/login" className=" bg-black text-white hover:text-cool-gray-900 rounded-2xl px-6 py-3 flex items-center transition duration-150 ease-in-out">Login</Link>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <button onClick={() => { setShow(!show) }} className="lg:hidden text-white">
//                             {show
//                                 ? (
//                                     <XMarkIcon className="w-6 h-6" />
//                                 )
//                                 : (
//                                     <Bars3Icon className="w-6 h-6" />
//                                 )}
//                         </button>
//                     </div>
//                     {show && (
//                         <div className="lg:hidden absolute top-16 right-4 p-10 text-center bg-white rounded shadow-xl">
//                             <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
//                                 {/* Manually positioned background circles */}
//                                 <div className="absolute bg-brown opacity-20 rounded-full" style={{ width: '100px', height: '100px', top: '60%', left: '0%' }} />
//                                 <div className="absolute bg-brown opacity-20 rounded-full" style={{ width: '80px', height: '80px', top: '30%', left: '40%' }} />
//                             </div>
//                             <Link to="/stylists/appointments" className="block px-4 py-2 text-black hover:bg-gray-200 rounded border-b-2 ">Hair Stylist</Link>
//                             <Link to="/appointments" className="block px-4 py-2 text-black hover:bg-gray-200 rounded border-b-2 ">Booking</Link>
//                             <Link to="/about" className="block px-4 py-2 text-black hover:bg-gray-200 rounded border-b-2 ">About</Link>
//                             <Link to="/contact" className="block px-4 py-2 text-black hover:bg-gray-200 rounded">Contact</Link>
//                             <div className='flex gap-4 '>
//                                 <Link to="/create-account" className="bg-brown text-white rounded-full px-5 py-2">Create Account</Link>
//                                 <Link to="/login" className="bg-black text-white rounded-full px-5 py-2">Login</Link>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header
