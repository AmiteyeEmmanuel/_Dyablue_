import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

interface AccessRouteProps {
  children: ReactNode
}

function AccessibleRoute (props: AccessRouteProps) {
    if (localStorage.getItem('token')) {
        return <Navigate to="/dashboard" />
    } else {
        return props.children
    }
}

export default AccessibleRoute
