import React from 'react';
import { ArrowRight, Shield, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">
              Find the Right Legal Expert for Your Case
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Connect with experienced lawyers who specialize in your specific legal needs.
              Get professional legal help today.
            </p>
            <Link
              to="/legal-help"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-lg font-semibold transition-colors"
            >
              Get Legal Help Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Lexi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Lawyers</h3>
              <p className="text-gray-600">
                Access to a network of verified and experienced legal professionals
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Personalized Matching</h3>
              <p className="text-gray-600">
                Get matched with lawyers based on your specific legal needs
              </p>
            </div>
            <div className="text-center p-6">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Case Insights</h3>
              <p className="text-gray-600">
                Access similar case studies and legal resources
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;