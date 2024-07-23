import BookingForm from '../components/partials/booking/bookingform'
import DashboardLayout from '../components/dashboard/dashboard_layout'

function Booking() {
    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-screen overflow-hidden">
                {/*  Page content */}
                <main className="flex-grow">
                    <BookingForm/>
                </main>
            </div>
        </DashboardLayout>
    )
}

export default Booking
