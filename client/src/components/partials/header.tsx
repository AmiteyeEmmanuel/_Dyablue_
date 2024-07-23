import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import NavLink from '../utils/navlink';
import { dyablue } from '../../assets';

const Header: React.FC = () => {
    const [top, setTop] = useState(true);
    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
        setShow(!show);
    };

    useEffect(() => {
        const scrollHandler = () => {
            setTop(window.pageYOffset <= 10);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    useEffect(() => {
        const tl = gsap.timeline({ paused: true });

        gsap.set('.menu-text', { y: 15 });

        tl.to('.nav_overlays ', {
            duration: 1.5,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power4.inOut'
        });

        tl.to('.menu-text', {
            duration: 1.5,
            x: 20,
            stagger: 0.2,
            ease: 'power4.out'
        }, '-=1');

        tl.to('.sub-nav', {
            bottom: '10%',
            opacity: 1,
            duration: 0.5,
            delay: 0.5
        }, '<');

        if (isActive) {
            tl.play();
        } else {
            tl.reverse();
        }
    }, [isActive]);

    const navLinks = [
        { to: '/stylists/appointments', text: 'Appointments' },
        { to: '/appointments', text: 'HairStylist Application' },
        { to: '/showcase', text: 'Showcase' },
        { to: '/contact', text: 'Contact' },
    ];

    return (
        <header className={`fixed z-30 max-w-[1500px] mt-5 rounded-full w-full transition duration-300 ease-in-out ${!top && 'bg-[#f3f4f6] backdrop-blur-sm shadow-lg'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Site branding */}
                    <div className="flex-shrink-0">
                        {/* Logo */}
                        <Link to='/' className='cursor-pointer'>
                            <img src={dyablue} className='w-12 h-12 rounded-full' alt="Logo" />
                        </Link>
                    </div>

                    {/* Site Route */}
                    <nav className="relative hidden md:left-14 lg:flex mx-auto items-center space-x-7 gap-10">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} to={link.to}>
                                {link.text}
                            </NavLink>
                        ))}
                    </nav>

                    <div className='hidden lg:flex space-x-3'>
                        <NavLink to="/create-account" additionalClasses="bg-transparent rounded-2xl px-6 py-3">
                            Create Account
                        </NavLink>
                        <NavLink to="/login" additionalClasses="bg-blue text-white rounded-2xl px-6 py-3">
                            Login
                        </NavLink>
                    </div>

                    <div className='toggle-btn md:hidden'>
                        <button
                            className={`burger ${isActive ? 'active' : ''}`}
                            onClick={handleToggle}
                        ></button>
                    </div>
                </div>
            </div>

            {show && (
                <div className='nav_overlays md:hidden'>
                    <div className='overlay-menu'>
                        <div className="menu-item">
                            {navLinks.map((link, index) => (
                                <NavLink key={index} to={link.to} additionalClasses="menu-text">
                                    {link.text}
                                </NavLink>
                            ))}
                            <div className='flex gap-4 mt-8 mb-10'>
                                <NavLink to="/create-account" additionalClasses="bg-black text-white rounded-full px-5 py-2">
                                    Create Account
                                </NavLink>
                                <NavLink to="/login" additionalClasses="bg-blue text-white rounded-full px-5 py-2">
                                    Login
                                </NavLink>
                            </div>

                            <div className='sub-nav mt-8'>
                                <p><a href='#'> Twitter</a></p>
                                <p>.</p>
                                <p><a href='#'> Instagram</a></p>
                                <p>.</p>
                                <p><a href='#'> Whatsapp</a></p>
                                <p>.</p>
                                <p><a href='#'> Snapchat</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
