import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../shared/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';

// Initialize WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  // Initialize Google OAuth
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // Handle Google Sign In
  const onGoogleSignIn = async () => {
    try {
      const result = await startOAuthFlow();
      
      if (result && result.createdSessionId && result.setActive) {
        await result.setActive({ session: result.createdSessionId });
      } else {
        console.log("Failed to sign in");
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/edu.jpg')}
      />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Academy</Text>
        <Text style={styles.loginText}>Login/Sign Up</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={onGoogleSignIn}
        >
          <AntDesign name="google" size={24} color={colors.white} style={styles.icon} />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 18,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});