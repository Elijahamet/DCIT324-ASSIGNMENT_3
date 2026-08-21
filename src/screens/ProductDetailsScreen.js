import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(2);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found!</Text>
        <TouchableOpacity style={styles.backButtonSimple} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart 🛒',
      `${quantity}x ${product.name} added to your shopping cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.navigate('CartTab') }
      ]
    );
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigation.navigate('CartTab');
  };

  const colorOptions = [
    { name: 'Black', image: product.image },
    {
      name: 'Grey',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.bagIconWrapper}>
            <Ionicons name="bag-handle" size={18} color="#FF7A38" />
          </View>
          <Text style={styles.logoText}>ShopEase</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Product Banner */}
        <View style={[styles.productBanner, { backgroundColor: product.bgColor || '#D2F5D0' }]}>
          {/* Discount Badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>10%</Text>
            <Text style={styles.discountSubtext}>Off</Text>
          </View>

          {/* Product Image */}
          <Image
            source={{ uri: colorOptions[selectedColorIndex].image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Carousel Pagination Dots */}
        <View style={styles.paginationRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Details Section */}
        <View style={styles.detailsBody}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productSubtitle}>White/Black</Text>

          {/* Price Pill */}
          <View style={styles.pricePill}>
            <Text style={styles.pricePillText}>${product.price?.toFixed(2)}</Text>
          </View>

          {/* Color Options */}
          <Text style={styles.sectionLabel}>Available Options</Text>
          <View style={styles.optionsRow}>
            {colorOptions.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionCard,
                  selectedColorIndex === idx && styles.optionCardSelected
                ]}
                onPress={() => setSelectedColorIndex(idx)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: opt.image }} style={styles.optionImage} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.squareQtyBtn}
              onPress={handleIncrease}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{quantity}</Text>

            <TouchableOpacity
              style={[styles.squareQtyBtn, quantity <= 1 && styles.squareQtyBtnDisabled]}
              onPress={handleDecrease}
              disabled={quantity <= 1}
              activeOpacity={0.8}
            >
              <Ionicons name="remove" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.buyNowBtn}
              onPress={handleBuyNow}
              activeOpacity={0.85}
            >
              <Text style={styles.buyNowText}>Buy now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addToCartOutlineBtn}
              onPress={handleAddToCart}
              activeOpacity={0.85}
            >
              <Text style={styles.addToCartOutlineText}>Add to cart</Text>
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
  errorText: {
    fontSize: 18,
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 40,
  },
  backButtonSimple: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#52D160',
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
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
    paddingBottom: 40,
  },
  productBanner: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginTop: 8,
    position: 'relative',
    justify: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#0F172A',
    justify: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  discountSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    backgroundColor: '#3B82F6',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  detailsBody: {
    marginTop: 4,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 28,
  },
  productSubtitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
    marginBottom: 12,
  },
  pricePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#52D160',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  pricePillText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  optionCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    justify: 'center',
    alignItems: 'center',
  },
  optionCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  squareQtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    justify: 'center',
    alignItems: 'center',
  },
  squareQtyBtnDisabled: {
    backgroundColor: '#64748B',
  },
  qtyText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    minWidth: 20,
    textAlign: 'center',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  buyNowBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#52D160',
    borderRadius: 14,
    justify: 'center',
    alignItems: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  addToCartOutlineBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#52D160',
    justify: 'center',
    alignItems: 'center',
  },
  addToCartOutlineText: {
    color: '#52D160',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default ProductDetailsScreen;
