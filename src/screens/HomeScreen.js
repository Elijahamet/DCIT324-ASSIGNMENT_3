import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { addToCart, cartCount } = useCart();

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleQuickAdd = (product) => {
    addToCart(product, 1);
    Alert.alert('Added to Cart 🛒', `${product.name} has been added.`);
  };

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topProducts = filteredProducts.slice(0, 4);
  const bottomProducts = filteredProducts.slice(4);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. Header Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowDrawer(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="menu-outline" size={26} color="#0F172A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => navigation.navigate('HomeTab')}
          activeOpacity={0.8}
        >
          <View style={styles.bagIconWrapper}>
            <Ionicons name="bag-handle" size={18} color="#FF7A38" />
          </View>
          <Text style={styles.logoText}>ShopEase</Text>
        </TouchableOpacity>
      </View>

      {/* Main List Scrollable */}
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            {/* 2. Hero Dark Banner */}
            <View style={styles.heroBanner}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
                }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.heroTextOverlay}>
                <Text style={styles.heroSubtext}>New Release</Text>
                <Text style={styles.heroTitle}>OLEVS 5 V13"</Text>
              </View>
            </View>

            {/* 3. Filter / Search Bar Row */}
            <View style={styles.filterRow}>
              <TouchableOpacity style={styles.filterPill} activeOpacity={0.8}>
                <Text style={styles.filterPillText}>Sort By</Text>
                <Ionicons name="chevron-down" size={14} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterPill} activeOpacity={0.8}>
                <Text style={styles.filterPillText}>Filter</Text>
                <Ionicons name="options-outline" size={14} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cartPill}
                onPress={() => navigation.navigate('CartTab')}
                activeOpacity={0.8}
              >
                <Ionicons name="cart" size={18} color="#FFFFFF" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.searchPill}
                onPress={() => setShowSearchModal(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="search" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Search Input Bar */}
            {searchQuery.length > 0 && (
              <View style={styles.searchBarActive}>
                <Ionicons name="search-outline" size={18} color="#64748B" />
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search products..."
                />
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            )}

            {/* 4. Top Grid */}
            <View style={styles.gridContainer}>
              {topProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  bgColor={item.bgColor}
                  onPress={() => handleProductPress(item)}
                  onAddToCart={() => handleQuickAdd(item)}
                />
              ))}
            </View>

            {/* 5. Orange Free Delivery Banner */}
            <View style={styles.promoBanner}>
              <View style={styles.promoTextContainer}>
                <Text style={styles.promoTitle}>Free delivery</Text>
                <Text style={styles.promoSubtitle}>for</Text>
                <Text style={styles.promoHighlight}>First Item</Text>
              </View>

              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80',
                }}
                style={styles.promoGiftImage}
              />

              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => navigation.navigate('Offers')}
                activeOpacity={0.85}
              >
                <Text style={styles.acceptButtonText}>Accept Now</Text>
              </TouchableOpacity>
            </View>

            {/* 6. Bottom Grid */}
            <View style={styles.gridContainer}>
              {bottomProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  bgColor={item.bgColor}
                  onPress={() => handleProductPress(item)}
                  onAddToCart={() => handleQuickAdd(item)}
                />
              ))}
            </View>
          </View>
        }
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Side Navigation Drawer Modal */}
      <Modal visible={showDrawer} animationType="fade" transparent>
        <View style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <TouchableOpacity onPress={() => setShowDrawer(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.drawerLogoContainer}>
                <Ionicons name="bag-handle" size={28} color="#FF7A38" />
                <Text style={styles.drawerLogoText}>ShopEase</Text>
              </View>
            </View>

            {/* Drawer Menu Links */}
            <View style={styles.menuLinksList}>
              <TouchableOpacity
                style={[styles.drawerMenuItem, styles.drawerMenuItemActive]}
                onPress={() => setShowDrawer(false)}
              >
                <Ionicons name="home-outline" size={22} color="#FFFFFF" />
                <Text style={styles.drawerMenuText}>HOME</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerMenuItem}
                onPress={() => {
                  setShowDrawer(false);
                  navigation.navigate('Favourites');
                }}
              >
                <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
                <Text style={styles.drawerMenuText}>FAVOURITES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerMenuItem}
                onPress={() => {
                  setShowDrawer(false);
                  navigation.navigate('CartTab');
                }}
              >
                <Ionicons name="cart-outline" size={22} color="#FFFFFF" />
                <Text style={styles.drawerMenuText}>CART</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerMenuItem}
                onPress={() => {
                  setShowDrawer(false);
                  navigation.navigate('ProfileTab');
                }}
              >
                <Ionicons name="person-outline" size={22} color="#FFFFFF" />
                <Text style={styles.drawerMenuText}>MY PROFILE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerMenuItem}
                onPress={() => {
                  setShowDrawer(false);
                  navigation.navigate('Offers');
                }}
              >
                <Ionicons name="gift-outline" size={22} color="#FFFFFF" />
                <Text style={styles.drawerMenuText}>MY OFFERS</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Sign Out Pill */}
            <TouchableOpacity
              style={styles.signOutBtn}
              onPress={() => {
                setShowDrawer(false);
                Alert.alert('Signed Out', 'You have been signed out.');
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
              <Text style={styles.signOutText}>SIGN OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Modal */}
      <Modal visible={showSearchModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Search ShopEase</Text>
              <TouchableOpacity onPress={() => setShowSearchModal(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalInputWrapper}>
              <Ionicons name="search" size={20} color="#64748B" />
              <TextInput
                style={styles.modalInput}
                placeholder="Type product name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
            <TouchableOpacity
              style={styles.modalSearchBtn}
              onPress={() => setShowSearchModal(false)}
            >
              <Text style={styles.modalSearchBtnText}>View Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bagIconWrapper: {
    width: 24,
    height: 24,
    justify: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  scrollContainer: {
    paddingBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  heroBanner: {
    width: '100%',
    height: 140,
    backgroundColor: '#0D0F12',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  heroTextOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  heroSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26292E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  filterPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cartPill: {
    backgroundColor: '#FF7A38',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    justify: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#0F172A',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justify: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchPill: {
    backgroundColor: '#0F172A',
    width: 36,
    height: 34,
    borderRadius: 10,
    justify: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  searchBarActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justify: 'space-between',
  },
  promoBanner: {
    width: '100%',
    height: 145,
    backgroundColor: '#FF7A38',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    marginVertical: 14,
    position: 'relative',
  },
  promoTextContainer: {
    flexDirection: 'column',
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 24,
  },
  promoSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  promoHighlight: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 26,
  },
  promoGiftImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  acceptButton: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: '#0B132B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  drawerContainer: {
    width: '68%',
    height: '100%',
    backgroundColor: '#B56565',
    padding: 20,
    justify: 'space-between',
  },
  drawerHeader: {
    marginTop: 20,
  },
  drawerLogoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  drawerLogoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 4,
  },
  menuLinksList: {
    gap: 8,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  drawerMenuItemActive: {
    backgroundColor: '#D85353',
  },
  drawerMenuText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 10,
    backgroundColor: '#D85353',
    height: 48,
    borderRadius: 12,
    marginBottom: 20,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justify: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    marginBottom: 16,
  },
  modalInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  modalSearchBtn: {
    height: 48,
    backgroundColor: '#FF7A38',
    borderRadius: 14,
    justify: 'center',
    alignItems: 'center',
  },
  modalSearchBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default HomeScreen;
