import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


interface TutorProps {
    id: number;  // Add id to props
    name: string;
    image: any;
    subject: string;
    yearsOfExperience: number;
    achievements: string[];
  }
const Tutor: React.FC<TutorProps> = ({ id, name, image, subject, yearsOfExperience, achievements }) => {
    const router = useRouter();

  const handlePress = () => {
    router.push({
        pathname: '/pages/TutorProfile',
        params: { tutorId: id }
      });
    };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tutor; 