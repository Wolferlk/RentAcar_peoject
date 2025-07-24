import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Checkbox, RadioButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const optionsList = [
  'Cleanliness',
  'Comfort',
  'Condition / Maintenance',
  'Reliable / No issues',
];

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});
  const [comments, setComments] = useState('');
  const [wouldRentAgain, setWouldRentAgain] = useState('');

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert(
        'Rating Required',
        'Please rate the vehicle before submitting.'
      );
      return;
    }

    const improvements = Object.keys(selectedOptions).filter(
      (key) => selectedOptions[key]
    );

    const feedback = {
      rating,
      wouldRentAgain,
      improvements,
      comments,
    };

    console.log('Feedback submitted:', feedback);
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    // Reset form
    setRating(0);
    setSelectedOptions({});
    setComments('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <MaterialCommunityIcons name="car" size={48} color="#007aff" />
        <Text style={styles.header}>Feedback</Text>
        <Text style={styles.subHeader}>How would you rate this vehicle?</Text>

        {/* Star Rating */}
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((num) => (
            <MaterialCommunityIcons
              key={num}
              name={rating >= num ? 'star' : 'star-outline'}
              size={32}
              color="#facc15"
              onPress={() => setRating(num)}
              style={{ marginHorizontal: 4 }}
            />
          ))}
        </View>

        {/* Checkboxes */}
        <Text style={styles.label}>Let us know what could be improved.</Text>
        {optionsList.map((option) => (
          <View key={option} style={styles.checkboxContainer}>
            <Checkbox
              status={selectedOptions[option] ? 'checked' : 'unchecked'}
              onPress={() => toggleOption(option)}
              color="#007aff"
            />
            <Text style={styles.checkboxLabel}>{option}</Text>
          </View>
        ))}

        {/* Radio Buttons */}
        <View style={styles.radioGroupWrapper}>
          <Text style={styles.label}>Would you rent this vehicle again?</Text>
          <RadioButton.Group
            onValueChange={(value) => setWouldRentAgain(value)}
            value={wouldRentAgain}
          >
            <View style={styles.radioItem}>
              <RadioButton value="yes" color="#007aff" />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="no" color="#007aff" />
              <Text style={styles.radioLabel}>No</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="not_sure" color="#007aff" />
              <Text style={styles.radioLabel}>Not sure</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Text Input */}
        <Text style={styles.label}>Anything else?</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Tell us everything."
          value={comments}
          onChangeText={setComments}
        />

        {/* Submit Button */}
        <Button
          mode="contained"
          buttonColor="#007AFF"
          textColor="#FFF"
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FeedbackForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
    color: '#111',
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginVertical: 12,
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#111',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '100%',
    height: 100,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    fontSize: 15,
    marginBottom: 20,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioLabel: {
    fontSize: 15,
    color: '#333',
  },
  radioGroupWrapper: {
    alignSelf: 'flex-start',
    width: '100%',
  },
});
