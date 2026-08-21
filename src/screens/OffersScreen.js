import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const OffersScreen = ({ navigation }) => {
  const handleAcceptOffer = (offerTitle) => {
    Alert.alert('Offer Claimed 🎉', `${offerTitle} has been applied to your account!`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={26} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.bagIconWrapper}>
            <Ionicons name="bag-handle" size={18} color="#FF7A38" />
          </View>
          <Text style={styles.logoText}>ShopEase</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Available Offers</Text>
        <Text style={styles.pageSubtext}>
          Get new Offers , Available all the new offers And Enjoy
        </Text>

        {/* Offer Card 1: Orange Free Delivery */}
        <View style={styles.offerCardOrange}>
          <View style={styles.offerTextCol}>
            <Text style={styles.offerTitle}>Free delivery</Text>
            <Text style={styles.offerSubtitle}>for</Text>
            <Text style={styles.offerHighlight}>First Item</Text>
          </View>

          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80' }}
            style={styles.giftImage}
          />

          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => handleAcceptOffer('Free delivery for First Item')}
            activeOpacity={0.85}
          >
            <Text style={styles.acceptBtnText}>Accept Now</Text>
          </TouchableOpacity>
        </View>

        {/* Offer Card 2: Light Sage Green Free Product */}
        <View style={styles.offerCardGreen}>
          <View style={styles.offerTextCol}>
            <Text style={styles.greenOfferTitle}>First Product</Text>
            <Text style={styles.greenOfferTitle}>Free</Text>
          </View>

          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80' }}
            style={styles.freeTagImage}
          />

          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => handleAcceptOffer('First Product Free')}
            activeOpacity={0.85}
          >
            <Text style={styles.acceptBtnText}>Accept Now</Text>
          </TouchableOpacity>
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  closeBtn: {
    padding: 4,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  pageSubtext: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 20,
  },
  offerCardOrange: {
    width: '100%',
    height: 160,
    backgroundColor: '#FF7A38',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 16,
    position: 'relative',
  },
  offerTextCol: {
    flexDirection: 'column',
  },
  offerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 26,
  },
  offerSubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  offerHighlight: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
  },
  giftImage: {
    width: 76,
    height: 76,
    borderRadius: 14,
  },
  offerCardGreen: {
    width: '100%',
    height: 160,
    backgroundColor: '#D9E5D6',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginBottom: 16,
    position: 'relative',
  },
  greenOfferTitle: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
  },
  freeTagImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  acceptBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#0B132B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default OffersScreen;
