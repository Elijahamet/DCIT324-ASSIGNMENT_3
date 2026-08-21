import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCTS } from '../data/products';

const FavouritesScreen = ({ navigation }) => {
  const favoriteProducts = PRODUCTS.slice(0, 2); // Sample favorite products matching screenshot

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.favCard, { backgroundColor: item.bgColor || '#E8E5FF' }]}
      activeOpacity={0.88}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.favImage} resizeMode="contain" />

      <View style={styles.favInfo}>
        <Text style={styles.favTitle}>{item.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.favPrice}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.heartCircle}>
        <Ionicons name="heart" size={18} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF8A73" />

      {/* Top Wave Header */}
      <View style={styles.headerWaveContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={26} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={styles.bagIconWrapper}>
              <Ionicons name="bag-handle" size={16} color="#FF7A38" />
            </View>
            <Text style={styles.logoText}>ShopEase</Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>Favourites</Text>
      </View>

      <FlatList
        data={favoriteProducts}
        keyExtractor={item => item.id}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerWaveContainer: {
    backgroundColor: '#FF8A73',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  closeBtn: {
    padding: 4,
  },
  logoContainer: {
    alignItems: 'center',
  },
  bagIconWrapper: {
    width: 20,
    height: 20,
    justify: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
    gap: 16,
  },
  favCard: {
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    position: 'relative',
  },
  favImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  favInfo: {
    flex: 1,
  },
  favTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginBottom: 8,
  },
  favPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  heartCircle: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF2E2E',
    justify: 'center',
    alignItems: 'center',
  },
});

export default FavouritesScreen;
