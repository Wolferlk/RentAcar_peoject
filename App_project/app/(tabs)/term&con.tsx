import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsAndConditionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
        <Text style={styles.headerSubtitle}>
          Please read these terms carefully before using our car rental services
        </Text>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>1. Rental Agreement</Text>
          <Text style={styles.sectionText}>
            By renting a vehicle from AAA, you agree to be bound by these terms and conditions. The rental agreement begins when you take possession of the vehicle and ends when you return it to our designated location.
          </Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>2. Driver Requirements</Text>
          <Text style={styles.sectionText}>
            To rent a vehicle, you must:{'\n'}
            • Be at least 21 years old (25 for premium vehicles){'\n'}
            • Hold a valid driver’s license for at least 3 years{'\n'}
            • Provide a valid credit card for payment{'\n'}
            • Present valid identification
          </Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>3. Vehicle Use and Restrictions</Text>
          <Text style={styles.sectionText}>
            The rented vehicle must be used in accordance with the following:{'\n'}
            • Only authorized drivers may operate the vehicle{'\n'}
            • No smoking or pets allowed in the vehicle{'\n'}
            • Vehicle cannot be used for commercial purposes{'\n'}
            • Off-road driving is prohibited{'\n'}
            • Racing or reckless driving is strictly forbidden
          </Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>4. Payment and Fees</Text>
          <Text style={styles.sectionText}>
            Rental fees include:{'\n'}
            • Base rate for the agreed period{'\n'}
            • Applicable taxes and surcharges{'\n'}
            • Additional fees for extra services
            {'\n'}Late return fees apply after the grace period. Fuel charges apply if the vehicle is not returned with the same fuel level.
          </Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>5. Insurance and Liability</Text>
          <Text style={styles.sectionText}>
            Basic insurance coverage is included with every rental. Additional coverage options are available. You are responsible for any damage to the vehicle not covered by insurance, including but not limited to interior damage, key replacement, and towing costs.
          </Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>6. Cancellation Policy</Text>
          <Text style={styles.sectionText}>
            Reservation can be cancelled up to 24 hours before the rental start time without penalty. Cancelling within 24 hours may incur a cancellation fee. No-shows will be charged the full rental amount.
          </Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>7. Contact Information</Text>
          <Text style={styles.sectionText}>
            For questions regarding these terms or your rental, please contact us at:{'\n'}
            Email: support@gmail.com{'\n'}
            Phone: 012-1236587{'\n'}
            Hours: 24/7 Customer Support
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2471F2',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#1D1D1F',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 13,
    color: '#1D1D1F',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
}); 