import { useState, useEffect } from 'react'
import { ArrowLongUpIcon } from '@heroicons/react/24/solid'

function ScrollUp () {
    const [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            window.pageYOffset > 100 ? setShowScroll(true) : setShowScroll(false)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <a
            href="#"
            className={`${
                showScroll ? 'block' : 'hidden'
            } fixed bottom-10 right-8 p-2 bg-[#f3f4f6] rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-110`}
        >
            <ArrowLongUpIcon className="h-6 w-6 text-black" />
        </a>
    )
}

export default ScrollUp
