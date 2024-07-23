import Marquee from 'react-fast-marquee';
import { SLIDER_ITEMS } from '../../utils/data';

export default function CardCarousel() {
    return (
        <section className='bg-off-white px-8'>
            <div className='flex mb-28 md:gap-36 gap-6 mt-12'>
                <h1 className='md:text-5xl text-2xl italic w-full md:w-[55%] relative md:left-16'>
                Flexible scheduling software to fit your business model.
                </h1>
                <p className="md:w-[35%] w-full text-xl relative top-24 md:left-12 italic">
                    Book your hair appointments effortlessly and feel relaxed and refreshed.
                    <span> Join us and feel excited today.</span>
                </p>
            </div>
            <div className="flex justify-center items-center py-5 bg-transparent">
                <Marquee>
                    {SLIDER_ITEMS.map((item, index) => (
                        <div key={index} className="mx-2 p-4 mb-4 bg-off-white rounded-2xl shadow-2xl w-[20rem] h-[25rem] overflow-hidden">
                            <div className="flex flex-col items-center gap-4 h-full">
                                <img src={item.imageSrc} alt="" className="w-full h-40 object-cover rounded" />
                                <h1 className="text-2xl font-semibold text-center">{item.text}</h1>
                                <p className="text-gray-600 text-center overflow-hidden text-ellipsis">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
