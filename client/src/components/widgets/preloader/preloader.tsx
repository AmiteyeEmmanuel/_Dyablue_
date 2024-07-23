// src/components/Preloader.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Loader from './loader_animation';

interface PreloaderProps {
  children: ReactNode;
}

const Preloader: React.FC<PreloaderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading ? (
                <Loader />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
