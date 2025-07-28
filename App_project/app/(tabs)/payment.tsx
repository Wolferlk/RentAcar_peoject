import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function CustomCheckBox({ value, onValueChange }: { value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <TouchableOpacity
      style={[styles.checkboxBase, value && styles.checkboxChecked]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      {value && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );
}

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [marketing, setMarketing] = useState(false);
  const [terms, setTerms] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Lucas</Text>
          <View style={styles.avatar} />
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Please enter your payment method</Text>
          <View style={styles.radioRow}>
            <View style={styles.radioCircle} />
            <Text style={styles.radioLabel}>Credit Card</Text>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }} style={styles.cardLogo} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' }} style={styles.cardLogo} />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Card number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              placeholderTextColor="#B0B3B9"
            />
            <TextInput
              style={styles.input}
              placeholder="Card holder"
              value={cardHolder}
              onChangeText={setCardHolder}
              placeholderTextColor="#B0B3B9"
            />
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="DD/MM/YY"
                value={expiration}
                onChangeText={setExpiration}
                placeholderTextColor="#B0B3B9"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="CVC"
                value={cvc}
                onChangeText={setCvc}
                keyboardType="numeric"
                placeholderTextColor="#B0B3B9"
              />
            </View>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Confirmation</Text>
          </View>
          <Text style={styles.sectionSubtitle}>We are getting to the end. Just a few clicks and your rental is ready!</Text>
          <View style={styles.checkboxRow}>
            <CustomCheckBox value={marketing} onValueChange={setMarketing} />
            <Text style={styles.checkboxLabel}>I agree with sending Marketing and newsletter emails. No spam, promised!</Text>
          </View>
          <View style={styles.checkboxRow}>
            <CustomCheckBox value={terms} onValueChange={setTerms} />
            <Text style={styles.checkboxLabel}>I agree with our terms and conditions and privacy policy</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.safeSection}>
          <Text style={styles.safeTitle}>All your data are safe</Text>
          <Text style={styles.safeSubtitle}>We use the most advanced security to provide you the best experience ever.</Text>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#2471F2',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D9D9D9',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#1D1D1F',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#2471F2',
    marginRight: 8,
    backgroundColor: '#2471F2',
  },
  radioLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginRight: 8,
  },
  cardLogo: {
    width: 32,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  inputGroup: {
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F1F3F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1D1D1F',
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2471F2',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2471F2',
    borderColor: '#2471F2',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#1D1D1F',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
    flex: 1,
  },
  button: {
    backgroundColor: '#2471F2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  safeSection: {
    alignItems: 'center',
    marginTop: 18,
  },
  safeTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  safeSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
}); 