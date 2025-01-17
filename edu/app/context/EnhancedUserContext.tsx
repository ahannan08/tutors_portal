// context/EnhancedUserContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useRouter } from 'expo-router';

interface EnhancedUserData {
  clerkId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role?: 'tutor' | 'student' | null;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

interface EnhancedUserContextType {
  enhancedUser: EnhancedUserData | null;
  updateUserRole: (role: 'tutor' | 'student') => Promise<void>;
  isLoading: boolean;
}

const EnhancedUserContext = createContext<EnhancedUserContextType | undefined>(undefined);

export function EnhancedUserProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [enhancedUser, setEnhancedUser] = useState<EnhancedUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function handleUserAuth() {
      if (!isClerkLoaded || !user) {
        console.log('🔄 No user or Clerk still loading');
        setIsLoading(false);
        setEnhancedUser(null);
        return;
      }

      console.log('👤 Clerk user loaded:', user.id);

      try {
        // Check if user exists in Firestore
        const userDocRef = doc(db, 'users', user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          console.log('📚 User exists in Firestore:', userDoc.data());
          const userData = userDoc.data() as EnhancedUserData;
          
          if (isMounted) {
            setEnhancedUser(userData);
            setIsLoading(false);
          }

          if (userData.role) {
            console.log('🎭 User role found:', userData.role);
            router.push('/pages/Home');
          } else {
            console.log('❓ No role found, redirecting to role selection');
            router.push('/pages/Role');
          }
        } else {
          console.log('🆕 Creating new user document in Firestore');
          const newUserData: EnhancedUserData = {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || null,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.imageUrl,
            role: null,
            preferences: {
              theme: 'light',
              notifications: true,
            }
          };

          await setDoc(userDocRef, newUserData);
          console.log('✅ New user document created');
          
          if (isMounted) {
            setEnhancedUser(newUserData);
            setIsLoading(false);
          }
          
          console.log('🔄 Redirecting to role selection');
          router.push('/pages/Role');
        }
      } catch (error) {
        console.error('❌ Error in auth flow:', error);
        setIsLoading(false);
      }
    }

    handleUserAuth();

    return () => {
      isMounted = false;
    };
  }, [user, isClerkLoaded]);

  const updateUserRole = async (role: 'tutor' | 'student') => {
    if (!user?.id || !enhancedUser) {
      console.error('❌ No user found when updating role');
      return;
    }

    try {
      console.log('🔄 Updating user role to:', role);
      const userDocRef = doc(db, 'users', user.id);
      
      const updatedUserData = {
        ...enhancedUser,
        role
      };

      await setDoc(userDocRef, updatedUserData, { merge: true });
      console.log('✅ Role updated successfully');
      
      setEnhancedUser(updatedUserData);
      router.push('/pages/Home');
    } catch (error) {
      console.error('❌ Error updating role:', error);
      throw error;
    }
  };

  return (
    <EnhancedUserContext.Provider value={{ 
      enhancedUser, 
      updateUserRole,
      isLoading 
    }}>
      {children}
    </EnhancedUserContext.Provider>
  );
}

export const useEnhancedUser = () => {
  const context = useContext(EnhancedUserContext);
  if (context === undefined) {
    throw new Error('useEnhancedUser must be used within an EnhancedUserProvider');
  }
  return context;
};