import { ClerkProvider } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { EnhancedUserProvider } from './context/EnhancedUserContext';
const CLERK_PUBLISHABLE_KEY = 'pk_test_bG92ZWQtYWtpdGEtOTUuY2xlcmsuYWNjb3VudHMuZGV2JA'

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!}>
      <EnhancedUserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </EnhancedUserProvider>
    </ClerkProvider>
  );
}
  
