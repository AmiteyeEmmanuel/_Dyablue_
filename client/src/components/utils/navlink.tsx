import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: ReactNode;
  additionalClasses?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, additionalClasses = '' }) => (
    <Link
        to={to}
        className={`italic hover:underline text-[18px] flex transition duration-150 ease-in-out ${additionalClasses}`}
    >
        {children}
    </Link>
);

export default NavLink;
