import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

const ProductCard = ({ image, name, price, rating, bgColor, onPress, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bgColor || '#E8E5FF' }]}
      activeOpacity={0.88}
      onPress={onPress}
    >
      {/* Top Left Wishlist Heart */}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => setIsLiked(!isLiked)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={18}
          color="#0F172A"
        />
      </TouchableOpacity>

      {/* Center Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            ${typeof price === 'number' ? price.toFixed(2) : price}
          </Text>

          {onAddToCart && (
            <TouchableOpacity
              style={styles.cartButton}
              onPress={onAddToCart}
              activeOpacity={0.75}
            >
              <Ionicons name="cart-outline" size={18} color="#0F172A" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    height: 250,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 4,
  },
  imageWrapper: {
    width: '100%',
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 'auto',
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 16,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
