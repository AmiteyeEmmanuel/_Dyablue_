import { AnimatePresence, motion } from 'framer-motion';
import { headContentAnimation } from '../../../utils/config/animation';

export default function Hero() {
    
    return (
        <AnimatePresence>
            <section className="relative bg-cover bg-center xl:h-[100vh] h-[100vh] md:h-[62vh] bg-[#4D869C]">
                <div className="flex flex-col items-center">
                    {/* <div className="absolute md:bottom-[10rem] bottom-[5rem] left-[5rem] md:left-[20rem] transform -translate-x-1/2 -translate-y-1/2 text-red">
                        <svg width="100" height="100" viewBox="0 0 24 24"><path d="M12 2l10 10-10 10-10-10z"/></svg>
                    </div>
                    <div className="absolute md:bottom-[20rem] right-[4rem] bottom-[35rem] transform translate-x-1/2 -translate-y-1/2 text-blue">
                        <svg width="120" height="120" viewBox="0 0 24 24"><path d="M12 2l10 10-10 10-10-10z"/></svg>
                    </div> */}


                    <div  className="max-w-6xl md:px-4 mx-auto px-4 sm:px-6">
                        <div className="w-full relative top-[9rem] xl:top-[14rem] z-0">
                            <div className="text-center mb-48 w-full xl:w-full md:w-[80%] justify-center mx-auto">
                                <motion.h1 id='content' className="xl:text-8xl md:text-5xl text-5xl font-extrabold leading-tighter tracking-tighter mb-2 relative md:top-26 top-14 z-0 opacity-0 text-center"  {...headContentAnimation}>
                                    <span className="text-black"> Elevate Your Style, Embrace Beauty, </span>
                                    <span className="text-off-white italic"> Define Your Confidence.</span>
                                </motion.h1>
                                <motion.p id='content' className="md:w-2/3 italic text-xl md:text-2xl font-extrabold relative md:top-25 top-14 px-1 py-1 mb-4 inline-block z-0" {...headContentAnimation}>
                                    Book your Hairstylist for a day, control your schedule, feel relaxed, and look good.
                                </motion.p>
                            </div>
                            {/* <Link className="" to="/create-account" >
                                <button className="bg-blue text-white text-xl px-10 py-3 rounded-full cursor-pointer relative md:bottom-[8rem] bottom-[10rem] z-0">
                                    Book an Appointment →
                                </button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </section>
        </AnimatePresence>
    );
}
