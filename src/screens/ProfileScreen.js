import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Theshan Geeth');
  const [address, setAddress] = useState('Matara, Sri Lanka');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditNow = () => {
    if (isEditing) {
      Alert.alert('Saved', 'Your profile information has been saved.');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF6F5" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Pink / Blush Profile Section */}
        <View style={styles.topProfileSection}>
          <View style={styles.logoHeaderRow}>
            <View style={styles.logoContainer}>
              <View style={styles.bagIconWrapper}>
                <Ionicons name="bag-handle" size={18} color="#FF7A38" />
              </View>
              <Text style={styles.logoText}>ShopEase</Text>
            </View>
          </View>

          <View style={styles.avatarCircleContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' }}
              style={styles.avatarImage}
            />
            <TouchableOpacity style={styles.plusBadge} activeOpacity={0.8}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userLocation}>{address}</Text>
        </View>

        {/* Bottom Form Fields Section */}
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Name :</Text>
          <TextInput
            style={styles.fieldInput}
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />

          <Text style={styles.fieldLabel}>Address :</Text>
          <TextInput
            style={styles.fieldInput}
            value={address}
            onChangeText={setAddress}
            editable={isEditing}
          />

          <Text style={styles.fieldLabel}>Email :</Text>
          <TextInput
            style={styles.fieldInput}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            keyboardType="email-address"
          />

          <Text style={styles.fieldLabel}>Phone :</Text>
          <TextInput
            style={styles.fieldInput}
            value={phone}
            onChangeText={setPhone}
            editable={isEditing}
            keyboardType="phone-pad"
          />

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.editNowButton}
              onPress={handleEditNow}
              activeOpacity={0.85}
            >
              <Text style={styles.editNowText}>
                {isEditing ? 'Save Now' : 'Edit Now'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topProfileSection: {
    backgroundColor: '#FFF6F5',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  logoHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    justify: 'flex-end',
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  bagIconWrapper: {
    width: 22,
    height: 22,
    justify: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  avatarCircleContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FF6F61',
    justify: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 12,
  },
  avatarImage: {
    width: 138,
    height: 138,
    borderRadius: 69,
  },
  plusBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justify: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 6,
  },
  userLocation: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 4,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: '#F0F6FF',
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 14,
  },
  editNowButton: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#FF6F61',
    borderRadius: 14,
    justify: 'center',
    alignItems: 'center',
  },
  editNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    includeFontPadding: false,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    justify: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default ProfileScreen;
