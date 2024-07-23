import { Navigate, useNavigate } from 'react-router-dom'
import { type ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { type UserState, setUser } from '../redux/user/userslice'
import { hideLoading, showLoading } from '../redux/loading/loadingslice'

interface AuthorizationProps {
  children: ReactNode
}

function Authorization (props: AuthorizationProps) {
    const { user } = useSelector((state: { user: UserState }) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getUser = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post(
                'https://booking-book-server.onrender.com/api/authorization',
                { token: localStorage.getItem('token') },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                localStorage.clear()
                navigate('/login')
            }
        } catch (error) {
            localStorage.clear()
            navigate('/login')
        } finally {
            setTimeout(() => {
                dispatch(hideLoading())
            }, 3000)
        }
    }

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user, dispatch])

    if (localStorage.getItem('token')) {
        return props.children
    } else {
        return <Navigate to="/login" />
    }
}

export default Authorization
