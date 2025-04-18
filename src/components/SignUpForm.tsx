import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../firebase';

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'client', // 'client' or 'lawyer'
    specialization: '',
    experience: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      // Validate form data
      if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
        setError('Please fill in all required fields');
        return;
      }

      if (formData.role === 'lawyer' && (!formData.specialization.trim() || !formData.experience.trim())) {
        setError('Please fill in specialization and experience for lawyers');
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      
      const userData = {
        ...formData,
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      console.log('Attempting to save user data:', userData);
      console.log('Database reference path:', `users/${user.uid}`);

      await set(userRef, userData);
      console.log('User data saved successfully');
      onClose();
    } catch (error) {
      console.error('Detailed error saving user data:', error);
      if (error instanceof Error) {
        setError(`Failed to save profile: ${error.message}`);
      } else {
        setError('Failed to save profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Complete Your Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">I am a *</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'client' | 'lawyer' })}
              disabled={loading}
            >
              <option value="client">Looking for a Lawyer</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>

          {formData.role === 'lawyer' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization *</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  disabled={loading}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Location *</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm; 