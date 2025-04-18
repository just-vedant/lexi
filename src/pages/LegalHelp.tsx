import React, { useState } from 'react';
import { Search, Star, BookOpen, MapPin, Award, Clock, Briefcase, Calendar, X } from 'lucide-react';

interface Lawyer {
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  location: string;
  email: string;
  phone: string;
  expertise: string[];
}

interface RelatedCase {
  title: string;
  description: string;
  outcome: string;
}

interface MockData {
  [key: string]: {
    lawyers: Lawyer[];
    cases: RelatedCase[];
  };
}

// Mock data for lawyers and related cases
const MOCK_DATA: MockData = {
  'tax': {
    lawyers: [
      {
        name: 'Priya Sharma',
        specialization: 'Tax Law',
        experience: '15 years',
        rating: 4.8,
        location: 'Mumbai',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        expertise: ['Corporate Tax', 'GST', 'International Taxation']
      },
      {
        name: 'Rajesh Mehta',
        specialization: 'Tax Law',
        experience: '12 years',
        rating: 4.6,
        location: 'Mumbai',
        email: 'rajesh.mehta@example.com',
        phone: '+91 98765 43211',
        expertise: ['Income Tax', 'Tax Planning', 'Tax Litigation']
      },
    ],
    cases: [
      {
        title: 'GST compliance dispute resolution',
        description: 'Successfully resolved a complex GST compliance issue for a manufacturing company',
        outcome: 'Favorable settlement with tax authorities'
      },
      {
        title: 'International tax planning',
        description: 'Structured international operations to optimize tax efficiency',
        outcome: 'Reduced tax liability by 30%'
      }
    ]
  },
  'divorce': {
    lawyers: [
      {
        name: 'Anjali Singh',
        specialization: 'Family Law',
        experience: '10 years',
        rating: 4.9,
        location: 'Delhi',
        email: 'anjali.singh@example.com',
        phone: '+91 98765 43212',
        expertise: ['Divorce Law', 'Child Custody', 'Alimony']
      },
      {
        name: 'Vikram Malhotra',
        specialization: 'Family Law',
        experience: '8 years',
        rating: 4.7,
        location: 'Delhi',
        email: 'vikram.malhotra@example.com',
        phone: '+91 98765 43213',
        expertise: ['Marriage Law', 'Property Division', 'Family Disputes']
      },
    ],
    cases: [
      {
        title: 'Mutual consent divorce settlement',
        description: 'Facilitated amicable divorce settlement between parties',
        outcome: 'Successful resolution within 6 months'
      },
      {
        title: 'Child custody resolution',
        description: 'Complex child custody case involving international jurisdiction',
        outcome: 'Favorable custody arrangement for client'
      }
    ]
  },
  'property': {
    lawyers: [
      {
        name: 'Suresh Kumar',
        specialization: 'Property Law',
        experience: '20 years',
        rating: 4.9,
        location: 'Karnataka',
        email: 'suresh.kumar@example.com',
        phone: '+91 98765 43214',
        expertise: ['Real Estate', 'Property Documentation', 'Land Acquisition']
      },
      {
        name: 'Lakshmi Rao',
        specialization: 'Property Law',
        experience: '16 years',
        rating: 4.8,
        location: 'Karnataka',
        email: 'lakshmi.rao@example.com',
        phone: '+91 98765 43215',
        expertise: ['Property Disputes', 'Title Verification', 'Real Estate Transactions']
      },
    ],
    cases: [
      {
        title: 'Property title dispute',
        description: 'Resolved complex property title dispute involving multiple parties',
        outcome: 'Clear title established for client'
      },
      {
        title: 'Real estate transaction',
        description: 'Facilitated large-scale real estate transaction with multiple stakeholders',
        outcome: 'Successful completion of transaction'
      }
    ]
  }
};

interface BookingModalProps {
  lawyer: Lawyer;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ lawyer, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book Consultation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
              <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LegalHelp: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    lawyers: Lawyer[];
    relatedCases: RelatedCase[];
  }>({ lawyers: [], relatedCases: [] });
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    const lowercaseQuery = query.toLowerCase().trim();
    
    // Find the best matching category
    const searchTerm = Object.keys(MOCK_DATA).find(key => 
      lowercaseQuery.includes(key) || 
      MOCK_DATA[key].lawyers.some(lawyer => 
        lawyer.specialization.toLowerCase().includes(lowercaseQuery) ||
        lawyer.expertise.some(expertise => expertise.toLowerCase().includes(lowercaseQuery))
      )
    );

    if (searchTerm) {
      setSearchResults({
        lawyers: MOCK_DATA[searchTerm].lawyers,
        relatedCases: MOCK_DATA[searchTerm].cases,
      });
    } else {
      setSearchResults({ lawyers: [], relatedCases: [] });
    }
    setShowSuggestions(false);
  };

  const searchSuggestions = [
    'tax lawyer',
    'divorce lawyer',
    'property lawyer',
    'family law',
    'corporate tax',
    'real estate'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Find Legal Help</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for lawyers (e.g., tax lawyer, divorce lawyer, property lawyer)"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && query.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border">
                {searchSuggestions
                  .filter(suggestion => 
                    suggestion.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQuery(suggestion);
                        setShowSuggestions(false);
                        handleSearch();
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-lg flex items-center transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {query && searchResults.lawyers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No lawyers found for "{query}"</p>
          <p className="text-gray-500">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  handleSearch();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : searchResults.lawyers.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Recommended Lawyers</h2>
            <div className="space-y-6">
              {searchResults.lawyers.map((lawyer, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{lawyer.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-5 w-5 mr-2" />
                      <span>{lawyer.specialization}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Experience: {lawyer.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{lawyer.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span>{lawyer.rating}/5.0</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lawyer.expertise.map((area, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLawyer(lawyer)}
                      className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Related Cases</h2>
            <div className="space-y-6">
              {searchResults.relatedCases.map((case_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="text-lg font-semibold">{case_.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{case_.description}</p>
                  <div className="flex items-center text-green-600">
                    <Award className="h-5 w-5 mr-2" />
                    <span>{case_.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {selectedLawyer && (
        <BookingModal
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}
    </div>
  );
};

export default LegalHelp;