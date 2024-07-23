import type React from 'react'
import { HomeIcon, CalendarIcon, UserIcon, StarIcon, RectangleStackIcon } from '@heroicons/react/24/solid'

export interface MenuType {
  name: string
  path: string
  icon: React.ComponentType
}

export const Menu: MenuType[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: HomeIcon
    },
    {
        name: 'Appointments',
        path: '/appointments',
        icon: CalendarIcon
    },
    {
        name: 'Application-Form',
        path: '/stylistform',
        icon:  RectangleStackIcon
    },
    {
        name: 'Profile',
        path: '/user/profile',
        icon: UserIcon
    },
    {
        name: 'Ratings',
        path: '/users/review',
        icon: StarIcon
    }
]
