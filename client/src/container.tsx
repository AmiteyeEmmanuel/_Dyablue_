// src/Container.tsx
import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="cont">{children}</div>;
};

export default Container;
