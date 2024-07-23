import DashboardLayout from '../components/dashboard/dashboard_layout'
import { useSelector } from 'react-redux'
import AdminDashboard from '../components/dashboard/dashboard_pages/admin/admin_dashboard'
import HairstylistDashboard from '../components/dashboard/dashboard_pages/hairstylist/hairstylist_dashboard'
import UserDashboard from '../components/dashboard/dashboard_pages/user/user_dashboard'

function Dashboard () {
    const { user } = useSelector((state: any) => state.user)

    // Use a ternary operator to check if the user is an admin, a hairstylist, or neither
    const DashboardComponent = user?.isadmin ? AdminDashboard : user?.ishairstylist ? HairstylistDashboard : UserDashboard

    return (
        <DashboardLayout>
            <DashboardComponent />
        </DashboardLayout>
    )
}

export default Dashboard
