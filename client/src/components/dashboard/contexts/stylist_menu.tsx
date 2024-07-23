import type React from 'react'
import { HomeIcon, CalendarIcon, Cog8ToothIcon, ListBulletIcon } from '@heroicons/react/24/solid'

export interface StylistType {
  name: string
  path: string
  icon: React.ComponentType
}

export const StylistMenu: StylistType[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: HomeIcon
    },
    {
        name: 'Appointment',
        path: '/stylists/appointments',
        icon: CalendarIcon
    },
    {
        name: 'Settings',
        path: '/stylists/profile',
        icon: Cog8ToothIcon
    },
    {
        name: 'Reviews',
        path: '/stylist/reviews',
        icon: ListBulletIcon
    }
]
