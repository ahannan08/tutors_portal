// screens/Role.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useEnhancedUser } from '../context/EnhancedUserContext';
import { useRouter } from 'expo-router';

export default function Role() {
  const { updateUserRole } = useEnhancedUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRoleSelection = async (role: 'tutor' | 'student') => {
    try {
      console.log('🎭 Starting role selection process for:', role);
      setIsSubmitting(true);

      await updateUserRole(role);
      
      console.log('✅ Role updated successfully, redirecting to home');
      router.push('/pages/Home');
    } catch (error) {
      console.error('❌ Error selecting role:', error);
      Alert.alert('Error', 'Failed to set role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Setting up your account...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Select how you want to use the app</Text>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection('tutor')}
        disabled={isSubmitting}
      >
        <Text style={styles.roleButtonText}>I want to be a Tutor</Text>
        <Text style={styles.roleDescription}>Teach and help others learn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection('student')}
        disabled={isSubmitting}
      >
        <Text style={styles.roleButtonText}>I want to be a Student</Text>
        <Text style={styles.roleDescription}>Find tutors and learn</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  roleButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  roleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});