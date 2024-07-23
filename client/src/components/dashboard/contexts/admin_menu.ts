import type React from 'react'
import { HomeIcon, UserPlusIcon, UserGroupIcon, BookmarkIcon } from '@heroicons/react/24/solid'

export interface MenuType {
  name: string
  path: string
  icon: React.ComponentType
}

export const AdminMenu: MenuType[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: HomeIcon
    },
    {
        name: 'Users',
        path: '/users',
        icon: UserGroupIcon
    },
    {
        name: 'Hairstylists',
        path: '/stylists',
        icon: UserPlusIcon
    },
    {
        name: 'Bookings',
        path: '/bookings',
        icon: BookmarkIcon
    }
]
