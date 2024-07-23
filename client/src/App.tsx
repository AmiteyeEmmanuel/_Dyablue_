import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollUp from './components/widgets/scrollup';
import Layout from './components/utils/layout';
import Authorization from './services/authorization';
import AccessibleRoute from './services/accessible_route';
import Loader from './components/widgets/loader';
import Preloader from './components/widgets/preloader/preloader';

const Home = lazy(() => import('./pages/home'));
const SignUp = lazy(() => import('./pages/sign_up'));
const Showcase = lazy(() => import('./pages/showcase'));
const SignIn = lazy(() => import('./pages/sign_in'));
const ContactUs = lazy(() => import('./pages/contact'));
const Booking = lazy(() => import('./pages/booking'));
const Dashboard = lazy(() => import('./pages/dashboard')); 
const StylistForm = lazy(() => import('./components/dashboard/dashboard_pages/user/application_form'));
const Notifications = lazy(() => import('./components/dashboard/dashboard_pages/user/notification'));
const User = lazy(() => import('./components/dashboard/dashboard_pages/admin/user'));
const Stylist = lazy(() => import('./components/dashboard/dashboard_pages/admin/stylist_request'));
const StylistProfile = lazy(() => import('./components/dashboard/dashboard_pages/hairstylist/stylist_profile'));
const Appointment = lazy(() => import('./components/dashboard/dashboard_pages/user/appointment'));
const StylistAppointment = lazy(() => import('./components/dashboard/dashboard_pages/hairstylist/stylist_appointment'));
const UserProfile = lazy(() => import('./components/dashboard/dashboard_pages/user/userProfile'));
const Bookings = lazy(() => import('./components/dashboard/dashboard_pages/admin/bookings'));
const UserReview = lazy(() => import('./components/dashboard/dashboard_pages/user/review'));
const UserReviewForm = lazy(() => import('./components/partials/reviews/user_reviews'));
const StylistReviews = lazy(() => import('./components/partials/reviews/stylist_reviews'));

function App() {
    return (
        <Router>
            <Loader />
            <Preloader>
                <Suspense>
                    <Routes>
                        {/* Home route */}
                        <Route path="/" element={<Home />} />

                        <Route path='/showcase' element={<Showcase />} />

                        {/* Contact us route without layout*/}
                        <Route path="/contact" element={<ContactUs />} />

                        {/* SignUp route with Layout */}
                        <Route path="/create-account" element={<AccessibleRoute><Layout><SignUp /></Layout></AccessibleRoute>} />
                        <Route path="/login" element={<AccessibleRoute><Layout><SignIn /></Layout></AccessibleRoute>} />

                        {/* Authorization Routes */}
                        <Route path="/dashboard" element={<Authorization><Dashboard /></Authorization>} />
                        <Route path="/stylistform" element={<Authorization><StylistForm /></Authorization>} />
                        <Route path="/booking/:hairstylist_id" element={<Authorization><Booking /></Authorization>} />
                        <Route path="/notification" element={<Authorization><Notifications /></Authorization>} />
                        <Route path="/appointments" element={<Authorization><Appointment /></Authorization>} />
                        <Route path="/user/profile" element={<Authorization><UserProfile /></Authorization>} />
                        <Route path="/users/review" element={<Authorization><UserReview/></Authorization>} />
                        <Route path="/review/:hairstylist_id" element={<Authorization><UserReviewForm/></Authorization>} />

                        {/* Admin */}
                        <Route path="/users" element={<Authorization><User /></Authorization>} />
                        <Route path="/stylists" element={<Authorization><Stylist /></Authorization>} />
                        <Route path="/bookings" element={<Authorization><Bookings /></Authorization>} />

                        {/* Stylist */}
                        <Route path="/stylists/profile" element={<Authorization><StylistProfile /></Authorization>} />
                        <Route path="/stylists/appointments" element={<Authorization><StylistAppointment /></Authorization>} />
                        <Route path="/stylist/reviews" element={<Authorization><StylistReviews /></Authorization>} />
                    </Routes>
                </Suspense>
            </Preloader>
            <ScrollUp />
        </Router>
    );
}

export default App;
