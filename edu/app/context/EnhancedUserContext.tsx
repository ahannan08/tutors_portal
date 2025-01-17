import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-expo';

// Define types for additional user data
interface EnhancedUserData {
  // Clerk data
  clerkId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  
  // Additional custom data
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    // Add more preferences as needed
  };
  // Add any other custom fields you need
}

interface EnhancedUserContextType {
  enhancedUser: EnhancedUserData | null;
  updateUserPreferences: (preferences: any) => void;
  // Add other methods as needed
}

const EnhancedUserContext = createContext<EnhancedUserContextType | undefined>(undefined);

export function EnhancedUserProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const [enhancedUser, setEnhancedUser] = useState<EnhancedUserData | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      // Set initial user data from Clerk
      setEnhancedUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || null,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.imageUrl,
        preferences: {
          theme: 'light',
          notifications: true,
        }
      });

      // Here you could also fetch additional user data from your backend
      // fetchAdditionalUserData(user.id);
    } else {
      setEnhancedUser(null);
    }
  }, [user, isLoaded]);

  const updateUserPreferences = (newPreferences: any) => {
    setEnhancedUser(prev => prev ? {
      ...prev,
      preferences: {
        ...prev.preferences,
        ...newPreferences
      }
    } : null);
  };

  return (
    <EnhancedUserContext.Provider value={{ 
      enhancedUser, 
      updateUserPreferences 
    }}>
      {children}
    </EnhancedUserContext.Provider>
  );
}

// Custom hook to use the enhanced user context
export const useEnhancedUser = () => {
  const context = useContext(EnhancedUserContext);
  if (context === undefined) {
    throw new Error('useEnhancedUser must be used within an EnhancedUserProvider');
  }
  return context;
}; 