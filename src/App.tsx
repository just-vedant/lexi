import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LegalHelp from './pages/LegalHelp';
import LegalCostCalculator from './pages/LegalCostCalculator';
import TestDatabase from './components/TestDatabase';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/legal-help" element={<LegalHelp />} />
              <Route path="/cost-calculator" element={<LegalCostCalculator />} />
              <Route path="/test-db" element={<TestDatabase />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;