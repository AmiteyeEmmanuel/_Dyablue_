import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
    useEffect(() => {
        const cursor = document.getElementById('custom-cursor');
        const links = document.querySelectorAll('a');
        const headers = document.querySelectorAll('h1');
        const text = document.getElementById('cursor-text');

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(cursor, { x: clientX, y: clientY });
        };

        const onMouseEnterLink = (e: MouseEvent) => {
            const link = e.target as HTMLElement;
            if (link.classList.contains('view')) {
                gsap.from(cursor, { scale: 4 });
                if (text) text.style.display = 'block';
            } else {
                gsap.to(cursor, { scale: 4 });
            }
        };

        const onMouseHeader = (e: MouseEvent) => {
            const header = e.target as HTMLElement;
            if (header) {
                gsap.from(cursor, { scale: 7 });
            }
        };

        const onMouseLeave = () => {
            gsap.to(cursor, { scale: 1 });
            if (text) text.style.display = 'none';
        };

        document.addEventListener('mousemove', onMouseMove);
        links.forEach((link) => {
            link.addEventListener('mouseenter', onMouseEnterLink);
            link.addEventListener('mouseleave', onMouseLeave);
        });

        headers.forEach((header) => {
            header.addEventListener('mousemove', onMouseHeader);
            header.addEventListener('mouseleave', onMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            links.forEach((link) => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeave);
            });
            headers.forEach((header) => {
                header.removeEventListener('mousemove', onMouseHeader);
                header.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <div
            id="custom-cursor"
            className=" xl:fixed hidden top-0 left-0 w-5 h-5 pointer-events-none rounded-full z-[9999] mix-blend-difference xl:flex justify-center items-center bg-white p-2"
        >
            <h1
                id="cursor-text"
                className="text-xs font-black tracking-widest hidden"
            >
               DYABLUE
            </h1>
        </div>
    );
}
