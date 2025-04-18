import React, { useState } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth } from '../firebase';

const TestDatabase = () => {
  const [testData, setTestData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createTestProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      const db = getDatabase();
      const testProfile = {
        name: 'Test User',
        phone: '+1234567890',
        role: 'lawyer',
        specialization: 'Test Law',
        experience: '5 years',
        location: 'Test City',
        email: user.email,
        createdAt: new Date().toISOString()
      };

      await set(ref(db, `users/${user.uid}`), testProfile);
      setError(null);
      alert('Test profile created successfully!');
    } catch (err) {
      setError(`Error creating test profile: ${err}`);
      console.error(err);
    }
  };

  const readTestProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      const db = getDatabase();
      const snapshot = await get(ref(db, `users/${user.uid}`));
      
      if (snapshot.exists()) {
        setTestData(snapshot.val());
        setError(null);
      } else {
        setError('No profile found');
      }
    } catch (err) {
      setError(`Error reading profile: ${err}`);
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Database Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={createTestProfile}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Test Profile
        </button>

        <button
          onClick={readTestProfile}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Read Profile
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {testData && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Profile Data:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(testData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDatabase; 