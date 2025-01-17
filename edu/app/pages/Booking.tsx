import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Make sure to install this package

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirmBooking = () => {
    // Logic to handle booking confirmation
    console.log('Booking confirmed for:', selectedDate);
    // You can add further logic to send the booking request to the tutor
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date for Booking</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate || '']: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      <Button
        title="Confirm Booking"
        onPress={handleConfirmBooking}
        disabled={!selectedDate} // Disable button if no date is selected
      />
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
});

export default Booking; 