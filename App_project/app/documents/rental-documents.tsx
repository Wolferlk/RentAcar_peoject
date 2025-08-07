import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function RentalDocumentsScreen() {
  const router = useRouter();

  const [documents, setDocuments] = useState({
    identityProof: null, // National ID or Passport
    drivingLicense: null,
  });

  const pickDocument = async (type) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Please allow access to your gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedImage = result.assets[0];
      setDocuments({ ...documents, [type]: selectedImage.uri });
    }
  };

  const handleSubmit = () => {
    if (!documents.identityProof || !documents.drivingLicense) {
      Alert.alert('Upload Required', 'Please upload both Identity Proof and Driving License.');
      return;
    }

    Alert.alert('Success', 'Documents uploaded successfully.');
    router.back();
  };

  const renderUploadBox = (label, field) => (
    <View style={styles.uploadCard}>
      <Text style={styles.label}>{label}</Text>
      {documents[field] ? (
        <Image source={{ uri: documents[field] }} style={styles.previewImage} />
      ) : (
        <TouchableOpacity onPress={() => pickDocument(field)} style={styles.uploadArea}>
          <Text style={styles.uploadAreaText}>+ Upload {label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Verify Your Identity</Text>
      <Text style={styles.screenSubtitle}>
        Upload the required documents to complete your profile
      </Text>

      {renderUploadBox('National ID or Passport', 'identityProof')}
      {renderUploadBox('Driving License', 'drivingLicense')}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e1e1e',
    textAlign: 'center',
    marginTop: 20,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 30,
  },
  uploadCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  uploadArea: {
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  uploadAreaText: {
    color: '#777',
    fontSize: 14,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#34d399',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
