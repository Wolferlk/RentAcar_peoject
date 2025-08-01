import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const pastBookings = [
  {
    id: '1',
    car: 'Toyota Camry',
    date: '2024-06-10',
    price: 120,
    status: 'Completed',
  },
  {
    id: '2',
    car: 'Honda Civic',
    date: '2024-05-22',
    price: 90,
    status: 'Completed',
  },
  // Add more mock bookings as needed
];

export default function ViewPastBooking() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Bookings</Text>
      <FlatList
        data={pastBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <Text style={styles.car}>{item.car}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No past bookings found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  car: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
});
