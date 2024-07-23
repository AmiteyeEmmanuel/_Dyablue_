import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { hero3, slideImg6 } from '../../../assets';

gsap.registerPlugin(ScrollTrigger);

// useEffect(() => {

//     gsap.to('#section', {
//         scrollTrigger: {
//             trigger: '#card4',
//             toggleActions: 'restart none none none',
//             start: 'top top',
//             end:  'bottom bottom',
//             scrub: true,
//             pin: '.#section',
//             pinSpacing: false
//         }
//     })
// }, [])

export default function Cards() {
    return (
        <section className='py-14 md:px-24 px-5  sm:px-2 bg-off-white'>
            <div className="rounded-md shadow-2xl mb-6 py-10 md:px-10  px-5  bg-off-white w-full">
                <div className='md:flex md:flex-nowrap block gap-[6rem]'>
                    <div className='w-full md:w-1/2'>
                        <h1 className='text-3xl italic pb-4'> Control your time and schedule with ease  </h1>
                        <p className=' text-lg text-justify'>
                             A skilled and experienced hairstylist has the remarkable ability to
                             transform not just your hair but also your mood and confidence. Their
                             expertise and artistry can turn a challenging or bad day into a moment
                             of beauty and self-assurance, leaving you feeling refreshed, uplifted,
                             and ready to conquer the world."
                        </p>
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <img className='w-full h-[20rem]' src={hero3} alt="card"/>
                    </div>
                </div>
            </div>

            <div className='md:flex block gap-8 mb-4'>
                <div className='rounded-md shadow-2xl mb-2  py-10 md:px-14 px-5 bg-[#164863] text-white'>
                    <h1 className="text-2xl italic">
                        Rescheduling appointment bookings
                    </h1>
                    <p>
                    Adjust your existing appointment to a new time or date with ease. 
                    Our rebooking service ensures flexibility and convenience, allowing
                    you to manage your schedule effectively.
                    </p>
                </div>

                <div className='rounded-md shadow-2xl mb-2  py-10 md:px-14 px-5 bg-[#365486] text-white'>
                    <h1 className="text-2xl italic">
                     Expand your clientele.
                    </h1>
                    <p>
                    strategy to grow a business's customer base by attracting new clients. 
                    This involves proactive measures such as marketing campaigns, and 
                    providing excellent customer service to appeal to a broader audience.
                    </p>
                </div>
            </div>

            <div className="rounded-md shadow-2xl mb-6  py-10 md:px-14 px-5 bg-off-white text-black">
                <div className='md:flex md:flex-nowrap block gap-[6rem]'>
                    <div className='md:w-1/2 w-full'>
                        <h1 className='text-3xl italic pb-4'> Effortlessly manage your time and appointments </h1>
                        <p className=' text-lg text-justify'>
                        A talented and seasoned hairstylist possesses the unique capability to 
                        transform not just your hair but also your mood and confidence.
                         Their skill and creativity can turn a difficult day into a moment of 
                         beauty and self-assurance, leaving you feeling rejuvenated, uplifted,
                          and ready to take on the world.
                        </p>
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <img className='w-full h-[20rem]' src={slideImg6} alt="card"/>
                    </div>
                </div>
            </div> 
        </section>
    );
}
