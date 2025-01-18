// components/Booking.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useUser } from '@clerk/clerk-expo';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../context/firebase';
import { useEnhancedUser } from '../context/EnhancedUserContext';
import { createNotification } from '../helperFunctions/createNotification'; // Import the helper

interface BookingProps {
  tutorId: string | number;
  onBookingComplete?: () => void;
  onClose?: () => void;
}

const Booking: React.FC<BookingProps> = ({ tutorId, onBookingComplete, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { enhancedUser } = useEnhancedUser();

  const onDayPress = (day: DateData) => {
    console.log('Selected date:', day.dateString);
    setSelectedDate(day.dateString);
  };

  const handleConfirmBooking = async () => {
    console.log('Current user:', user);  // Check if user is authenticated
    console.log('Enhanced user:', enhancedUser);

    if (!selectedDate || !user || !enhancedUser) {
      console.log('Missing required data:', {
        selectedDate,
        userId: user?.id,
        enhancedUser
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Creating booking...');
      
      const bookingData = {
        studentId: user.id,
        tutorId: tutorId,
        date: selectedDate,
        status: 'pending',
        createdAt: new Date().toISOString(),
        studentName: `${enhancedUser.firstName} ${enhancedUser.lastName}`,
        studentEmail: enhancedUser.email
      };

      console.log('Auth state:', user.id); // Check auth state
      console.log('Booking data:', bookingData); // Check booking data

      // Save booking to Firestore
      const bookingsCollectionRef = collection(db, 'bookings');
      const newBookingRef = await addDoc(bookingsCollectionRef, bookingData);

      // Send notification to the tutor
      console.log("notification document to be created")
      const message = `The user wants to schedule a session on ${selectedDate}.`;
      await createNotification({
        senderId: user.id,
        recipientId: tutorId,
        message,
        type: 'booking_request'
      });
      console.log("notification document succes")

      console.log('Booking created successfully with ID:', newBookingRef.id);
      setSelectedDate('');
      
      if (onBookingComplete) {
        onBookingComplete();
      }

    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'blue',
          }
        }}
        minDate={new Date().toISOString().split('T')[0]}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Creating Booking..." : "Confirm Booking"}
          onPress={handleConfirmBooking}
          disabled={!selectedDate || isLoading}
        />
        {onClose && (
          <Button
            title="Close"
            onPress={onClose}
            color="gray"
          />
        )}
        {selectedDate && (
          <Text style={styles.selectedDate}>
            Selected: {selectedDate}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  selectedDate: {
    marginTop: 10,
    textAlign: 'center',
    color: 'gray',
  }
});

export default Booking;
