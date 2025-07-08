import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Car,
  Users,
  Shield,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
} from 'react-native-reanimated';

export default function AboutScreen() {
  const handleContactPress = (type: 'email' | 'phone' | 'website') => {
    switch (type) {
      case 'email':
        Linking.openURL('mailto:info@rentacar.com');
        break;
      case 'phone':
        Linking.openURL('tel:+1-555-RENTCAR');
        break;
      case 'website':
        Linking.openURL('https://www.rentacar.com');
        break;
    }
  };

  const FeatureCard = ({ icon: Icon, title, description }: any) => (
    <Animated.View entering={FadeIn.delay(200)} style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Icon size={24} color="#007AFF" />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </Animated.View>
  );

  const StatCard = ({ number, label }: any) => (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeIn}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.title}>About RentACar</Text>
        </Animated.View>

        {/* Hero Section */}
        <Animated.View style={styles.heroSection} entering={FadeIn.delay(100)}>
          <View style={styles.logoContainer}>
            <Car size={60} color="#007AFF" />
          </View>
          <Text style={styles.heroTitle}>RentACar</Text>
          <Text style={styles.heroSubtitle}>Your Trusted Car Rental Partner</Text>
          <Text style={styles.heroDescription}>
            Connecting car owners with renters for seamless, affordable, and convenient transportation solutions.
          </Text>
        </Animated.View>

        {/* Stats */}
        <Animated.View style={styles.statsContainer} entering={FadeIn.delay(200)}>
          <StatCard number="10K+" label="Happy Customers" />
          <StatCard number="5K+" label="Cars Available" />
          <StatCard number="50+" label="Cities" />
          <StatCard number="4.8" label="Average Rating" />
        </Animated.View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose RentACar?</Text>
          
          <View style={styles.featuresGrid}>
            <FeatureCard
              icon={Shield}
              title="Secure & Safe"
              description="All cars are verified and insured for your peace of mind"
            />
            <FeatureCard
              icon={Users}
              title="Community Driven"
              description="Connect with local car owners and build lasting relationships"
            />
            <FeatureCard
              icon={Award}
              title="Quality Assured"
              description="Every car meets our high standards for cleanliness and maintenance"
            />
            <FeatureCard
              icon={Globe}
              title="Wide Coverage"
              description="Available in major cities with expanding coverage nationwide"
            />
          </View>
        </View>

        {/* Mission */}
        <Animated.View style={styles.missionSection} entering={FadeIn.delay(300)}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            At RentACar, we believe transportation should be accessible, affordable, and sustainable. 
            We're building a community where car owners can monetize their vehicles while providing 
            renters with convenient access to quality transportation.
          </Text>
          <Text style={styles.missionText}>
            Our platform empowers individuals to make smart financial decisions while reducing 
            the environmental impact of car ownership through shared mobility solutions.
          </Text>
        </Animated.View>

        {/* Team */}
        <Animated.View style={styles.teamSection} entering={FadeIn.delay(400)}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valuesList}>
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Trust</Text>
              <Text style={styles.valueDescription}>
                Building trust through transparency, verification, and reliable service
              </Text>
            </View>
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Innovation</Text>
              <Text style={styles.valueDescription}>
                Continuously improving our platform with cutting-edge technology
              </Text>
            </View>
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Community</Text>
              <Text style={styles.valueDescription}>
                Fostering connections and supporting local communities
              </Text>
            </View>
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>Sustainability</Text>
              <Text style={styles.valueDescription}>
                Promoting eco-friendly transportation solutions
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Contact */}
        <Animated.View style={styles.contactSection} entering={FadeIn.delay(500)}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContactPress('email')}
          >
            <Mail size={20} color="#007AFF" />
            <Text style={styles.contactText}>info@rentacar.com</Text>
            <ExternalLink size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContactPress('phone')}
          >
            <Phone size={20} color="#007AFF" />
            <Text style={styles.contactText}>+1-555-RENTCAR</Text>
            <ExternalLink size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContactPress('website')}
          >
            <Globe size={20} color="#007AFF" />
            <Text style={styles.contactText}>www.rentacar.com</Text>
            <ExternalLink size={16} color="#8E8E93" />
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <MapPin size={20} color="#007AFF" />
            <Text style={styles.contactText}>San Francisco, CA</Text>
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={styles.footer} entering={FadeIn.delay(600)}>
          <Text style={styles.footerText}>
            © 2024 RentACar. All rights reserved.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1D1D1F',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#007AFF',
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginRight: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1D1D1F',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1D1D1F',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  missionSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  missionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1D1D1F',
    lineHeight: 24,
    marginBottom: 16,
  },
  teamSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  valuesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  valueItem: {
    marginBottom: 20,
  },
  valueTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    lineHeight: 20,
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
});