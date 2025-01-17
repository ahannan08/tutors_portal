import { View, Text, Image, StyleSheet, Button, Modal } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import tutorsData from '../data/tutorsData'; // Adjust the import path based on your file structure
import { Calendar } from 'react-native-calendars'; // Import the Calendar component

const TutorProfile = () => {
  const params = useLocalSearchParams();
  const tutorId = params.tutorId;

  const tutor = tutorsData.find(t => t.id === Number(tutorId));

  if (!tutor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tutor not found</Text>
      </View>
    );
  }

  // State for modal visibility and selected date
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ day: string; month: string; year: string } | undefined>(undefined);

  const onDayPress = (day: { dateString: string; year: number; month: number; day: number }) => {
    setSelectedDate({
      day: day.day.toString(),
      month: day.month.toString(),
      year: day.year.toString(),
    });
  };

  const handleConfirmBooking = () => {
    // Logic to handle booking confirmation
    console.log('Booking confirmed for:', selectedDate);
    setModalVisible(false); // Close the modal after confirming
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={tutor.image} style={styles.image} />
        <Text style={styles.name}>{tutor.name}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Subject:</Text>
          <Text style={styles.value}>{tutor.subject}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Experience:</Text>
          <Text style={styles.value}>{tutor.yearsOfExperience} years</Text>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          {tutor.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>
      </View>

      <Button title="Book Me" onPress={() => setModalVisible(true)} />

      {/* Modal for Calendar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Date for Booking</Text>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}` : '']: { selected: true, marked: true, selectedColor: 'blue' },
              }}
            />
            <Button
              title="Confirm Booking"
              onPress={handleConfirmBooking}
              disabled={!selectedDate} // Disable button if no date is selected
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  infoSection: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    width: 100,
  },
  value: {
    fontSize: 16,
    color: '#212529',
    flex: 1,
  },
  achievementsSection: {
    marginTop: 20,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#495057',
  },
  achievementText: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
});

export default TutorProfile;