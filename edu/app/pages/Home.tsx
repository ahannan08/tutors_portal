import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { useEnhancedUser } from '../context/EnhancedUserContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CarouselComp from '../components/Carousel';
import Tutor from '../components/Tutor';
import tutorsData from '../data/tutorsData';

export default function Home() {
  const { signOut } = useAuth();
  const { enhancedUser } = useEnhancedUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const groupedTutors = tutorsData.reduce((acc, tutor) => {
    if (!acc[tutor.subject]) {
      acc[tutor.subject] = [];
    }
    acc[tutor.subject].push(tutor);
    return acc;
  }, {} as Record<string, typeof tutorsData>);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Header/>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search courses..."
        />
        <CarouselComp/>
      </View>

      <Text style={styles.title}>Tutors</Text>
      {Object.keys(groupedTutors).map((subject) => (
        <View key={subject} style={styles.subjectContainer}>
          <Text style={styles.subjectTitle}>{subject}</Text>
          <View style={styles.tutorsContainer}>
          {groupedTutors[subject].map((tutor) => (
          <Tutor 
              key={tutor.id}
              id={tutor.id}  // Add this line
              name={tutor.name} 
              image={tutor.image} 
              subject={tutor.subject} 
              yearsOfExperience={tutor.yearsOfExperience} 
              achievements={tutor.achievements} 
            />
          ))} 
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectContainer: {
    marginBottom: 20,
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tutorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
  },
});