import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Login from '../pages/Login';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import Home from '../pages/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <SignedIn>
      <Home/>
      </SignedIn>
      <SignedOut>
      <Login/>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
