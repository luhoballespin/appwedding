import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProviderPanel from './pages/ProviderPanel';
import UserProfile from './pages/UserProfile';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/providers" element={<div>Providers Page</div>} />
                <Route path="/about" element={<div>About Page</div>} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/events/*"
                  element={
                    <ProtectedRoute>
                      <div>Events Pages</div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/provider-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['proveedor']}>
                      <ProviderPanel />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/provider-services"
                  element={
                    <ProtectedRoute allowedRoles={['proveedor']}>
                      <div>Provider Services</div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/provider-requests"
                  element={
                    <ProtectedRoute allowedRoles={['proveedor']}>
                      <div>Provider Requests</div>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <div>Settings Page</div>
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={
                  <div className="container-elegant py-12 text-center">
                    <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                      404 - Página no encontrada
                    </h1>
                    <p className="text-secondary-600 mb-8">
                      La página que buscas no existe.
                    </p>
                    <a href="/" className="btn-primary">
                      Volver al Inicio
                    </a>
                  </div>
                } />
              </Routes>
            </main>

            <Footer />
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;