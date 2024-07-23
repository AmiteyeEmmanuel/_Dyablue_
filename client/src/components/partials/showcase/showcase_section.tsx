import React, { useState, useEffect } from 'react';

import LargeDevice from './large';
import SmallDevice from './small';

const HeroSvg: React.FC = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 768);

    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };

    useEffect(() => {
        setMounted(true);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!mounted) return <div>...</div>;

    return (
        <div className="flex justify-center items-center">
            {isLargeScreen ? <LargeDevice /> : <SmallDevice />}
        </div>
    );
};

export default HeroSvg;
