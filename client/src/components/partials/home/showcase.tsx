import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

export default function Showcase() {
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        cardsRef.current.forEach((card, index) => {
            gsap.set(card, {
                rotateZ: index % 2 === 0 ? -10 : 10,
            });

            gsap.to(card, {
                rotateZ: 0,
                duration: 0.3,
                paused: true,
                ease: 'power2.out',
                overwrite: 'auto',
                clearProps: 'transform',
            });

            card.addEventListener('mouseenter', () => {
                gsap.to(card, { rotateZ: 0, duration: 0.3 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateZ: index % 2 === 0 ? -10 : 10, duration: 0.3 });
            });
        });
    }, []);

    const cards = [
        {
            id: 1,
            title: 'The Modern Stylist',
            content: 'John has revolutionized the male grooming industry with his innovative techniques and keen eye for detail. Known for his precision cuts and contemporary styles, he has garnered a loyal clientele that includes celebrities and influencers. John`s philosophy is that every haircut should be a personalized experience, ensuring that each client leaves feeling confident and stylish.',
            bgColor: '#9BB0C1',
        },
        {
            id: 2,
            title: 'The Trendsetter',
            content: 'Alex is renowned for his ability to anticipate and set trends in the world of male hairstyling. With a background in fashion and design, he seamlessly blends classic and modern elements to create unique looks that stand out. Alex’s salon is a hub of creativity where clients come to be inspired and transformed. He believes in pushing boundaries and constantly evolving his craft.',
            bgColor: '#4D869C',
        },
        {
            id: 3,
            title: 'The Master Barber',
            content: 'Mike is a master barber with over two decades of experience. His expertise in traditional barbering techniques, combined with his modern approach, has made him a respected figure in the industry. Mike’s barbershop is a blend of old-school charm and contemporary sophistication, offering clients a premium grooming experience. He is dedicated to preserving the art of barbering while introducing innovative services.',
            bgColor: '#B3C8CF',
        },
    ];

    return (
        <section className='py-10 px-8 xl:mt-32 md:mt-[-15rem] mt-0 bg-off-white'>
            <h1 className='text-center justify-center mx-auto md:w-[60%] w-auto text-3xl md:text-5xl mb-20 italic'>
            We connect you with the best hairstylists. Your time and comfort are our priority.
            </h1>
            <div className="md:flex block py-2 md:mt-[1rem] mt-[5rem] gap-10 w-full">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={(el) => {
                            if (el) {
                                cardsRef.current[index] = el;
                            }
                        }}
                        className="shadow-2xl rounded-lg w-full mx-auto md:px-10 md:py-14 py-5 px-5 mb-10"
                        style={{ backgroundColor: card.bgColor }}
                    >
                        <h2 className="text-2xl mb-4 italic">{card.title}</h2>
                        <p>{card.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
