// elint-disable
import Showcase from '../components/partials/home/showcase'
import Hero from '../components/partials/home/hero'
import VideoCarousel from '../components/partials/home/video_carousel'
import Cards from '../components/partials/home/card'
import CardCarousel from '../components/partials/home/card_carousel'
import DashboardVideo from '../components/partials/home/dashboard_video'
import Features from '../components/partials/home/features'
import Review from '../components/partials/home/review'
import Layout from '../components/utils/layout'

function Home () {
    return (
        <div className="overflow-hidden">
            <Layout>
                <Hero />
                {/*  Page content */}
                <main className="flex-grow  bg-off-white">

                    {/*  Page sections */}
                    <DashboardVideo/>
                    <Showcase/>
                    <VideoCarousel />
                    <Cards/>
                    <Review/>
                    <CardCarousel/> 
                    <Features/>
                </main>
            </Layout>
        </div>
    )
}

export default Home
