import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart, cartSubtotal, clearCart } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('CART');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [selectedCardType, setSelectedCardType] = useState('VISA');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('2028');
  const [cvn, setCvn] = useState('123');

  const taxAmount = cartSubtotal * 0.1;
  const grandTotal = cartSubtotal + taxAmount;

  const handleConfirmOrderClick = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('METHOD_MODAL');
  };

  const handleProceedToDetails = () => {
    setCheckoutStep('DETAILS_MODAL');
  };

  const handleFinalConfirm = () => {
    setCheckoutStep('SUCCESS');
    clearCart();
  };

  const handleBackToHome = () => {
    setCheckoutStep('CART');
    navigation.navigate('HomeTab');
  };

  const renderCartCard = ({ item }) => {
    const { product, quantity } = item;
    const lineTotal = (product.price * quantity).toFixed(2);

    return (
      <View style={styles.cartCard}>
        <Image source={{ uri: product.image }} style={styles.cardImage} resizeMode="contain" />

        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.unitPrice}>${product.price?.toFixed(2)}</Text>

          <View style={styles.cardDivider} />

          <View style={styles.cardBottomRow}>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.squareQtyBtn}
                onPress={() => updateQuantity(product.id, quantity + 1)}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{quantity}</Text>

              <TouchableOpacity
                style={styles.squareQtyBtn}
                onPress={() => updateQuantity(product.id, quantity - 1)}
                activeOpacity={0.8}
              >
                <Ionicons name="remove" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.lineTotal}>${lineTotal}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.trashBtn}
          onPress={() => removeFromCart(product.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    );
  };

  if (checkoutStep === 'SUCCESS') {
    return (
      <SafeAreaView style={styles.successContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <View style={styles.successBody}>
          <View style={styles.successBadge}>
            <Ionicons name="checkmark" size={64} color="#FFFFFF" />
          </View>

          <Text style={styles.successTitle}>Your payment was successful</Text>
          <Text style={styles.successSubtext}>
            Thank you for your payment. We will be in contact with more details shortly
          </Text>

          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={handleBackToHome}
            activeOpacity={0.85}
          >
            <Text style={styles.backHomeText} numberOfLines={1} adjustsFontSizeToFit>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF8A73" />

      {/* Top Header Wave */}
      <View style={styles.headerWaveContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={28} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={styles.bagIconWrapper}>
              <Ionicons name="bag-handle" size={16} color="#FF7A38" />
            </View>
            <Text style={styles.logoText}>ShopEase</Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>Confirm Order</Text>
      </View>

      {/* Cart Items or Empty State */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={72} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>
            Explore our catalogue and add items to your cart.
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Text style={styles.shopBtnText} numberOfLines={1} adjustsFontSizeToFit>
              Shop Now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.cartList}>
            {cartItems.map((item) => (
              <React.Fragment key={item.product.id}>
                {renderCartCard({ item })}
              </React.Fragment>
            ))}
          </View>

          {/* Payment Summary */}
          <View style={styles.paymentSummarySection}>
            <Text style={styles.paymentTitle}>Payment</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%):</Text>
              <Text style={styles.summaryValue}>${taxAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total :</Text>
              <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.confirmOrderBtn}
              onPress={handleConfirmOrderClick}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmOrderText} numberOfLines={1} adjustsFontSizeToFit>
                Confirm Order
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* MODAL STEP 1: Select Payment Method */}
      <Modal
        visible={checkoutStep === 'METHOD_MODAL'}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.methodModalCard}>
            <Text style={styles.modalTitle}>Select your payment method</Text>

            <TouchableOpacity
              style={[
                styles.methodOption,
                paymentMethod === 'CARD' && styles.methodOptionSelected
              ]}
              onPress={() => setPaymentMethod('CARD')}
              activeOpacity={0.8}
            >
              <View style={styles.methodOptionLeft}>
                <Text style={styles.methodOptionTitle}>Credit /Debit Card</Text>
                <View style={styles.cardIconsRow}>
                  <Text style={styles.cardBrandVisa}>VISA</Text>
                  <Text style={styles.cardBrandMaster}>Mastercard</Text>
                </View>
              </View>
              <Ionicons
                name={paymentMethod === 'CARD' ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={paymentMethod === 'CARD' ? '#EF4444' : '#CBD5E1'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodOption,
                paymentMethod === 'OTHER' && styles.methodOptionSelected
              ]}
              onPress={() => setPaymentMethod('OTHER')}
              activeOpacity={0.8}
            >
              <View style={styles.methodOptionLeft}>
                <Text style={styles.methodOptionTitle}>Other</Text>
                <View style={styles.iPayBadge}>
                  <Text style={styles.iPayText}>iPay</Text>
                </View>
              </View>
              <Ionicons
                name={paymentMethod === 'OTHER' ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={paymentMethod === 'OTHER' ? '#0F172A' : '#CBD5E1'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.proceedBtn}
              onPress={handleProceedToDetails}
              activeOpacity={0.85}
            >
              <Text style={styles.proceedBtnText} numberOfLines={1} adjustsFontSizeToFit>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL STEP 2: Payment Details */}
      <Modal
        visible={checkoutStep === 'DETAILS_MODAL'}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.detailsModalContainer}>
            <View style={styles.detailsCard}>
              <View style={styles.detailsHeaderRow}>
                <Text style={styles.detailsTitle}>Payment Details</Text>
                <Ionicons name="checkmark-circle-outline" size={24} color="#0F172A" />
              </View>

              <View style={styles.detailsDivider} />

              <Text style={styles.inputLabel}>Card Type*</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSelectedCardType('VISA')}
                >
                  <Ionicons
                    name={selectedCardType === 'VISA' ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color="#0F172A"
                  />
                  <View style={styles.miniVisaBox}>
                    <Text style={styles.miniVisaText}>VISA</Text>
                  </View>
                  <Text style={styles.radioText}>Visa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSelectedCardType('MASTER')}
                >
                  <Ionicons
                    name={selectedCardType === 'MASTER' ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color="#0F172A"
                  />
                  <View style={styles.miniMasterBox}>
                    <Text style={styles.miniMasterText}>Mastercard</Text>
                  </View>
                  <Text style={styles.radioText}>Mastercard</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Card Number*</Text>
              <TextInput
                style={styles.grayInput}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
              />

              <View style={styles.expRow}>
                <View style={styles.expCol}>
                  <Text style={styles.inputLabel}>Expiration Month*</Text>
                  <View style={styles.graySelect}>
                    <Text style={styles.graySelectText}>Month ({expMonth})</Text>
                    <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.expCol}>
                  <Text style={styles.inputLabel}>Expiration Year*</Text>
                  <View style={styles.graySelect}>
                    <Text style={styles.graySelectText}>Year ({expYear})</Text>
                    <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </View>

              <Text style={styles.inputLabel}>CVN*</Text>
              <Text style={styles.cvnHint}>
                This code is a three or four digit number printed on the back or front of credit cards
              </Text>
              <TextInput
                style={[styles.grayInput, { width: 100 }]}
                value={cvn}
                onChangeText={setCvn}
                keyboardType="numeric"
                secureTextEntry
              />

              <Text style={styles.yourOrderLabel}>Your Order</Text>
              <View style={styles.pinkOrderBox}>
                <Text style={styles.pinkOrderLabel}>Total amount</Text>
                <Text style={styles.pinkOrderTotal}>${grandTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.modalActionsRow}>
                <TouchableOpacity
                  style={styles.cancelOutlineBtn}
                  onPress={() => setCheckoutStep('CART')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelOutlineText} numberOfLines={1} adjustsFontSizeToFit>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmSolidBtn}
                  onPress={handleFinalConfirm}
                  activeOpacity={0.85}
                >
                  <Text style={styles.confirmSolidText} numberOfLines={1} adjustsFontSizeToFit>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
  backBtn: {
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  cartList: {
    gap: 16,
    marginBottom: 24,
  },
  cartCard: {
    backgroundColor: '#E8E5FF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'relative',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  unitPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 8,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  squareQtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    justify: 'center',
    alignItems: 'center',
  },
  qtyNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  lineTotal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  trashBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  paymentSummarySection: {
    marginTop: 10,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justify: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  confirmOrderBtn: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#FF6F61',
    borderRadius: 14,
    justify: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmOrderText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justify: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: '#FF6F61',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justify: 'flex-end',
  },
  methodModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 16,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  methodOptionSelected: {
    borderColor: '#FF6F61',
    backgroundColor: '#FFF5F5',
  },
  methodOptionLeft: {
    gap: 4,
  },
  methodOptionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardIconsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cardBrandVisa: {
    fontSize: 12,
    fontWeight: '900',
    color: '#2563EB',
  },
  cardBrandMaster: {
    fontSize: 12,
    fontWeight: '900',
    color: '#EF4444',
  },
  iPayBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  iPayText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0284C7',
  },
  proceedBtn: {
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: '#FF6F61',
    borderRadius: 14,
    justify: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  proceedBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  detailsModalContainer: {
    padding: 16,
    justify: 'center',
    flexGrow: 1,
  },
  detailsCard: {
    backgroundColor: '#FFF5EA',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  detailsHeaderRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  detailsDivider: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniVisaBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniVisaText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#2563EB',
  },
  miniMasterBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniMasterText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EF4444',
  },
  radioText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  grayInput: {
    backgroundColor: '#A89F9F',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 12,
  },
  expRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  expCol: {
    flex: 1,
  },
  graySelect: {
    backgroundColor: '#A89F9F',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
  },
  graySelectText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  cvnHint: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 6,
  },
  yourOrderLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 8,
  },
  pinkOrderBox: {
    backgroundColor: '#FBCFE8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pinkOrderLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  pinkOrderTotal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelOutlineBtn: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0F172A',
    justify: 'center',
    alignItems: 'center',
  },
  cancelOutlineText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  confirmSolidBtn: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#FF6F61',
    borderRadius: 12,
    justify: 'center',
    alignItems: 'center',
  },
  confirmSolidText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justify: 'center',
    alignItems: 'center',
  },
  successBody: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  successBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22C55E',
    justify: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtext: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 36,
  },
  backHomeBtn: {
    width: 220,
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: '#4338CA',
    borderRadius: 14,
    justify: 'center',
    alignItems: 'center',
  },
  backHomeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default CartScreen;
