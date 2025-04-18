import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { auth, googleProvider } from '../firebase';
import SignUpForm from '../components/SignUpForm';

interface UserProfile {
  name: string;
  phone: string;
  role: 'client' | 'lawyer';
  specialization?: string;
  experience?: string;
  location: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  showSignUpForm: boolean;
  setShowSignUpForm: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  showSignUpForm: false,
  setShowSignUpForm: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user has completed their profile
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          setUserProfile(snapshot.val());
          setShowSignUpForm(false);
        } else {
          setShowSignUpForm(true);
        }
      } else {
        setUserProfile(null);
        setShowSignUpForm(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      signInWithGoogle, 
      signOut,
      showSignUpForm,
      setShowSignUpForm
    }}>
      {children}
      {showSignUpForm && user && (
        <SignUpForm onClose={() => setShowSignUpForm(false)} />
      )}
    </AuthContext.Provider>
  );
}; 