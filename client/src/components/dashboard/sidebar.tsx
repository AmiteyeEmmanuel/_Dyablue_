import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { Menu } from './contexts/user_menu';
import { AdminMenu } from './contexts/admin_menu';
// import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { StylistMenu } from './contexts/stylist_menu';

import { dyablue } from '../../assets';

interface SidebarProps {
  menuCollapsed: boolean;
}

function Sidebar({ menuCollapsed }: SidebarProps) {
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const { user } = useSelector((state: any) => state.user);
    const location = useLocation();

    const menuRendered = user?.isadmin ? AdminMenu : user?.ishairstylist ? StylistMenu : Menu;

    return (
        <div className="flex flex-col h-[100vh] justify-between">
            <div>
                {/* Dashboard logo */}
                <div className={`mb-2 ${menuCollapsed ? 'text-center' : ''}`}>
                    <div className="">
                        <Link to="/" className={`cursor-pointer ${menuCollapsed ? 'block' : ''}`}>
                            <img src={dyablue} className={`transition-all duration-300 w-full h-full ${menuCollapsed ? 'w-full h-full mx-auto' : 'w-full h-full'}`} />
                        </Link>
                    </div>
                </div>

                <div className="mt-24">
                    {menuRendered.map((menu) => {
                        const isActive = location.pathname === menu.path;
                        return (
                            <div
                                key={menu.path}
                                className={`flex items-center mt-[40px] ml-[-0.5rem] text-white text-lg gap-6 py-2 px-1 ${isActive ? 'bg-[#3C5B6F] rounded-xl' : hoveredMenu === menu.path ? 'bg-[#3C5B6F] rounded-xl py-2' : ''}`}
                                onMouseEnter={() => { setHoveredMenu(menu.path); }}
                                onMouseLeave={() => { setHoveredMenu(null); }}
                            >
                                <Link to={menu.path} className="w-6">
                                    <menu.icon />
                                </Link>
                                {!menuCollapsed && (
                                    <Link
                                        className={`cursor-pointer opacity-70 ${isActive ? 'bg-[#3C5B6F] px-2 py-1 rounded-xl' : ''}`}
                                        to={menu.path}
                                    >
                                        {menu.name}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
