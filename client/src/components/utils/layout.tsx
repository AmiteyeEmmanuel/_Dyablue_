import React, { type ReactNode } from 'react'
import Header from '../partials/header'
import Footer from '../partials/footer'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-off-white">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
