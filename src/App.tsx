import React, { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import SkipToContent from './components/SkipToContent'
import './styles/accessibility.css'

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'))
const Credits = React.lazy(() => import('./pages/Credits'))
const Cards = React.lazy(() => import('./pages/Cards'))
const Promotions = React.lazy(() => import('./pages/Promotions'))
const Fees = React.lazy(() => import('./pages/Fees'))
const BankDetail = React.lazy(() => import('./pages/BankDetail'))
const About = React.lazy(() => import('./pages/About'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Privacy = React.lazy(() => import('./pages/Privacy'))
const Terms = React.lazy(() => import('./pages/Terms'))
const NotFound = React.lazy(() => import('./pages/404'))

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
)

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <SkipToContent />
          <Header />
          
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Home />} />
                <Route path="/kredi" element={<Credits />} />
                <Route path="/kredi-karti" element={<Cards />} />
                <Route path="/emekli-promosyonu" element={<Promotions />} />
                <Route path="/ucretler" element={<Fees />} />
                
                {/* Bank detail pages */}
                <Route path="/banka/:bankSlug" element={<BankDetail />} />
                
                {/* Static pages */}
                <Route path="/hakkimizda" element={<About />} />
                <Route path="/iletisim" element={<Contact />} />
                <Route path="/gizlilik-politikasi" element={<Privacy />} />
                <Route path="/kullanim-sartlari" element={<Terms />} />
                
                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App