import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

import { 
    hero1, 
    hero2, 
    hero3, 
    slideImg1, 
    slideImg2,
    slideImg3, 
    slideImg4, 
    slideImg5, 
    slideImg6, 
    slideImg7, 
    slideImg8, 
    slideImg9 
} from '../../../assets';

gsap.registerPlugin(ScrollTrigger);

const LazyImage = ({ src, alt } : any) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Load only once when it comes into view
        threshold: 0.1 // Trigger when 10% of the image is visible
    });

    return (
        <img ref={ref} src={inView ? src : ''} alt={alt} loading="lazy" />
    );
};

export default function LargeDevice() {

    useEffect(() => {
        const slides = gsap.utils.toArray<HTMLElement>('.slide');
        const activeSlideImages = gsap.utils.toArray<HTMLImageElement>('.active-slide img');

        const getInitialTranslateZ = (slide : any) => {
            const style = window.getComputedStyle(slide);
            const matrix = style.transform.match(/matrix3d\((.+)\)/);
            if (matrix) {
                const values = matrix[1].split(', ');
                return parseFloat(values[14]) || 0;
            }
            return 0;
        }

        const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
            return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
        }

        slides.forEach((slide, index) => {
            const initialZ = getInitialTranslateZ(slide);

            ScrollTrigger.create({
                trigger: '.parallaxContainer',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const zIncrement = progress * 22500;
                    const currentZ = initialZ + zIncrement;

                    let opacity;

                    if (currentZ > -2500) {
                        opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
                    } else {
                        opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
                    }

                    slide.style.opacity = `${opacity}`;
                    slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

                    if (currentZ < 100) {
                        gsap.to(activeSlideImages[index] as HTMLImageElement, { opacity: 1, duration: 1.5, ease: 'power3.out' });
                    } else {
                        gsap.to(activeSlideImages[index] as HTMLImageElement, { opacity: 0, duration: 1.5, ease: 'power3' });
                    }
                }
            });
        });
    }, []);


    return (
        <div className="parallaxContainer"> 
            <div className="activeSide">
                <LazyImage src={slideImg1} alt="" />
                <LazyImage src={slideImg2} alt="" />
                <LazyImage src={slideImg3} alt="" />
                <LazyImage src={slideImg4} alt="" />
                <LazyImage src={slideImg5} alt="" />
                <LazyImage src={slideImg6} alt="" />
                <LazyImage src={slideImg7} alt="" />
                <LazyImage src={slideImg8} alt="" />
                <LazyImage src={slideImg9} alt="" />
                <LazyImage src={hero1} alt="" />
                <LazyImage src={hero2} alt="" />
                <LazyImage src={hero3} alt="" />
            </div>

            <div className="slider">
                <div className="slide" id='slide-1'>
                    <div className="slide-copy">
                        <p> Clean cut </p>
                        <p id="index">( The Barber )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg1} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-2'>
                    <div className="slide-copy">
                        <p> Hair Wash </p>
                        <p id="index">( The Barber )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg2} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-3'>
                    <div className="slide-copy">
                        <p> Clean Cut </p>
                        <p id="index">( The Barber )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg3} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-4'>
                    <div className="slide-copy">
                        <p> Curly Dread (Finishing touch) </p>
                        <p id="index">( Modern Stylist )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg4} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-5'>
                    <div className="slide-copy">
                        <p> CURLY DREAD (2) </p>
                        <p id="index">( Modern Stylist )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg5} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-6'>
                    <div className="slide-copy">
                        <p> AFRO LOCK(2) </p>
                        <p id="index">( The Barber  )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg6} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-7'>
                    <div className="slide-copy">
                        <p> AFRO LOCK </p>
                        <p id="index">( Modern Stylist )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg7} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-8'>
                    <div className="slide-copy">
                        <p> Clean Shave </p>
                        <p id="index">( ED 9342 98567  )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg8} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-9'>
                    <div className="slide-copy">
                        <p> Hair Spray </p>
                        <p id="index">( Sample 201234 )</p>
                        <div className='slide-img'>
                            <LazyImage src={slideImg9} alt='' />
                        </div>
                    </div>
                </div>

                <div className="slide" id='slide-10'>
                    <div className="slide-copy">
                        <p> Curly dread </p>
                        <p id="index">( ***** )</p>
                        <div className='slide-img'>
                            <LazyImage src={hero1} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
