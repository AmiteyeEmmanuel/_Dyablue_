import { gsap } from 'gsap';
import { useEffect } from 'react';
import { CustomEase } from 'gsap/CustomEase';
import { slideImg1, slideImg2, slideImg3, slideImg4, slideImg5, slideImg6 } from '../../../assets';


gsap.registerPlugin(CustomEase);

const images = [
    { src: slideImg1, text: 'QUALITY' },
    { src: slideImg2, text: 'CREATIVITY' },
    { src: slideImg3, text: 'INNOVATION' },
    { src: slideImg4, text: 'OUTSTANDING SERVICE' },
    { src: slideImg5, text: 'WE SERVE YOU' },
    { src: slideImg6, text: 'RESPECT' },
];

export default function SmallDevice() {
    useEffect(() => {
        CustomEase.create('cubic', '0.83, 0, 0.17, 1');

        let isAnimating = false;

        const splitTextIntoSpan = (selector : any) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                const text = element.innerText;
                const splitText = text
                    .split('')
                    .map((char : any) => `<span>${char === ' ' ? '&nbsp;&nbsp;' : char}</span>`)
                    .join('');
                element.innerHTML = splitText;
            });
        };

        const initializeCards = () => {
            const cards = Array.from(document.querySelectorAll('.showcaseCard'));
            if (cards.length === 0) return;
            gsap.to(cards, {
                y: (i) => -15 + 15 * i + '%',
                z: (i) => 15 * i,
                duration: 1,
                ease: 'cubic',
                stagger: -0.1,
            });
        };

        const startAnimation = () => {
            splitTextIntoSpan('.copy h1');
            initializeCards();
            gsap.set('h1 span', {
                y: -200,
            });
            const lastCard = document.querySelector('.slider .showcaseCard:last-child');
            if (lastCard) {
                const lastCardSpans = lastCard.querySelectorAll('h1 span');
                if (lastCardSpans) {
                    gsap.set(lastCardSpans, {
                        y: 0,
                    });
                }
            }
        };

        startAnimation();

        const changeSlide = () => {
            if (isAnimating) return;

            isAnimating = true;

            const slider = document.querySelector('.slider');
            const cards = Array.from(slider?.querySelectorAll('.showcaseCard') || []);
            if (cards.length === 0) return;
            const lastCard = cards.pop();
            const nextCard = cards[cards.length - 1];

            if (lastCard) {
                const lastCardSpans = lastCard.querySelectorAll('h1 span');
                if (lastCardSpans) {
                    gsap.to(lastCardSpans, {
                        y: 200,
                        duration: 0.75,
                        ease: 'cubic',
                    }).then(() => {
                        if (slider && lastCard) {
                            slider.insertBefore(lastCard, slider.firstChild);
                        }
                        initializeCards();
                        isAnimating = false;
                    });
                }
            }

            if (nextCard) {
                const nextCardSpans = nextCard.querySelectorAll('h1 span');
                if (nextCardSpans) {
                    gsap.to(nextCardSpans, {
                        y: 0,
                        duration: 0.75,
                        ease: 'cubic',
                    });
                }
            }
        };

        const interval = setInterval(changeSlide, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="containers">
            {/* <h1 className=''>
                WE GIVE THE BEST SERVICE
            </h1> */}
            <div className="slider">
                {images.map((image, index) => (
                    <div className="showcaseCard" key={index}>
                        <img src={image.src} alt={`Slide ${index + 1}`} />
                        <div className="copy">
                            <h1>{image.text}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 