import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { BookingProvider } from './contexts/BookingContext'
import { GlobalsProvider } from './contexts/GlobalsContext'
import { UserProvider } from './contexts/UserContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router >
      <AuthProvider>
        <BookingProvider>
          <UserProvider>
            <GlobalsProvider>
              <App />
            </GlobalsProvider>
          </UserProvider>
        </BookingProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
