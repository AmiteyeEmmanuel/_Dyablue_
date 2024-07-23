import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { slideImg5 }  from '../../../assets';

export default function LoaderAnimation() {
    useLayoutEffect(() => {
        const splitTextIntoSpan = (selector: string) => {
            const elements = document.querySelectorAll<HTMLElement>(selector);
            elements.forEach((element) => {
                const text = element.innerText;
                const letters = text.split('').map((letter) => `<span>${letter}</span>`).join('');
                element.innerHTML = letters;
            });
        };

        splitTextIntoSpan('.logo p');

        const startLoader = () => {
            const counterElement = document.querySelector('.counter p');
            let currentValue = 0;

            const updateCounter = () => {
                if (currentValue >= 100) {
                    currentValue = 100;
                    animateText();
                    return;
                }

                currentValue += Math.floor(Math.random() * 10) + 1;
                if (currentValue > 100) currentValue = 100;

                if (counterElement) {
                    counterElement.innerHTML = currentValue
                        .toString()
                        .split('')
                        .map((letter) => `<span>${letter}</span>`)
                        .join('') + '<span>%</span>';
                }

                const delay = Math.floor(Math.random() * 200) + 100;
                setTimeout(updateCounter, delay);
            };

            const animateText = () => {
                setTimeout(() => {
                    gsap.to('.counter p span', {
                        top: '-400px',
                        stagger: 0.1,
                        ease: 'power3.inOut',
                        duration: 1,
                    });
                });

                gsap.to('.logo p span', {
                    top: '0',
                    stagger: 0.1,
                    ease: 'power3.inOut',
                    opacity: 1,
                    duration: 1,
                });

                gsap.to('.logo p span', {
                    bottom: '-400px',
                    stagger: 0.1,
                    opacity: 1,
                    ease: 'power3.inOut',
                    duration: 1,
                    delay: 3,
                });

                gsap.to('.overlay', {
                    opacity: 0,
                    ease: 'power3.inOut',
                    duration: 1,
                    delay: 4,
                });
            };

            updateCounter();
        };

        startLoader();

        gsap.to('.img-holder img', {
            left: 0,
            stagger: 0.1,
            ease: 'power4.out',
            duration: 1.5,
            delay: 4,
        });

        gsap.to('.img-holder img', {
            left: '110%',
            stagger: -0.1,
            ease: 'power4.out',
            duration: 1.5,
            delay: 7,
        });
    }, []);

    return (
        <div className='overlay'>
            <div className='overlay-content'>
                <div className='images'>
                    <div className='img-holder'>
                        <img src={slideImg5} alt="Slide 1" />
                        <img src={slideImg5} alt="Slide 2" />
                        <img src={slideImg5} alt="Slide 3" />
                        <img src={slideImg5} alt="Slide 4" />
                        <img src={slideImg5} alt="Slide 5" />
                        <img src={slideImg5} alt="Slide 6" />
                        <img src={slideImg5} alt="Slide 7" />
                        <img src={slideImg5} alt="Slide 8" />
                        <img src={slideImg5} alt="Slide 9" />
                    </div>
                </div>
                <div className="text">
                    <div className="counter text-[8rem] md:text-[13rem]">
                        <p>0%</p>
                    </div>

                    {/* <div className="logo">
                        <p>DYABLUE</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
