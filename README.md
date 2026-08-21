# DCIT 324: Mobile Application Development - Assignment 3
## Product Catalogue with Props, State, and Navigation (ShopEase App)

An eCommerce mobile application built with **React Native** and **Expo SDK 54**, implementing reusable components, state management, and multi-screen navigation based on the **ShopEase** Figma UI Kit.

---

## 📱 Features & Highlights

- **Expo SDK 54**: Built on `expo@~54.0.36` with compatible native dependencies.
- **React Navigation 7**:
  - **Bottom Tab Navigator**: Seamless tab switching between **Home**, **Cart**, and **Profile** with dynamic cart badge counters.
  - **Native Stack Navigator**: Deep navigation from Home product grid to **Product Details**, **Favourites**, and **Available Offers**.
- **Reusable Product Card (`ProductCard.js`)**:
  - Custom component receiving `image`, `name`, `price`, `rating`, `bgColor`, `onPress`, and `onAddToCart` props.
  - Wishlist toggle heart button and pastel card background styling.
- **Interactive State Management**:
  - Global `CartContext` managing shopping cart items, line item quantities, trash item removal, tax calculations, and order grand total.
  - Stateful quantity selector (`+` / `-`) on Product Details screen.
- **ShopEase UI Kit Screens**:
  1. **Home Screen**: Hero watch release banner, filter pills (Sort By, Filter, Cart, Search), 2-column pastel product grid, and middle orange "Free delivery" promo banner.
  2. **Side Navigation Drawer Menu**: Slide-out overlay menu with links to **HOME**, **FAVOURITES**, **CART**, **MY PROFILE**, **MY OFFERS**, and **SIGN OUT**.
  3. **Product Details Screen**: Product image banner with 10% Off badge, carousel dots, green price pill (`$10.99`), color option selection thumbnails, square `+  2  -` quantity selector, and **Buy now** / **Add to cart** action buttons.
  4. **Confirm Order & Checkout Flow**:
     - **Cart Summary View**: Line item totals, quantity adjusters, tax calculation, and **Confirm Order** button.
     - **Payment Method Modal**: Choice between **Credit /Debit Card** (Visa & Mastercard) and **Other (iPay)**.
     - **Payment Details View**: Form for Card Type, Card Number, Expiration Month/Year, CVN, Pink Order Total Box (`Total amount $107.76`), **Cancel** and **Confirm** buttons.
     - **Payment Success View**: Green checkmark badge with **Your payment was successful** and **Back to Home** button.
  5. **My Profile Screen**: Blush header with user avatar, name (**Theshan Geeth**), location (**Matara, Sri Lanka**), form inputs for Name, Address, Email, Phone, and **Edit Now** / **Cancel** buttons.
  6. **Favourites Screen**: Saved product cards featuring red heart circle badges.
  7. **My Offers Screen**: Offers list featuring **Free delivery for First Item** and **First Product Free** cards with **Accept Now** buttons.

---

## 📂 Project Structure

```text
DCIT324-ASSIGNMENT_3/
├── assets/                  # App icons and splash screen graphics
├── src/
│   ├── components/
│   │   └── ProductCard.js   # Reusable product card component
│   ├── context/
│   │   └── CartContext.js   # Global React context for cart state
│   ├── data/
│   │   └── products.js      # Mock product dataset & categories
│   ├── navigation/
│   │   └── AppNavigator.js  # Bottom Tabs & Stack Navigator configuration
│   └── screens/
│       ├── HomeScreen.js           # Catalog grid, hero banner & side drawer
│       ├── ProductDetails.js       # Product details view with quantity state
│       ├── CartScreen.js           # Cart management & multi-step checkout flow
│       ├── ProfileScreen.js        # User profile & information form
│       ├── FavouritesScreen.js      # Saved wishlist products
│       └── OffersScreen.js         # Available vouchers & promo offers
├── App.js                   # Application entry point
├── app.json                 # Expo configuration file
├── package.json             # Project dependencies & scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Expo Go app on mobile (optional, for testing on physical device)

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Elijahamet/DCIT324-ASSIGNMENT_3.git
   cd DCIT324-ASSIGNMENT_3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

4. **Run on target platform:**
   - Press `w` to open in browser (Web mode).
   - Press `a` to run on Android Emulator.
   - Scan the QR code using the **Expo Go** mobile app.

---

## 🏫 Academic Information

- **Institution**: University of Ghana
- **Department**: Computer Science
- **Course**: DCIT 324: Mobile Application Development
- **Assignment**: Assignment 3 - Product Catalogue with Props, State, and Navigation
