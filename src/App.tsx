import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LoadingSpinner from './components/ui/LoadingSpinner';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';

// Lazy load components that are not immediately visible
const AboutSection = React.lazy(() => import('./components/sections/AboutSection'));
const TrailerSection = React.lazy(() => import('./components/sections/TrailerSection'));
const SuggestTrailerSection = React.lazy(() => import('./components/sections/SuggestTrailerSection'));
const Gallery = React.lazy(() => import('./components/Gallery'));
const PricingSection = React.lazy(() => import('./components/sections/PricingSection'));
const FAQSection = React.lazy(() => import('./components/sections/FAQSection'));
const CancellationSection = React.lazy(() => import('./components/sections/CancellationSection'));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection'));

// Lazy load pages
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const BlogListPage = React.lazy(() => import('./pages/BlogListPage'));
const AvailabilityPage = React.lazy(() => import('./pages/AvailabilityPage'));
const LoginPage = React.lazy(() => import('./pages/admin/LoginPage'));
const AdminDashboard = React.lazy(() => import('./pages/admin/DashboardPage'));
const AdminRoute = React.lazy(() => import('./components/admin/AdminRoute'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-8">
    <LoadingSpinner />
  </div>
);

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TrailerSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SuggestTrailerSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CancellationSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/booking" 
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                  <BookingPage />
                </Suspense>
              } 
            />
            <Route 
              path="/blog" 
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                  <BlogListPage />
                </Suspense>
              } 
            />
            <Route 
              path="/blog/:id" 
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                  <BlogPost />
                </Suspense>
              } 
            />
            <Route 
              path="/availability" 
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                  <AvailabilityPage />
                </Suspense>
              } 
            />
            <Route 
              path="/terms-and-conditions" 
              element={
                <TermsAndConditionsPage />
              } 
            />
            <Route 
              path="/admin/login" 
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                  <LoginPage />
                </Suspense>
              } 
            />
            <Route
              path="/admin/dashboard"
              element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </Suspense>
              }
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}