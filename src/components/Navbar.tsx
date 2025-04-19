import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, userProfile, signInWithGoogle, signOut } = useAuth();

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">Lexi</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-400 transition-colors py-2">
              Home
            </Link>
            <Link to="/legal-help" className="hover:text-blue-400 transition-colors py-2">
              Legal Help
            </Link>
            <Link to="/cost-calculator" className="hover:text-blue-400 transition-colors py-2">
              Cost Calculator
            </Link>
            {userProfile?.role === 'lawyer' && (
              <Link to="/dashboard" className="hover:text-blue-400 transition-colors py-2">
                Dashboard
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {userProfile?.name || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;