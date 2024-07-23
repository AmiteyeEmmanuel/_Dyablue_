import Header from '../components/partials/header'
import Hero from '../components/partials/contact/hero'
import Footer from '../components/partials/footer'
import ContactForm from '../components/partials/contact/form'

function Contact_Us () {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <main className="flex-grow">

                {/*  Page sections */}
                <Hero/>
                <ContactForm/>
            </main>

            {/*  Site footer */}
            <Footer />

        </div>
    )
}

export default Contact_Us
